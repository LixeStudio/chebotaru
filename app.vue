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
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "preload",
      as: "style",
      href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
      media: "print",
      onload: "this.media='all'",
    },
  ],
});
</script>

<style lang="scss"></style>
