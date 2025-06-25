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
import ContactUs from "@/layouts/Contact-us.vue";
import Footer from "@/layouts/Footer.vue";
import {
  fetchArticlesByDocumentId,
  fetchRelatedArticles,
} from "@/composables/api/articles";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
const [documentId] = route.params["documentId"].split("-");

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
</script>

<style lang="scss">
@use "@/assets/scss/pages/article.scss";
</style>
