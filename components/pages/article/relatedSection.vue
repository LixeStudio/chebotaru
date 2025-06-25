<template>
  <section v-if="relatedArticles.length" class="related-works">
    <div class="related-works__container">
      <h2 class="related-works__title">
        {{ t("pages.article.relatedWorks.title") }}
      </h2>
      <div class="related-works__articles">
        <BlogArticle
          v-for="article in relatedArticles"
          :key="article.documentId"
          :article="article"
          class="related-works__item"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import BlogArticle from "@/components/BlogArticle.vue";
defineProps({
  relatedArticles: {
    type: Array,
    default: () => [],
  },
});
const { t } = useI18n();
</script>
