import qs from 'qs'

// Dynamic sitemap entries (pictures and blog articles) for @nuxtjs/sitemap.
// Every translation has its own slug, so each locale gets its own <url> with explicit hreflang alternatives.

type LocalizedEntry = { documentId: string; slug: string; locale: string; updatedAt?: string }

const LOCALES = [
    { code: 'en', hreflang: 'en-US', prefix: '' },
    { code: 'ru', hreflang: 'ru-RU', prefix: '/ru' },
    { code: 'uk', hreflang: 'uk-UA', prefix: '/uk' },
]
const DEFAULT_LOCALE = 'en'

async function fetchCollection(strapiUrl: string, collection: string, locale: string): Promise<LocalizedEntry[]> {
    const entries: LocalizedEntry[] = []
    for (let page = 1, pageCount = 1; page <= pageCount; page++) {
        const query = qs.stringify(
            { locale, fields: ['slug', 'documentId', 'updatedAt'], pagination: { page, pageSize: 100 } },
            { encodeValuesOnly: true }
        )
        const res = await $fetch<{ data: LocalizedEntry[]; meta?: { pagination?: { pageCount?: number } } }>(
            `${strapiUrl}/api/${collection}?${query}`
        )
        entries.push(...(res.data || []).filter((e) => e.slug).map((e) => ({ ...e, locale })))
        pageCount = res.meta?.pagination?.pageCount || 1
    }
    return entries
}

async function collectionUrls(strapiUrl: string, collection: string, routePrefix: string) {
    const perLocale = await Promise.all(LOCALES.map((l) => fetchCollection(strapiUrl, collection, l.code)))
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
            urls.push({ loc: pathOf(e), lastmod: e.updatedAt, alternatives })
        }
    }
    return urls
}

export default defineSitemapEventHandler(async () => {
    const strapiUrl = useRuntimeConfig().public.STRAPI_URL
    if (!strapiUrl) return []
    const [pictures, articles] = await Promise.all([
        collectionUrls(strapiUrl, 'pictures', '/picture-details'),
        collectionUrls(strapiUrl, 'blogs', '/article'),
    ])
    return [...pictures, ...articles]
})
