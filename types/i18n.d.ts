import type { NuxtI18nConfig } from '@nuxtjs/i18n'

declare module 'nuxt/schema' {
    interface NuxtConfig {
        i18n?: NuxtI18nConfig
    }
    interface NuxtOptions {
        i18n?: NuxtI18nConfig
    }
}

export { }