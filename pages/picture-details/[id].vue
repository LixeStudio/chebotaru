<template>
  <div class="picture-details-page">
    <Header />
    <main class="main">
      <ArtworkSection />
      <RelatedWorksSection />
      <ContactUs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "@/layouts/Header.vue";
import ArtworkSection from "@/components/pages/pictureDetails/artworkSection.vue";
import RelatedWorksSection from "@/components/pages/pictureDetails/relatedWorksSection.vue";
import ContactUs from "@/layouts/Contact-us.vue";
import Footer from "@/layouts/Footer.vue";
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;
</script>

<style lang="scss">
@use "@/assets/scss/pages/picture-details.scss";
</style>
