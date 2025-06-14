<template>
  <div class="catalog-page">
    <Header />
    <main class="main">
      <HeroSection />
      <CatalogSection :filters="filters" :pictures="filteredPictures" />
      <ContactUs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { useFilters } from "@/composables/useFilters";
import Header from "@/layouts/Header.vue";
import HeroSection from "@/components/pages/catalog/heroSection.vue";
import CatalogSection from "@/components/pages/catalog/catalogSection.vue";
import ContactUs from "@/layouts/Contact-us.vue";
import Footer from "@/layouts/Footer.vue";

import { fetchAllPictures } from "@/composables/api/paintings";

const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;

const locale = useI18n().locale.value;
const pictures = await fetchAllPictures(locale);

const filteredPictures = computed(() => pictures);

const { filters } = useFilters({
  price: [],
  pictureSize: [],
  sortBy: "",
  pictureOrientation: [],
  availability: [],
});
</script>

<style lang="scss">
@use "@/assets/scss/pages/catalog.scss";
</style>
