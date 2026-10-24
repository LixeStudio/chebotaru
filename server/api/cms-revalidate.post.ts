import { isRevalidateSecret } from '../utils/revalidate-secret'

// The CMS calls this after a picture, an article or the languages change (publish, save, unpublish, delete), so the
// site shows the change at once instead of after the 15-30 s cache lifetime (server/utils/cms.ts).
// Header `x-revalidate-secret` must equal NUXT_CMS_REVALIDATE_SECRET; without a configured secret the route does not
// exist (404). The whole CMS cache is cleared: the site is small, and every list may contain the changed record.
// Nothing about the change is read from the body. One server's memory only: several site servers would need a shared
// cache storage (Nitro storage, e.g. Redis).

export default defineEventHandler(async (event) => {
    setResponseHeader(event, 'Cache-Control', 'no-store')
    const { cmsRevalidateSecret } = useRuntimeConfig(event)
    if (!cmsRevalidateSecret) throw createError({ statusCode: 404, statusMessage: 'Not Found' })
    if (!isRevalidateSecret(getRequestHeader(event, 'x-revalidate-secret'), String(cmsRevalidateSecret))) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const storage = useStorage('cache')
    const keys = await storage.getKeys('cms')
    await Promise.all(keys.map((key) => storage.removeItem(key)))
    return { cleared: keys.length }
})
