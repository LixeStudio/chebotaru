<template>
  <div class="wrapper">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <CookieConsent v-if="cookieBannerOpen" />
  </div>
</template>

<script setup>
import { useCookieConsent } from "@/composables/useCookieConsent";

const { t } = useI18n();
// the banner's code is a separate small file, requested only when the banner is shown (plugins/gtag.client.ts
// opens it after hydration for a visitor who has not answered yet)
const CookieConsent = defineAsyncComponent(() => import("@/components/CookieConsent.vue"));
const { bannerOpen: cookieBannerOpen } = useCookieConsent();
// only lang/dir here (reactive, follows the language switcher);
// canonical and hreflang links are set per page by usePageSeo
const i18nHead = useLocaleHead({ seo: false });
useHead({
  htmlAttrs: {
    lang: () => i18nHead.value.htmlAttrs?.lang,
    dir: () => i18nHead.value.htmlAttrs?.dir,
  },
  meta: [
    { property: "og:site_name", content: () => t("seo.siteName") },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@chebotaru.a" },
    { name: "twitter:creator", content: "@chebotaru.a" },
  ],
  // Manrope is self-hosted by @nuxt/fonts (see "fonts" in nuxt.config.ts)
});
</script>

<style lang="scss"></style>
