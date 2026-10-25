import { FetchError } from 'ofetch'
import { type CatalogItem, catalogPage, parseCatalogQuery } from '../utils/catalog-page'

// GET /api/catalog?locale=ru&availability=sold&sortBy=cheapPictures&page=2: the catalog page by page. The whole list is
// read with the same cached requests as the sitemap (15 s), filtered and sorted here, and only the works shown are sent
// (server/utils/catalog-page.ts).

const LOCALES = ['en', 'ru', 'uk']
type ListPage = { data: CatalogItem[]; meta: { pagination: { totalPages: number } } }

export default defineEventHandler(async (event) => {
    const incoming = getQuery(event)
    const locale = String(incoming.locale ?? '')
    if (!LOCALES.includes(locale)) throw createError({ statusCode: 400, statusMessage: 'Unknown locale', data: { code: 'locale_not_available' } })

    let items: CatalogItem[]
    try {
        const page = (n: number) => cmsGet<ListPage>(event, 'pictures', { locale, page: String(n), pageSize: '100' })
        const first = await page(1)
        const rest = await Promise.all(Array.from({ length: Math.min(first.meta.pagination.totalPages, 50) - 1 }, (_, i) => page(i + 2)))
        items = [first, ...rest].flatMap((res) => res.data)
    } catch (error) {
        // the same answer as the CMS proxy: an outage is not an empty catalog
        const status = error instanceof FetchError ? error.response?.status : undefined
        if (status === 404) items = []
        else throw createError({ statusCode: 503, statusMessage: 'CMS is unavailable', data: { code: 'cms_unavailable' } })
    }
    return catalogPage(items, parseCatalogQuery(incoming))
})
