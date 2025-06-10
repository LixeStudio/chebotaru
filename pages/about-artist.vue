<template>
  <div class="about-artist-page">
    <Header />
    <main class="main">
      <PreviewSection />
      <AboutAuthorSection />
      <HeroSection />
      <InspirationMapSection />
      <HeroReverseSection />
      <FamilyQuote :quote="quoteText" :author="quoteAuthor" />
      <CareerTimelineSection />
      <ContactUs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import PreviewSection from "@/components/pages/aboutArtist/Preview-section.vue";
import AboutAuthorSection from "@/components/pages/aboutArtist/AboutAuthor-section.vue";
import InspirationMapSection from "@/components/pages/aboutArtist/InspirationMap-section.vue";
import HeroReverseSection from "@/components/pages/aboutArtist/HeroReverse-section.vue";
import FamilyQuote from "@/layouts/FamilyQuote.vue";
import CareerTimelineSection from "@/components/pages/aboutArtist/CareerTimeline-section.vue";
import ContactUs from "@/layouts/Contact-us.vue";
import Footer from "@/layouts/Footer.vue";
import HeroSection from "@/components/pages/aboutArtist/Hero-section.vue";
const { t } = useI18n();
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = true;
const quoteText = t("pages.aboutArtist.quoteSection.text");
const quoteAuthor = t("pages.aboutArtist.quoteSection.author");
</script>

<style lang="scss">
@use "@/assets/scss/pages/about-artist.scss";
</style>
