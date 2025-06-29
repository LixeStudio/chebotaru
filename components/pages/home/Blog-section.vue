<template>
  <section class="blog">
    <div class="blog__container">
      <div class="blog__content">
        <p class="blog__bg-text">
          {{ t("pages.home.blogSection.blogBgText") }}
        </p>
        <h2 class="blog__title">{{ t("pages.home.blogSection.blogTitle") }}</h2>
        <NuxtLink :to="localePath('/blog')" class="blog__link btn-circle">
          {{ t("pages.home.blogSection.blogLink") }}
        </NuxtLink>
      </div>
      <div class="blog__articles articles-blog">
        <template v-if="articles.length">
          <BlogArticle
            v-for="article in articles"
            :key="article.documentId"
            :article="article"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import BlogArticle from "@/components/BlogArticle.vue";
import { fetchLimitedArticles } from "@/composables/api/articles";
const { t } = useI18n();
const localePath = useLocalePath();
const locale = useI18n().locale.value;
const articles = ref([]);

onMounted(async () => {
  articles.value = await fetchLimitedArticles(locale, 2);
});
</script>
