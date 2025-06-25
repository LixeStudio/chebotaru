<template>
  <section class="blog">
    <div class="blog__container">
      <BlogFiltersMenu :filters="filters" />
      <div v-if="articles.length" class="blog__articles articles-blog">
        <BlogArticle
          v-for="article in articles"
          :key="article.documentId"
          :article="article"
        />
      </div>
      <template v-else>
        <p v-if="hasAnyFilters" class="blog__text-second">
          {{ t("pages.blog.blogSection.noFilteredResults") }}
        </p>
        <p v-else class="blog__text-second">
          {{ t("pages.blog.blogSection.noPictures") }}
        </p>
      </template>
    </div>
  </section>
</template>

<script setup>
import BlogFiltersMenu from "@/components/blogFiltersMenu.vue";
import BlogArticle from "@/components/BlogArticle.vue";

defineProps({
  filters: {
    type: Object,
    required: true,
  },
  articles: {
    type: Array,
    required: true,
  },
  hasAnyFilters: {
    type: Boolean,
    required: true,
  },
});

const { t } = useI18n();
</script>
