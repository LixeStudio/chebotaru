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
import { usePageSeo } from "@/composables/usePageSeo";
import Header from "@/layouts/Header.vue";
import PreviewSection from "@/components/pages/aboutArtist/Preview-section.vue";
import AboutAuthorSection from "@/components/pages/aboutArtist/AboutAuthor-section.vue";
import InspirationMapSection from "@/components/pages/aboutArtist/InspirationMap-section.vue";
import HeroReverseSection from "@/components/pages/aboutArtist/HeroReverse-section.vue";
import FamilyQuote from "@/layouts/FamilyQuote.vue";
import CareerTimelineSection from "@/components/pages/aboutArtist/CareerTimeline-section.vue";
import HeroSection from "@/components/pages/aboutArtist/Hero-section.vue";
const ContactUs = defineAsyncComponent(() =>
  import("@/layouts/Contact-us.vue")
);
const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));
const { t } = useI18n();
usePageSeo({
  title: () => t("seo.aboutArtist.title"),
  description: () => t("seo.aboutArtist.description"),
});
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = true;

const quoteText = t("pages.aboutArtist.quoteSection.text");
const quoteAuthor = t("pages.aboutArtist.quoteSection.author");
</script>

<style lang="scss"></style>
