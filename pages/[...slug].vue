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

useHead({
  title: t("seo.error.title"),
  meta: [
    { name: "description", content: t("seo.error.description") },
    { name: "robots", content: "noindex, follow" },
  ],
});

const goHome = () => {
  navigateTo(localePath("/"));
};
</script>

<style lang="scss"></style>
