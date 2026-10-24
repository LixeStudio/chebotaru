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
import { usePageSeo } from "@/composables/usePageSeo";
import { useFilters } from "@/composables/useFilters";
import Header from "@/layouts/Header.vue";
import HeroSection from "@/components/pages/catalog/heroSection.vue";
import CatalogSection from "@/components/pages/catalog/catalogSection.vue";
import { fetchAllPictures } from "@/composables/api/paintings";
const ContactUs = defineAsyncComponent(() =>
  import("@/layouts/Contact-us.vue")
);
const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;
const { t } = useI18n();
usePageSeo({
  title: () => t("seo.catalog.title"),
  description: () => t("seo.catalog.description"),
});

const getPriceMatch = (price, filterPrices) => {
  return filterPrices.some((pFilter) => {
    if (pFilter === "300-700") return price >= 300 && price <= 700;
    if (pFilter === "less-300") return price < 300;
    if (pFilter === "more-700") return price >= 700;
    return false;
  });
};

const { locale } = useI18n();

// rendered on the server so the works are in the initial HTML (no empty state, no layout shift);
// filtering and sorting stay on the client
const { data: pictures } = await useAsyncData(
  () => `catalog-${locale.value}`,
  async () => {
    try {
      return await fetchAllPictures(locale.value);
    } catch {
      // CMS/network failure: keep the catalog page with the empty state, not error.vue
      return [];
    }
  },
  { default: () => [] }
);

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
  return (pictures.value || [])
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

<style lang="scss"></style>
