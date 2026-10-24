<template>
  <section class="blog">
    <div class="blog__container">
      <BlogFiltersMenu :filters="filters" />
      <div
        v-if="state === 'list'"
        :key="listKey"
        class="blog__articles articles-blog"
        :class="{ 'list-entrance': entering }"
      >
        <BlogArticle
          v-for="(article, index) in articles"
          :key="article.documentId"
          v-reveal
          :article="article"
          :eager="index < 2"
        />
      </div>
      <template v-else>
        <p v-if="state === 'unavailable'" class="blog__text-second">
          {{ t("pages.blog.blogSection.unavailable") }}
        </p>
        <p v-else-if="state === 'noFilteredResults'" class="blog__text-second">
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
import { listState } from "@/composables/listState";
import { useListEntrance, vReveal } from "@/composables/reveal";

const props = defineProps({
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
  // the CMS request failed (not the same as an empty blog)
  unavailable: {
    type: Boolean,
    default: false,
  },
});
const state = computed(() =>
  listState({
    count: props.articles.length,
    failed: props.unavailable,
    hasFilters: props.hasAnyFilters,
  })
);
const { listKey, entering } = useListEntrance(() => props.articles);

const { t } = useI18n();
</script>
