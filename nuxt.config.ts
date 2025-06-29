import { defineNuxtConfig } from 'nuxt/config'


export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  ssr: true,
  devtools: { enabled: true },
  css: ['@/assets/scss/main.scss'],
  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxt/eslint', '@nuxtjs/i18n', '@nuxtjs/sitemap',],
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
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
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
        { rel: 'icon', type: 'image/x-icon', href: '/Favicon.svg' },
      ]
    },
  },
  sitemap: {
    siteUrl: 'https://andriichebotaru.com',
    i18n: true,
    trailingSlash: false
  },
  vite: {
    build: {
      minify: 'terser',
    },
  }
})




