<template>
  <div class="contacts-page">
    <Header />
    <main class="main">
      <HeroSection />
      <ContactUs :show-title="false" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { usePageSeo } from "@/composables/usePageSeo";
import Header from "@/layouts/Header.vue";
import HeroSection from "@/components/pages/contacts/HeroSection.vue";
const ContactUs = defineAsyncComponent(() =>
  import("@/layouts/Contact-us.vue")
);
const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));
const { t } = useI18n();
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;
usePageSeo({
  title: () => t("seo.contacts.title"),
  description: () => t("seo.contacts.description"),
});
</script>

<style lang="scss"></style>
