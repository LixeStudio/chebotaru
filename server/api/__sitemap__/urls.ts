// Dynamic sitemap entries (pictures and blog articles) for @nuxtjs/sitemap, from the Chebotaru CMS Public API.
// Every translation has its own slug, so each locale gets its own <url> with explicit hreflang alternatives;
// a record that is not translated to a language (not visible in it) simply has no URL there.

type ListItem = { documentId: string; slug: string }
type ListPage = { data: ListItem[]; meta: { pagination: { totalPages: number } } }
type LocalizedEntry = ListItem & { locale: string }

const LOCALES = [
    { code: 'en', hreflang: 'en-US', prefix: '' },
    { code: 'ru', hreflang: 'ru-RU', prefix: '/ru' },
    { code: 'uk', hreflang: 'uk-UA', prefix: '/uk' },
]
const DEFAULT_LOCALE = 'en'

async function fetchCollection(apiBase: string, collection: string, locale: string): Promise<LocalizedEntry[]> {
    const page = (n: number) =>
        $fetch<ListPage>(`${apiBase}/api/public/v1/${collection}`, { query: { locale, page: n, pageSize: 100 }, timeout: 10_000 })
    const first = await page(1)
    const rest = await Promise.all(
        Array.from({ length: first.meta.pagination.totalPages - 1 }, (_, i) => page(i + 2))
    )
    return [first, ...rest]
        .flatMap((res) => res.data)
        .filter((e) => e.slug)
        .map((e) => ({ documentId: e.documentId, slug: e.slug, locale }))
}

async function collectionUrls(apiBase: string, collection: string, routePrefix: string) {
    const perLocale = await Promise.all(LOCALES.map((l) => fetchCollection(apiBase, collection, l.code)))
    const byDocument = new Map<string, LocalizedEntry[]>()
    for (const entry of perLocale.flat()) {
        byDocument.set(entry.documentId, [...(byDocument.get(entry.documentId) || []), entry])
    }

    const urls = []
    for (const translations of byDocument.values()) {
        const pathOf = (e: LocalizedEntry) =>
            `${LOCALES.find((l) => l.code === e.locale)!.prefix}${routePrefix}/${e.documentId}-${e.slug}`
        const fallback = translations.find((e) => e.locale === DEFAULT_LOCALE)
        const alternatives = [
            ...(fallback ? [{ hreflang: 'x-default', href: pathOf(fallback) }] : []),
            ...translations.map((e) => ({ hreflang: LOCALES.find((l) => l.code === e.locale)!.hreflang, href: pathOf(e) })),
        ]
        for (const e of translations) {
            urls.push({ loc: pathOf(e), alternatives })
        }
    }
    return urls
}

export default defineSitemapEventHandler(async (event) => {
    const apiBase = String(useRuntimeConfig(event).cmsApiBase || '').replace(/\/+$/, '')
    if (!apiBase) return []
    const [pictures, articles] = await Promise.all([
        collectionUrls(apiBase, 'pictures', '/picture-details'),
        collectionUrls(apiBase, 'articles', '/article'),
    ])
    return [...pictures, ...articles]
})
