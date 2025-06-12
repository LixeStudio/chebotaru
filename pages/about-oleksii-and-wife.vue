<template>
  <div class="about-oleksii-and-wife-page">
    <Header />
    <main class="main">
      <PreviewSection />
      <HeroBrotherSection />
      <InfoCardsSection />
      <GalleryBrotherSection />
      <HeroBrothersWifeSection />
      <InfoCardsBrothersWifeSection />
      <GalleryBrothersWifeSection />
      <ContactUs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import PreviewSection from "@/components/pages/aboutOleksiiAndWife/previewSection.vue";
import HeroBrotherSection from "@/components/pages/aboutOleksiiAndWife/HeroBrotherSection.vue";
import InfoCardsSection from "@/components/pages/aboutOleksiiAndWife/infoCardsSection.vue";
import GalleryBrotherSection from "@/components/pages/aboutOleksiiAndWife/galleryBrotherSection.vue";
import HeroBrothersWifeSection from "@/components/pages/aboutOleksiiAndWife/heroBrothersWifeSection.vue";
import InfoCardsBrothersWifeSection from "@/components/pages/aboutOleksiiAndWife/infoCardsBrothersWifeSection.vue";
import GalleryBrothersWifeSection from "@/components/pages/aboutOleksiiAndWife/galleryBrothersWifeSection.vue";
import ContactUs from "@/layouts/Contact-us.vue";
import Footer from "@/layouts/Footer.vue";

const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;
</script>

<style lang="scss">
@use "@/assets/scss/pages/about-oleksii-and-wife.scss";
</style>
