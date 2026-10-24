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
    public: {
      STRAPI_URL: process.env.NUXT_PUBLIC_STRAPI_URL,
      SITE_URL: 'https://andriichebotaru.com'
    }
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/Favicon.ico' },
      ]
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




