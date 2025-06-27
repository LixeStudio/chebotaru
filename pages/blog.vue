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
import { fetchAllArticles } from "@/composables/api/articles";
const ContactUs = defineAsyncComponent(() =>
  import("@/layouts/Contact-us.vue")
);
const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;

const route = useRoute();
const { t } = useI18n();
const config = useRuntimeConfig();
const baseUrl = config.public.SITE_URL || "https://andriichebotaru.com";
const currentUrl = `${baseUrl}${route.fullPath}`;
useHead({
  title: t("seo.blog.title"),
  meta: [
    { name: "description", content: t("seo.blog.description") },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: t("seo.blog.title") },
    { property: "og:description", content: t("seo.blog.description") },
    { property: "og:url", content: currentUrl },
    { property: "og:image", content: `${baseUrl}/og/default.jpg` },
  ],
  link: [
    { rel: "canonical", href: currentUrl },
    { rel: "alternate", hreflang: "uk", href: `${baseUrl}/uk` },
    { rel: "alternate", hreflang: "ru", href: `${baseUrl}/` },
    { rel: "alternate", hreflang: "en", href: `${baseUrl}/en` },
  ],
});

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
<style lang="scss"></style>
