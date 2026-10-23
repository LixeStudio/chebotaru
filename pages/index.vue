<template>
  <HomePage />
</template>

<script setup>
import { usePageSeo } from "@/composables/usePageSeo";
import { useJsonLd, ARTIST_SAME_AS } from "@/composables/useJsonLd";
import HomePage from "@/components/pages/home/HomePage.vue";

const { t } = useI18n();
const { url } = usePageSeo({
  title: () => t("seo.home.title"),
  description: () => t("seo.home.description"),
});
useJsonLd("artist", () => ({
  "@type": "Person",
  name: t("seo.siteName"),
  jobTitle: "Artist",
  url: url.value,
  sameAs: ARTIST_SAME_AS,
}));
</script>
