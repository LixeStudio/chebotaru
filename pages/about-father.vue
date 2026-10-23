<template>
  <div class="about-father-page">
    <Header />
    <main class="main">
      <HeroSection />
      <CareerTimelineSection />
      <RecognitionSection />
      <FamilyQuote :quote="quoteText" :author="quoteAuthor" />
      <ContactUs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { usePageSeo } from "@/composables/usePageSeo";
import Header from "@/layouts/Header.vue";
import HeroSection from "@/components/pages/aboutFather/Hero-section.vue";
import CareerTimelineSection from "@/components/pages/aboutFather/CareerTimeline-section.vue";
import RecognitionSection from "@/components/pages/aboutFather/Recognition-section.vue";
import FamilyQuote from "@/layouts/FamilyQuote.vue";
const ContactUs = defineAsyncComponent(() =>
  import("@/layouts/Contact-us.vue")
);
const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));
const { t } = useI18n();
usePageSeo({
  title: () => t("seo.aboutFather.title"),
  description: () => t("seo.aboutFather.description"),
  image: "/og/aboutFather.jpg",
});
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;
const quoteText = t("pages.aboutFather.quoteSection.text");
const quoteAuthor = t("pages.aboutFather.quoteSection.author");
</script>
<style lang="scss"></style>
