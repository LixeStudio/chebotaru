import { FetchError, ofetch } from 'ofetch'
import { isConsentVersion, isNewsletterLocale } from '~/utils/newsletter'

// Newsletter sign-up of the site: forwards the address to the Chebotaru CMS (POST /api/public/v1/subscribers) with the
// language of the page (the CMS sends the letters in it) and the version of the consent text shown under the button.
// Never cached (it is a POST, and the answer is marked no-store); the address is not logged.
// The CMS answers the same `accepted` for a new and an already subscribed address, so neither does the site.
// No topics are sent: the CMS then subscribes to both (blog and new paintings).

type SubscribeResult = { status: 'accepted' } | { status: 'invalid' } | { status: 'rate_limited' }

export default defineEventHandler(async (event): Promise<SubscribeResult> => {
    setResponseHeader(event, 'Cache-Control', 'no-store')

    const body = await readBody<{ email?: unknown; website?: unknown; locale?: unknown; consentVersion?: unknown }>(event).catch(() => null)
    const email = typeof body?.email === 'string' ? body.email : ''
    const website = typeof body?.website === 'string' ? body.website : undefined
    const locale = isNewsletterLocale(body?.locale) ? body.locale : undefined
    const consentVersion = isConsentVersion(body?.consentVersion) ? body.consentVersion : undefined
    if (!email.trim() || email.length > 320) return { status: 'invalid' }

    try {
        await ofetch(cmsNewsletterUrl(event, 'subscribers'), {
            method: 'POST',
            body: { email, ...(website ? { website } : {}), ...(locale ? { locale } : {}), ...(consentVersion ? { consentVersion } : {}) },
            headers: forwardedForHeader(event),
            timeout: 10_000,
        })
        return { status: 'accepted' }
    } catch (error) {
        const status = error instanceof FetchError ? error.response?.status : undefined
        if (status === 400) return { status: 'invalid' }
        if (status === 429) return { status: 'rate_limited' }
        // 5xx or no answer: a temporary failure, the address is not echoed
        console.error('CMS sign-up failed:', status || (error as Error).message)
        throw createError({ statusCode: 503, statusMessage: 'CMS is unavailable', data: { code: 'cms_unavailable' } })
    }
})
