// "Unsubscribe from all emails" (CMS: POST /api/public/v1/subscribers/unsubscribe); repeating it gives the same answer.
export default defineEventHandler(async (event) => {
    const body = await readBody<{ token?: unknown }>(event).catch(() => null)
    const token = cleanToken(body?.token)
    return cmsSubscribersCall<{ status: string }>(event, 'subscribers/unsubscribe', { method: 'POST', body: { token } })
})
