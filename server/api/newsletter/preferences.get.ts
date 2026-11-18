// Subscription settings by the token from an e-mail link (CMS: GET /api/public/v1/subscribers/preferences).
export default defineEventHandler(async (event) => {
    const token = cleanToken(getQuery(event).token)
    return cmsSubscribersCall<CmsPreferences>(event, 'subscribers/preferences', { method: 'GET', query: { token } })
})
