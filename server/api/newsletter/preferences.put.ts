// Saves the two topics (CMS: PUT /api/public/v1/subscribers/preferences). Both off = unsubscribed from everything.
export default defineEventHandler(async (event) => {
    const body = await readBody<{ token?: unknown; blog?: unknown; catalog?: unknown }>(event).catch(() => null)
    const token = cleanToken(body?.token)
    if (typeof body?.blog !== 'boolean' || typeof body?.catalog !== 'boolean') {
        throw createError({ statusCode: 400, statusMessage: 'Invalid request', data: { code: 'invalid_link' } })
    }
    return cmsSubscribersCall<CmsPreferences>(event, 'subscribers/preferences', {
        method: 'PUT',
        body: { token, blog: body.blog, catalog: body.catalog },
    })
})
