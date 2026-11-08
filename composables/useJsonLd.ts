import { toValue, type MaybeRefOrGetter } from 'vue'

// Schema.org structured data rendered into the server HTML as <script type="application/ld+json">.
export function useJsonLd(key: string, data: MaybeRefOrGetter<Record<string, unknown> | null | undefined>) {
    useHead(() => {
        const value = toValue(data)
        if (!value) return {}
        return {
            script: [{
                key: `ld-${key}`,
                type: 'application/ld+json',
                // "<" is escaped so that text from the CMS cannot close the script tag
                innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...value }).replace(/</g, '\\u003c'),
            }],
        }
    })
}

/**
 * BreadcrumbList for a page inside a section (Home → Blog → article). `items` are names and locale-prefixed paths;
 * URLs are made absolute with the site address.
 */
export function useBreadcrumbs(items: MaybeRefOrGetter<{ name: string; path: string }[] | null>) {
    const baseUrl = String(useRuntimeConfig().public.SITE_URL || 'https://andriichebotaru.com').replace(/\/+$/, '')
    useJsonLd('breadcrumbs', () => {
        const list = toValue(items)
        if (!list?.length) return null
        return {
            '@type': 'BreadcrumbList',
            itemListElement: list.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: item.path === '/' ? baseUrl : baseUrl + item.path,
            })),
        }
    })
}

export const ARTIST_SAME_AS = [
    'https://www.instagram.com/chebotaru.a',
    'https://youtube.com/@chebotaru.a',
    'https://t.me/andriichebotaru',
]
