<template>
  <div class="blog-page">
    <Header />
    <main class="main">
      <HeroSection />
      <BlogSection
        :filters="filters"
        :articles="filteredArticles"
        :has-any-filters="hasAnyFilters"
        :unavailable="cmsUnavailable"
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
import HeroSection from "@/components/pages/blog/heroSection.vue";
import BlogSection from "@/components/pages/blog/blogSection.vue";
import { fetchAllArticles } from "@/composables/api/articles";
const ContactUs = defineAsyncComponent(() =>
  import("@/layouts/Contact-us.vue")
);
const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;

const { t } = useI18n();
usePageSeo({
  title: () => t("seo.blog.title"),
  description: () => t("seo.blog.description"),
});

const { locale } = useI18n();
const { filters } = useFilters({
  typeOfArticle: [],
});
const hasAnyFilters = computed(() => !!filters.value.typeOfArticle.length);

// rendered on the server so the articles are in the initial HTML; filtering stays on the client
const { data: articles, error } = await useAsyncData(
  () => `blog-${locale.value}`,
  () => fetchAllArticles(locale.value),
  { default: () => [] }
);

// CMS outage: the page keeps its layout (header, hero, filters) instead of the error page, but says
// the articles are temporarily unavailable instead of "nothing here yet", and answers 503 with Retry-After so
// that search engines keep the indexed page instead of an empty list
const cmsUnavailable = computed(() => !!error.value);
if (import.meta.server && error.value) {
  setResponseStatus(useRequestEvent(), 503, "CMS is unavailable");
  useResponseHeader("Retry-After").value = "120";
}

const filteredArticles = computed(() => {
  return (articles.value || []).filter((article) => {
    return filters.value.typeOfArticle.length
      ? filters.value.typeOfArticle.includes(article.theme)
      : true;
  });
});
</script>
<style lang="scss"></style>
