<template>
  <div class="privacy-page">
    <Header />
    <main class="main">
      <PrivacyContent />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import PrivacyContent from "@/components/pages/privacy/privacyContent.vue";

const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));
const route = useRoute();
const { t } = useI18n();
const config = useRuntimeConfig();
const baseUrl = config.public.SITE_URL || "https://andriichebotaru.com";
const currentUrl = `${baseUrl}${route.fullPath}`;

const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;

useHead({
  title: t("seo.privacy.title"),
  meta: [
    { name: "description", content: t("seo.privacy.description") },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: t("seo.privacy.title") },
    { property: "og:description", content: t("seo.privacy.description") },
    { property: "og:url", content: currentUrl },
    { property: "og:image", content: `${baseUrl}/og/default.jpg` },
    { name: "twitter:title", content: t("seo.privacy.title") },
    { name: "twitter:description", content: t("seo.privacy.description") },
    { name: "twitter:image", content: `${baseUrl}/og/default.jpg` },
  ],
  link: [
    { rel: "canonical", href: currentUrl },
    { rel: "alternate", hreflang: "en", href: `${baseUrl}/privacy` },
    { rel: "alternate", hreflang: "ru", href: `${baseUrl}/ru/privacy` },
    { rel: "alternate", hreflang: "uk", href: `${baseUrl}/uk/privacy` },
    { rel: "alternate", hreflang: "x-default", href: `${baseUrl}/privacy` },
  ],
});
</script>

<style lang="scss"></style>
