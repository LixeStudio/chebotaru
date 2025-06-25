<template>
  <div class="blog-page">
    <Header />
    <main class="main">
      <HeroSection />
      <BlogSection
        :filters="filters"
        :articles="filteredArticles"
        :has-any-filters="hasAnyFilters"
      />
      <ContactUs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useFilters } from "@/composables/useFilters";
import Header from "@/layouts/Header.vue";
import HeroSection from "@/components/pages/blog/heroSection.vue";
import BlogSection from "@/components/pages/blog/blogSection.vue";
import ContactUs from "@/layouts/Contact-us.vue";
import Footer from "@/layouts/Footer.vue";
import { fetchAllArticles } from "@/composables/api/articles";
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;
const locale = useI18n().locale.value;
const { filters } = useFilters({
  typeOfArticle: [],
});
const hasAnyFilters = computed(() => !!filters.value.typeOfArticle.length);
const articles = ref([]);
onMounted(async () => {
  articles.value = await fetchAllArticles(locale);
});

const filteredArticles = computed(() => {
  return articles.value.filter((article) => {
    return filters.value.typeOfArticle.length
      ? filters.value.typeOfArticle.includes(article.theme)
      : true;
  });
});
</script>

<style lang="scss">
@use "@/assets/scss/pages/blog.scss";
</style>
