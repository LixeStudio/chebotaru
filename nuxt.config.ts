// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',

  devtools: { enabled: true },
  css: ['@/assets/scss/main.scss'],
  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxt/eslint'],
  image: {
    dir: 'assets',
    screens: {
      sm: 431,
      md: 745,
      lg: 1101,
      xl: 1441
    }
  }
})