import type { H3Event } from 'h3'
import { ofetch } from 'ofetch'
import { cmsCacheClass, cmsCacheKey, type Query } from './cms-cache-policy'

// Read-only requests of the Nuxt server to the Chebotaru CMS Public API, with a short in-memory cache (Nitro
// defineCachedFunction, no extra dependency). Used by the /api/cms proxy and by the sitemap source.
//
// What is cached: successful GET answers of the routes and query shapes the site itself sends (lists read page by page,
// the newest few for the home page, details, related). Anything else (filters, prices, unusual pages) is forwarded
// without cache, so a visitor cannot fill the memory with arbitrary keys. Errors (400/404/429/5xx, timeouts) are thrown
// by the fetch and Nitro never stores a thrown result; an answer without `data` is not stored either.
// Concurrent requests for the same key share one CMS request. No stale-while-revalidate: an expired entry is fetched
// again before it is served, so the site shows a change at most one TTL after the CMS.
//
// TTL (the CMS asks sites not to keep answers longer than 30 s):
// - lists (catalog, blog, home, sitemap): 15 s. A publication, an edit or a withdrawal of any record changes them, and
//   a new publication should reach the home page and the catalog quickly;
// - one picture / article and its related ones: 30 s. They change only with that record, and every view of a detail
//   page asks for it in all three languages (slugs for hreflang), so they are requested most often.
// Content freshness: a change in the CMS is on the site within 15 s (lists) or 30 s (details, related), never later.

export const CMS_LIST_TTL_SECONDS = 15
export const CMS_DETAIL_TTL_SECONDS = 30

const fetchCms = (apiBase: string, route: string, query: Query) =>
    ofetch(`${apiBase}/api/public/v1/${route}`, { query, timeout: 10_000 })

const isAnswer = (value: unknown) => typeof value === 'object' && value !== null && 'data' in value

const cachedFetch = (name: string, maxAge: number) =>
    defineCachedFunction(fetchCms, {
        name,
        group: 'cms',
        maxAge,
        swr: false,
        getKey: (_apiBase: string, route: string, query: Query) => cmsCacheKey(route, query),
        validate: (entry) => isAnswer(entry.value),
    })

const cachedList = cachedFetch('list', CMS_LIST_TTL_SECONDS)
const cachedDetail = cachedFetch('detail', CMS_DETAIL_TTL_SECONDS)

/** GET of a Public API route; cached when the route and query are one of the site's own (see cmsCacheClass). */
export function cmsGet<T = unknown>(event: H3Event, route: string, query: Query): Promise<T> {
    const apiBase = String(useRuntimeConfig(event).cmsApiBase || '').replace(/\/+$/, '')
    if (!apiBase) throw createError({ statusCode: 503, statusMessage: 'CMS is not configured', data: { code: 'cms_unavailable' } })
    const cacheClass = cmsCacheClass(route, query)
    if (cacheClass === 'list') return cachedList(apiBase, route, query) as Promise<T>
    if (cacheClass === 'detail') return cachedDetail(apiBase, route, query) as Promise<T>
    return fetchCms(apiBase, route, query) as Promise<T>
}
