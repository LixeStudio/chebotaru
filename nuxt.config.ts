import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',

  devtools: { enabled: true },
  css: ['@/assets/scss/main.scss'],
  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxt/eslint', '@nuxtjs/i18n'],
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
    defaultLocale: 'ru',
    langDir: 'locales/',
    locales: [
      { code: 'ru', name: 'Русский', iso: 'ru-RU', file: 'ru.json' },
      { code: 'uk', name: 'Українська', iso: 'uk-UA', file: 'uk.json' },
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' }
    ],
    detectBrowserLanguage: false,
  }
})