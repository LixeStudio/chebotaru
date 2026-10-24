<template>
  <div class="wrapper">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { t } = useI18n();
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
