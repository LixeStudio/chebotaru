<template>
  <div v-if="article" class="article-page">
    <Header />
    <main class="main">
      <PreviewSection :article="article" :paragraphs="paragraphs" />
      <BodySection :body="article.body" />
      <relatedSection :related-articles="relatedArticles" />
      <ContactUs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "@/layouts/Header.vue";
import PreviewSection from "@/components/pages/article/previewSection.vue";
import BodySection from "@/components/pages/article/bodySection.vue";
import relatedSection from "@/components/pages/article/relatedSection.vue";
import {
  fetchArticlesByDocumentId,
  fetchRelatedArticles,
} from "@/composables/api/articles";
import { useRoute, useRouter } from "vue-router";
const ContactUs = defineAsyncComponent(() =>
  import("@/layouts/Contact-us.vue")
);
const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));
const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const config = useRuntimeConfig();
const baseUrl = config.public.SITE_URL || "https://andriichebotaru.com";
const currentUrl = `${baseUrl}${route.fullPath}`;
const { locale } = useI18n();
const [documentId] = route.params["documentId"].split("-");

const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;

const article = ref(null);
const relatedArticles = ref([]);

const previewText = ref(null);
onMounted(async () => {
  const res = await fetchArticlesByDocumentId(documentId, locale.value);

  if (!res) {
    router.replace(locale.value === "ru" ? "/blog" : `/${locale.value}/blog`);
  } else {
    article.value = res;
    previewText.value = article.value.previewText;
    relatedArticles.value = await fetchRelatedArticles(res, locale.value);
  }
});

const paragraphs = computed(() => {
  return previewText.value.split("\n").filter((p) => p.trim().length);
});

watch(article, () => {
  if (!article.value) return;

  useHead({
    title: article.value.title + t("seo.article.title"),
    meta: [
      { name: "description", content: t("seo.article.description") },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content: article.value.title + t("seo.article.title"),
      },
      {
        property: "og:description",
        content: t("seo.article.description"),
      },
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
});
</script>
<style lang="scss"></style>
