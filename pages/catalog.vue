<template>
  <div class="catalog-page">
    <Header />
    <main class="main">
      <HeroSection />
      <CatalogSection
        :filters="filters"
        :pictures="pictures"
        :has-any-filters="hasAnyFilters"
        :unavailable="cmsUnavailable"
        :total="catalog.total"
        :next-page="nextPage"
        :list-id="listId"
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
import { fetchCatalogPage } from "@/composables/api/paintings";
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

const { locale } = useI18n();
const route = useRoute();

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

// The address is the state: filters, sorting and ?page=N ("show more"). Rendered on the server, page by page: the HTML
// carries only the works shown (24 per page), not the whole catalog; filtering and sorting run on the site's server
// (server/api/catalog.get.ts) over the cached list.
const catalogQuery = computed(() => {
  const { price, pictureSize, sortBy, pictureOrientation, availability, page } = route.query;
  return Object.fromEntries(
    Object.entries({ price, pictureSize, sortBy, pictureOrientation, availability, page })
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => [key, String(value)])
  );
});
const { data: catalog, error } = await useAsyncData(
  () => `catalog-${locale.value}-${JSON.stringify(catalogQuery.value)}`,
  () => fetchCatalogPage(locale.value, catalogQuery.value),
  { default: () => ({ pictures: [], total: 0, page: 1, pageSize: 24, hasMore: false }) }
);
const pictures = computed(() => catalog.value.pictures);

// CMS outage: the page keeps its layout (header, hero, filters) instead of the error page, but says
// the works are temporarily unavailable instead of "nothing here yet", and answers 503 with Retry-After so
// that search engines keep the indexed page instead of an empty list
const cmsUnavailable = computed(() => !!error.value);
if (import.meta.server && error.value) {
  setResponseStatus(useRequestEvent(), 503, "CMS is unavailable");
  useResponseHeader("Retry-After").value = "120";
}

// "Show more": a real link to the next page, so search engines can follow it too; in the browser it only adds cards
const nextPage = computed(() =>
  catalog.value.hasMore ? { query: { ...route.query, page: String(catalog.value.page + 1) } } : null
);
// the list animates in again only when the filters or the sorting change, not when more cards are added
const listId = computed(() => {
  const { page, ...rest } = catalogQuery.value;
  return JSON.stringify(rest);
});
</script>

<style lang="scss"></style>
