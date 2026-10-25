// The catalog page by page (server/api/catalog.get.ts): the whole list stays in the server cache, the visitor gets only
// what is shown. Filters and sorting are the same as the catalog has always had, now applied on the server, so the HTML
// carries 24 works instead of all of them and a filtered or "show more" view is a real address (?page=2) that a search
// engine can follow. Pure functions: tests/catalog.test.ts.

export const CATALOG_PAGE_SIZE = 24
/** Deeper than this the address is clamped: 50 x 24 = 1200 works on one page is already more than enough. */
export const CATALOG_MAX_PAGE = 50

export type CatalogItem = {
    availability: string
    size: string | null
    orientation: string | null
    price: number | null
    publishedAt: string
}

export type CatalogQuery = {
    availability: string[]
    pictureSize: string[]
    pictureOrientation: string[]
    price: string[]
    sortBy: string
    page: number
}

const SORTS = ['cheapPictures', 'expensivePictures', 'newPictures']
const PRICES = ['less-300', '300-700', 'more-700']

/** A comma list of known values (anything else is ignored, so an address cannot make the server do odd work). */
function list(raw: unknown, allowed?: string[]): string[] {
    const values = String(Array.isArray(raw) ? raw.join(',') : (raw ?? ''))
        .split(',')
        .map((value) => value.trim())
        .filter((value) => value && value.length <= 40)
    return [...new Set(allowed ? values.filter((value) => allowed.includes(value)) : values)].slice(0, 10)
}

export function parseCatalogQuery(query: Record<string, unknown>): CatalogQuery {
    const page = Number.parseInt(String(query.page ?? '1'), 10)
    return {
        availability: list(query.availability, ['available', 'sold']),
        pictureSize: list(query.pictureSize, ['small', 'middle', 'large']),
        pictureOrientation: list(query.pictureOrientation, ['vertical', 'horizontal', 'square']),
        price: list(query.price, PRICES),
        sortBy: SORTS.includes(String(query.sortBy)) ? String(query.sortBy) : '',
        page: Number.isFinite(page) ? Math.min(Math.max(page, 1), CATALOG_MAX_PAGE) : 1,
    }
}

function priceMatches(price: number | null, ranges: string[]): boolean {
    if (price === null) return false
    return ranges.some((range) => (range === 'less-300' ? price < 300 : range === '300-700' ? price >= 300 && price <= 700 : price >= 700))
}

export function filterAndSort<T extends CatalogItem>(items: T[], query: CatalogQuery): T[] {
    const matching = items.filter(
        (item) =>
            (!query.availability.length || query.availability.includes(item.availability)) &&
            (!query.pictureSize.length || query.pictureSize.includes(item.size ?? '')) &&
            (!query.pictureOrientation.length || query.pictureOrientation.includes(item.orientation ?? '')) &&
            (!query.price.length || priceMatches(item.price, query.price))
    )
    const byPrice = (item: T) => item.price ?? Number.POSITIVE_INFINITY
    if (query.sortBy === 'cheapPictures') return matching.sort((a, b) => byPrice(a) - byPrice(b))
    if (query.sortBy === 'expensivePictures') return matching.sort((a, b) => (b.price ?? -1) - (a.price ?? -1))
    if (query.sortBy === 'newPictures') return matching.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    return matching // the order of the CMS: the newest first
}

/** Pages 1..page together (a "show more" address shows everything up to it), with the total for the counter. */
export function catalogPage<T extends CatalogItem>(items: T[], query: CatalogQuery) {
    const matching = filterAndSort(items, query)
    const shown = matching.slice(0, query.page * CATALOG_PAGE_SIZE)
    return { items: shown, total: matching.length, page: query.page, pageSize: CATALOG_PAGE_SIZE, hasMore: shown.length < matching.length }
}
