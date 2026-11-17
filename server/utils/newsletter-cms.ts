import { FetchError, ofetch } from 'ofetch'
import type { H3Event } from 'h3'

// Calls of the Chebotaru CMS Public API for the newsletter (sign-up and the subscription settings page).
// Only the Nuxt server talks to the CMS; the browser never does. Answers are never cached. Neither the address nor the
// token is logged: only the HTTP status of a failure.
// The visitor's IP goes on in X-Forwarded-For (appended to any chain the site itself received): the CMS limits requests
// per IP and, with TRUST_PROXY naming this server, counts visitors instead of this server.

export function cmsNewsletterUrl(event: H3Event, path: string): string {
    const { cmsApiBase } = useRuntimeConfig(event)
    if (!cmsApiBase) {
        throw createError({ statusCode: 503, statusMessage: 'CMS is not configured', data: { code: 'cms_unavailable' } })
    }
    return `${String(cmsApiBase).replace(/\/+$/, '')}/api/public/v1/${path}`
}

export function forwardedForHeader(event: H3Event): Record<string, string> {
    const incoming = getRequestHeader(event, 'x-forwarded-for')
    const socketIp = event.node.req.socket.remoteAddress
    const value = [incoming, socketIp].filter(Boolean).join(', ')
    return value ? { 'x-forwarded-for': value } : {}
}

/** The CMS answer to a settings call, or an error with a code the page understands: invalid_link | rate_limited | cms_unavailable. */
export async function cmsSubscribersCall<T>(
    event: H3Event,
    path: string,
    options: { method: 'GET' | 'PUT' | 'POST'; query?: Record<string, string>; body?: Record<string, unknown> }
): Promise<T> {
    setResponseHeader(event, 'Cache-Control', 'no-store')
    try {
        return await ofetch<T>(cmsNewsletterUrl(event, path), {
            method: options.method,
            query: options.query,
            body: options.body,
            headers: forwardedForHeader(event),
            timeout: 10_000,
        })
    } catch (error) {
        if (!(error instanceof FetchError) && (error as { statusCode?: number }).statusCode) throw error
        const status = error instanceof FetchError ? error.response?.status : undefined
        if (status === 400 || status === 404) {
            throw createError({ statusCode: 400, statusMessage: 'Invalid link', data: { code: 'invalid_link' } })
        }
        console.error('CMS newsletter call failed:', status || (error as Error).message)
        throw createError({
            statusCode: status === 429 ? 429 : 503,
            statusMessage: status === 429 ? 'Too many requests' : 'CMS is unavailable',
            data: { code: status === 429 ? 'rate_limited' : 'cms_unavailable' },
        })
    }
}

/** A token as the CMS issues it: a plain string; anything else is a broken link before the CMS is even asked. */
export function cleanToken(value: unknown): string {
    if (typeof value !== 'string' || !value || value.length > 2000) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid link', data: { code: 'invalid_link' } })
    }
    return value
}

export type CmsPreferences = { email: string; blog: boolean; catalog: boolean; status: string; locale?: string }
