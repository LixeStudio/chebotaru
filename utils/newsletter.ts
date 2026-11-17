// Newsletter helpers shared by the sign-up form and the "Subscription settings" page.
// Pure code with no Nuxt imports, so it runs in the unit tests (tests/newsletter.test.ts).

/** Version of the consent text under the sign-up button; the CMS stores it with the subscription (`[A-Za-z0-9._-]{1,32}`). */
export const CONSENT_VERSION = '2026-11'

export const NEWSLETTER_LOCALES = ['en', 'ru', 'uk'] as const
export type NewsletterLocale = (typeof NEWSLETTER_LOCALES)[number]

export type NewsletterTopic = 'catalog' | 'blog'
export type Preferences = { blog: boolean; catalog: boolean }

export const isNewsletterLocale = (value: unknown): value is NewsletterLocale =>
    typeof value === 'string' && (NEWSLETTER_LOCALES as readonly string[]).includes(value)

export const isConsentVersion = (value: unknown): value is string => typeof value === 'string' && /^[A-Za-z0-9._-]{1,32}$/.test(value)

export type SaveOutcome =
    | { kind: 'saved' }
    | { kind: 'unsubscribed' }
    | { kind: 'updated'; lines: { topic: NewsletterTopic; change: 'off' | 'on' | 'kept' }[] }

const TOPICS: NewsletterTopic[] = ['catalog', 'blog']

/**
 * What the visitor sees after pressing "Save": nothing changed, everything is off, or a line per changed topic
 * (plus "keeps coming" for a topic that stays on and was not touched).
 */
export function saveOutcome(before: Preferences, after: Preferences): SaveOutcome {
    if (!after.blog && !after.catalog) return { kind: 'unsubscribed' }
    const changed = TOPICS.filter((topic) => before[topic] !== after[topic])
    if (!changed.length) return { kind: 'saved' }
    const lines = changed.map((topic) => ({ topic, change: (after[topic] ? 'on' : 'off') as 'on' | 'off' }))
    for (const topic of TOPICS) {
        if (!changed.includes(topic) && after[topic]) lines.push({ topic, change: 'kept' })
    }
    return { kind: 'updated', lines }
}

/** Page address without the query (the link in an e-mail carries a token that must not reach analytics). */
export function pageViewWithoutQuery(origin: string, pathname: string) {
    return { page_location: origin + pathname, page_path: pathname }
}

export const isNewsletterPath = (pathname: string) => /^\/(?:(?:ru|uk)\/)?newsletter(?:\/|$)/.test(pathname)
