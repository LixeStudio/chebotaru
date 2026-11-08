import { FetchError, ofetch } from 'ofetch'

// Newsletter sign-up of the site: forwards the address to the Chebotaru CMS (POST /api/public/v1/subscribers).
// Never cached (it is a POST, and the answer is marked no-store); the address is not logged.
// The CMS answers the same `accepted` for a new and an already subscribed address, so neither does the site.
// The visitor's IP goes on in X-Forwarded-For (appended to any chain the site itself received): the CMS limits sign-ups
// per IP and, with TRUST_PROXY naming this server, counts visitors instead of this server.

type SubscribeResult = { status: 'accepted' } | { status: 'invalid' }

export default defineEventHandler(async (event): Promise<SubscribeResult> => {
    setResponseHeader(event, 'Cache-Control', 'no-store')

    const body = await readBody<{ email?: unknown; website?: unknown }>(event).catch(() => null)
    const email = typeof body?.email === 'string' ? body.email : ''
    const website = typeof body?.website === 'string' ? body.website : undefined
    if (!email.trim() || email.length > 320) return { status: 'invalid' }

    const { cmsApiBase } = useRuntimeConfig(event)
    if (!cmsApiBase) {
        throw createError({ statusCode: 503, statusMessage: 'CMS is not configured', data: { code: 'cms_unavailable' } })
    }

    const incoming = getRequestHeader(event, 'x-forwarded-for')
    const socketIp = event.node.req.socket.remoteAddress
    const forwardedFor = [incoming, socketIp].filter(Boolean).join(', ')

    try {
        await ofetch(`${String(cmsApiBase).replace(/\/+$/, '')}/api/public/v1/subscribers`, {
            method: 'POST',
            body: { email, ...(website ? { website } : {}) },
            headers: forwardedFor ? { 'x-forwarded-for': forwardedFor } : {},
            timeout: 10_000,
        })
        return { status: 'accepted' }
    } catch (error) {
        const status = error instanceof FetchError ? error.response?.status : undefined
        if (status === 400) return { status: 'invalid' }
        // 429 (too many sign-ups from this IP), 5xx or no answer: a temporary failure, the address is not echoed
        console.error('CMS sign-up failed:', status || (error as Error).message)
        throw createError({
            statusCode: status === 429 ? 429 : 503,
            statusMessage: status === 429 ? 'Too many requests' : 'CMS is unavailable',
            data: { code: status === 429 ? 'rate_limited' : 'cms_unavailable' },
        })
    }
})
