<template>
  <div class="catalog-page">
    <Header />
    <main class="main">
      <HeroSection />
      <CatalogSection
        :filters="filters"
        :pictures="filteredPictures"
        :has-any-filters="hasAnyFilters"
      />
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

const getPriceMatch = (price, filterPrices) => {
  return filterPrices.some((pFilter) => {
    if (pFilter === "300-700") return price >= 300 && price <= 700;
    if (pFilter === "less-300") return price < 300;
    if (pFilter === "more-700") return price >= 700;
    return false;
  });
};

const locale = useI18n().locale.value;
const pictures = ref([]);

onMounted(async () => {
  pictures.value = await fetchAllPictures(locale);
});

const { filters } = useFilters({
  price: [],
  pictureSize: [],
  sortBy: "",
  pictureOrientation: [],
  availability: [],
});
const hasAnyFilters = computed(() => {
  return !!(
    filters.value.price.length ||
    filters.value.pictureSize.length ||
    filters.value.pictureOrientation.length ||
    filters.value.availability.length
  );
});
// bag tyt
const filteredPictures = computed(() => {
  return pictures.value
    .filter((picture) => {
      const isAvailable = filters.value.availability.length
        ? filters.value.availability.includes(picture.availability)
        : true;

      const isSizeMatch = filters.value.pictureSize.length
        ? filters.value.pictureSize.includes(picture.details.size)
        : true;

      const isOrientationMatch = filters.value.pictureOrientation.length
        ? filters.value.pictureOrientation.includes(picture.orientation)
        : true;

      const isPriceMatch = filters.value.price.length
        ? getPriceMatch(picture.price, filters.value.price)
        : true;
      return isAvailable && isSizeMatch && isOrientationMatch && isPriceMatch;
    })
    .sort((a, b) => {
      switch (filters.value.sortBy) {
        case "cheapPictures":
          return a.price - b.price;
        case "expensivePictures":
          return b.price - a.price;
        case "newPictures":
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        default:
          return 0;
      }
    });
});
</script>

<style lang="scss">
@use "@/assets/scss/pages/catalog.scss";
</style>
