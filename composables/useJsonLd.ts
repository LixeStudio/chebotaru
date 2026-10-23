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

export const ARTIST_SAME_AS = [
    'https://www.instagram.com/chebotaru.a',
    'https://youtube.com/@chebotaru.a',
    'https://t.me/andriichebotaru',
]
