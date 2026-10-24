import { computed, toValue, type MaybeRefOrGetter } from 'vue'

type PageSeoOptions = {
    title: MaybeRefOrGetter<string>
    description: MaybeRefOrGetter<string>
    image?: MaybeRefOrGetter<string | undefined>
    type?: 'website' | 'article'
    // canonical path (already locale-prefixed); defaults to the current route path
    path?: MaybeRefOrGetter<string | undefined>
    robots?: string
}

const withoutQuery = (href: string) => href.split(/[?#]/)[0]

// Server-rendered SEO tags for a page: title, description, canonical, hreflang alternates,
// Open Graph and Twitter. Pages with localized slugs must call useSetI18nParams(false) before it,
// so that the alternates generated here point to the translated URLs.
export function usePageSeo(options: PageSeoOptions) {
    const route = useRoute()
    const config = useRuntimeConfig()
    const baseUrl = String(config.public.SITE_URL || 'https://andriichebotaru.com').replace(/\/+$/, '')
    const localeHead = useLocaleHead({ seo: true })

    const url = computed(() => {
        const path = toValue(options.path) || route.path
        const normalized = path.length > 1 ? path.replace(/\/+$/, '') : path
        return normalized === '/' ? baseUrl : baseUrl + normalized
    })
    const image = computed(() => {
        const value = toValue(options.image)
        if (!value) return `${baseUrl}/og/default.jpg`
        return value.startsWith('/') ? baseUrl + value : value
    })

    useSeoMeta({
        title: () => toValue(options.title),
        description: () => toValue(options.description),
        robots: options.robots ?? 'index, follow',
        ogType: options.type ?? 'website',
        ogTitle: () => toValue(options.title),
        ogDescription: () => toValue(options.description),
        ogUrl: url,
        ogImage: image,
        twitterTitle: () => toValue(options.title),
        twitterDescription: () => toValue(options.description),
        twitterImage: image,
    })

    useHead(() => ({
        link: [
            { key: 'i18n-can', rel: 'canonical', href: url.value },
            // en/ru/uk + x-default from @nuxtjs/i18n, without query parameters (filters, tracking)
            ...(localeHead.value.link || [])
                .filter((link) => link.rel === 'alternate')
                .map((link) => ({ ...link, href: withoutQuery(String(link.href)) })),
        ],
        // og:locale and og:locale:alternate (og:url is set above)
        meta: (localeHead.value.meta || []).filter((meta) => meta.property !== 'og:url'),
    }))

    return { url }
}
