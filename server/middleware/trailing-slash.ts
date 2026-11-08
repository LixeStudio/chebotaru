// "/catalog/" and "/catalog" render the same page; permanently redirect to the URL without
// the trailing slash so that only one version is indexed (sitemap and canonical use it).
export default defineEventHandler((event) => {
    if (event.method !== 'GET' && event.method !== 'HEAD') return
    const url = getRequestURL(event)
    const { pathname } = url
    if (pathname.length <= 1 || !pathname.endsWith('/')) return
    if (/^\/(_nuxt|_ipx|_fonts|api|__)/.test(pathname)) return
    return sendRedirect(event, pathname.replace(/\/+$/, '') + url.search, 301)
})
