<template>
  <div class="wrapper">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const i18nHead = useLocaleHead();
useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
    ...(i18nHead.value.htmlAttrs?.dir && { dir: i18nHead.value.htmlAttrs.dir }),
  },
  link: [
    ...(i18nHead.value.link || []),
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
    },
  ],
});
</script>

<style lang="scss"></style>
