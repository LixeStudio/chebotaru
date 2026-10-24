// Which Public API requests the Nuxt server caches, and under which key (used by server/utils/cms.ts).
// Pure functions: no Nitro runtime, so they are unit-tested directly (tests/cms-cache.test.ts).

const SITE_LOCALES = ['en', 'ru', 'uk']
const NEWEST_SORTS = ['newest', 'oldest']

export type Query = Record<string, string>

const int = (value: string | undefined, min: number, max: number) =>
    value !== undefined && /^\d+$/.test(value) && Number(value) >= min && Number(value) <= max

const only = (query: Query, keys: string[]) => Object.keys(query).every((key) => keys.includes(key))

/**
 * The cache class of a request, or null to forward it without cache. Only the shapes the pages send are cached:
 * - list page by page: { locale, page 1..50, pageSize 100 };
 * - the newest few (home): { locale, sort newest|oldest, pageSize 1..12 };
 * - a detail: { locale }; related: { locale, limit 1..12 }.
 */
export function cmsCacheClass(route: string, query: Query): 'list' | 'detail' | null {
    if (!SITE_LOCALES.includes(query.locale ?? '')) return null
    if (route === 'pictures' || route === 'articles') {
        const pages = only(query, ['locale', 'page', 'pageSize']) && int(query.page, 1, 50) && query.pageSize === '100'
        const newest = only(query, ['locale', 'sort', 'pageSize']) && NEWEST_SORTS.includes(query.sort ?? '') && int(query.pageSize, 1, 12)
        return pages || newest ? 'list' : null
    }
    if (/^(pictures|articles)\/[a-z0-9]{24}$/.test(route)) return only(query, ['locale']) ? 'detail' : null
    if (/^(pictures|articles)\/[a-z0-9]{24}\/related$/.test(route)) {
        return only(query, ['locale', 'limit']) && int(query.limit, 1, 12) ? 'detail' : null
    }
    return null
}

/**
 * One key per route and query: every parameter is in it, in a fixed order, so no answer can be served for another.
 * Storage-safe: Nitro's storage (unstorage) cuts a key at "?" and turns "/" into ":", so the parameters are
 * percent-encoded (no "?", "/" or ":" left in them) and the route segments are joined with ":".
 */
export function cmsCacheKey(route: string, query: Query): string {
    const params = Object.keys(query)
        .sort()
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key]!)}`)
        .join('&')
    return `${route.split('/').join(':')}:${encodeURIComponent(params)}`
}
