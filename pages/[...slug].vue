<template>
  <div class="error-page">
    <Header />
    <main class="main">
      <ErrorSection :status-code="404" @home="goHome" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import ErrorSection from "@/components/pages/error/errorSection.vue";

const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));
const localePath = useLocalePath();
const { t } = useI18n();

const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;

const event = useRequestEvent();
if (import.meta.server && event) {
  setResponseStatus(event, 404);
}

const config = useRuntimeConfig();
const baseUrl = config.public.SITE_URL || "https://andriichebotaru.com";
const defaultImage = `${baseUrl}/og/default.jpg`;

useHead({
  title: t("seo.error.title"),
  meta: [
    { name: "description", content: t("seo.error.description") },
    { name: "robots", content: "noindex, follow" },
    { name: "twitter:title", content: t("seo.error.title") },
    { name: "twitter:description", content: t("seo.error.description") },
    { name: "twitter:image", content: defaultImage },
  ],
});

const goHome = () => {
  navigateTo(localePath("/"));
};
</script>

<style lang="scss"></style>
