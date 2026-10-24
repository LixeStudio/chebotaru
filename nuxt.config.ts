import { defineNuxtConfig } from 'nuxt/config'


export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  ssr: true,
  devtools: { enabled: true },
  css: ['@/assets/scss/main.scss'],
  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxt/eslint', '@nuxtjs/i18n', '@nuxtjs/sitemap',],
  fonts: {
    // Manrope self-hosted as the same variable font (wght 200-800) that app.vue used to load
    // as a second copy from Google Fonts, so weights 500/700 render exactly as before
    families: [{ name: 'Manrope', provider: 'google', weights: ['200 800'] }],
  },
  image: {
    dir: 'assets',
    screens: {
      sm: 431,
      md: 745,
      lg: 1101,
      xl: 1441
    }
  },
  i18n: {
    lazy: true,
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: 'locales/',
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', language: 'en-US', file: 'en.json' },
      { code: 'ru', name: 'Русский', iso: 'ru-RU', language: 'ru-RU', file: 'ru.json' },
      { code: 'uk', name: 'Українська', iso: 'uk-UA', language: 'uk-UA', file: 'uk.json' }
    ],
    baseUrl: 'https://andriichebotaru.com',
    detectBrowserLanguage: false,
  },
  runtimeConfig: {
    // Chebotaru CMS Public API (/api/public/v1), requested only by the Nuxt server (server/api/cms):
    // NUXT_CMS_API_BASE, e.g. http://127.0.0.1:3000 locally; not exposed to the browser
    cmsApiBase: '',
    // shared secret of the CMS "content changed" call (server/api/cms-revalidate.post.ts):
    // NUXT_CMS_REVALIDATE_SECRET; empty = the route is off and the cache simply expires after 15-30 s
    cmsRevalidateSecret: '',
    public: {
      // where the browser loads CMS images from (the API address or a CDN in front of it):
      // NUXT_PUBLIC_CMS_MEDIA_BASE
      cmsMediaBase: '',
      SITE_URL: 'https://andriichebotaru.com'
    }
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/Favicon.ico' },
        // display font of the hero headings (often the LCP text): preloaded so that it is ready for
        // the first render instead of swapping in later and shifting the layout
        { rel: 'preload', as: 'font', type: 'font/woff', href: '/fonts/tt_disruptors_regular-otf.woff', crossorigin: '' },
      ],
      script: [
        // marks the page as running JavaScript before anything is drawn: only then the newsletter section backgrounds
        // wait until the section is near the viewport (_contact-us.scss); without JavaScript they load as before
        { innerHTML: "document.documentElement.classList.add('js')", tagPriority: 'critical' },
      ],
    },
  },
  sitemap: {
    siteUrl: 'https://andriichebotaru.com',
    i18n: true,
    trailingSlash: false,
    // pictures and blog articles from the CMS (server/api/__sitemap__/urls.ts)
    sources: ['/api/__sitemap__/urls'],
  },
  routeRules: {
    // static media from /public: file names are not hashed, so no "immutable";
    // a week instead of the 4h default keeps repeat visits from re-downloading the hero video
    '/videos/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' } },
    '/images/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' } },
    '/fonts/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' } },
  },
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: { drop_console: true },
      },
    }
  },
})




