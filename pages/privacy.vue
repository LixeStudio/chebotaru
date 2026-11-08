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
import { usePageSeo } from "@/composables/usePageSeo";
import Header from "@/layouts/Header.vue";
import PrivacyContent from "@/components/pages/privacy/privacyContent.vue";

const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));
const { t } = useI18n();
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;
usePageSeo({
  title: () => t("seo.privacy.title"),
  description: () => t("seo.privacy.description"),
});
</script>

<style lang="scss"></style>
