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

// Server-rendered SEO tags for a page: title, description, canonical, Open Graph and Twitter.
// Hreflang alternates are produced globally by @nuxtjs/i18n (see app.vue).
export function usePageSeo(options: PageSeoOptions) {
    const route = useRoute()
    const config = useRuntimeConfig()
    const baseUrl = String(config.public.SITE_URL || 'https://andriichebotaru.com').replace(/\/+$/, '')

    const url = computed(() => {
        const path = toValue(options.path) || route.path
        const normalized = path.length > 1 ? path.replace(/\/+$/, '') : path
        return normalized === '/' ? baseUrl : baseUrl + normalized
    })
    const image = computed(() => toValue(options.image) || `${baseUrl}/og/default.jpg`)

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

    // same key as the canonical link of @nuxtjs/i18n so that only one canonical is rendered
    useHead({ link: [{ key: 'i18n-can', rel: 'canonical', href: url }] })

    return { url }
}
