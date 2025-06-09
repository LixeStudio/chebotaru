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
import Header from "@/layouts/Header.vue";
import HeroSection from "@/components/pages/aboutFather/Hero-section.vue";
import CareerTimelineSection from "@/components/pages/aboutFather/CareerTimeline-section.vue";
import RecognitionSection from "@/components/pages/aboutFather/Recognition-section.vue";
import FamilyQuote from "@/layouts/FamilyQuote.vue";
import ContactUs from "@/layouts/Contact-us.vue";
import Footer from "@/layouts/Footer.vue";
const { t } = useI18n();
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;
const quoteText = t("pages.aboutFather.quoteSection.text");
const quoteAuthor = t("pages.aboutFather.quoteSection.author");
</script>

<style lang="scss">
@use "@/assets/scss/pages/about-father.scss";
</style>
