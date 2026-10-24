import { FetchError } from 'ofetch'

// The only place that talks to the Chebotaru CMS Public API (/api/public/v1, read-only).
// Pages call /api/cms/<route> both during SSR (an in-process call, no extra HTTP hop) and after client-side
// navigation, so the CMS address stays private and the CMS needs no CORS for the site.
// Only the documented routes and query parameters are forwarded. CMS error bodies ({ code, availableLocales, ... })
// are passed on in `data`; an unreachable or failing CMS becomes 503 { code: 'cms_unavailable' }.
// Successful answers are cached for 15-30 s on the server (server/utils/cms.ts); errors never are.

const ROUTES = [
    /^locales$/,
    /^pictures$/,
    /^pictures\/[a-z0-9]{24}(\/related)?$/,
    /^articles$/,
    /^articles\/[a-z0-9]{24}(\/related)?$/,
]
const QUERY_KEYS = [
    'locale', 'availability', 'orientation', 'size', 'currency', 'priceMin', 'priceMax',
    'theme', 'sort', 'page', 'pageSize', 'limit',
]

export default defineEventHandler(async (event) => {
    const route = getRouterParam(event, 'path') || ''
    if (!ROUTES.some((pattern) => pattern.test(route))) {
        // includes a documentId of the wrong format: for the site it simply does not exist
        throw createError({ statusCode: 404, statusMessage: 'Not Found', data: { code: 'not_found' } })
    }

    const incoming = getQuery(event)
    const query = Object.fromEntries(
        QUERY_KEYS.filter((key) => typeof incoming[key] === 'string').map((key) => [key, incoming[key] as string])
    )

    try {
        return await cmsGet(event, route, query)
    } catch (error) {
        const status = error instanceof FetchError ? error.response?.status : undefined
        if (status && status >= 400 && status < 500 && status !== 429) {
            throw createError({ statusCode: status, statusMessage: 'CMS request failed', data: error instanceof FetchError ? error.data : undefined })
        }
        console.error(`CMS ${route} failed:`, status || (error as Error).message)
        throw createError({ statusCode: 503, statusMessage: 'CMS is unavailable', data: { code: 'cms_unavailable' } })
    }
})
