<template>
  <HomePage />
</template>

<script setup>
import HomePage from "@/components/pages/home/HomePage.vue";

const route = useRoute();
const { t } = useI18n();
const config = useRuntimeConfig();
const baseUrl = config.public.SITE_URL || "https://andriichebotaru.com";
const currentUrl = `${baseUrl}${route.fullPath === "/" ? "" : route.fullPath}` || baseUrl;
const ogImage = `${baseUrl}/og/default.jpg`;

useHead({
  title: t("seo.home.title"),
  meta: [
    { name: "description", content: t("seo.home.description") },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: t("seo.home.title") },
    { property: "og:description", content: t("seo.home.description") },
    { property: "og:url", content: currentUrl },
    { property: "og:image", content: ogImage },
    { name: "twitter:title", content: t("seo.home.title") },
    { name: "twitter:description", content: t("seo.home.description") },
    { name: "twitter:image", content: ogImage },
  ],
  link: [
    { rel: "canonical", href: currentUrl },
    { rel: "alternate", hreflang: "en", href: baseUrl },
    { rel: "alternate", hreflang: "ru", href: `${baseUrl}/ru` },
    { rel: "alternate", hreflang: "uk", href: `${baseUrl}/uk` },
    { rel: "alternate", hreflang: "x-default", href: baseUrl },
  ],
});
</script>
