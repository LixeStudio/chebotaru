<template>
  <div class="catalog-page">
    <Header />
    <main class="main">
      <HeroSection />
      <CatalogSection :filters="filters" />
      <ContactUs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { watch } from "vue";
import Header from "@/layouts/Header.vue";
import HeroSection from "@/components/pages/catalog/heroSection.vue";
import CatalogSection from "@/components/pages/catalog/catalogSection.vue";
import ContactUs from "@/layouts/Contact-us.vue";
import Footer from "@/layouts/Footer.vue";
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;

const filters = ref({
  price: [],
  pictureSize: [],
  sortBy: "",
  pictureOrientation: [],
  availability: [],
});

watch(filters.value, () => {
  console.log(filters.value);
});
</script>

<style lang="scss">
@use "@/assets/scss/pages/catalog.scss";
</style>
