<template>
  <div class="about-mother-page">
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
import HeroSection from "@/components/pages/aboutMother/Hero-section.vue";
import CareerTimelineSection from "@/components/pages/aboutMother/CareerTimeline-section.vue";
import RecognitionSection from "@/components/pages/aboutMother/Recognition-section.vue";
import FamilyQuote from "@/layouts/FamilyQuote.vue";
const ContactUs = defineAsyncComponent(() =>
  import("@/layouts/Contact-us.vue")
);
const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));
const { t } = useI18n();
usePageSeo({
  title: () => t("seo.aboutMother.title"),
  description: () => t("seo.aboutMother.description"),
  image: "/og/aboutMother.jpg",
});

const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;
const quoteText = t("pages.aboutMother.quoteSection.text");
const quoteAuthor = t("pages.aboutMother.quoteSection.author");
</script>

<style lang="scss"></style>
