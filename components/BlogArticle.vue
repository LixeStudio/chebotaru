<template>
  <article class="articles-blog__article article-card">
    <div class="articles-blog__image article-card__image">
      <NuxtImg
        v-if="article.image && article.image.src"
        :src="article.image.src"
        :alt="article.image.alt"
        width="392"
        height="300"
      />
    </div>
    <h3 class="articles-blog__title article-card__title">
      {{ article.title }}
    </h3>
    <p class="articles-blog__text article-card__text">
      {{ article.previewText }}
    </p>
    <span class="articles-blog__separator-line article-card__separator-line" />
    <div class="articles-blog__bottom article-card__bottom">
      <p class="articles-blog__theme article-card__theme">
        {{ themeValues[article.theme] }}
      </p>
      <p
        v-if="article.publishedAt"
        class="articles-blog__date article-card__date"
      >
        {{ formatDate(article.publishedAt, locale) }}
      </p>
      <NuxtLink
        :to="localePath(`/article/${article.documentId}-${article.slug}`)"
        class="articles-blog__linkto article-card__linkto link-to"
      />
    </div>
  </article>
</template>

<script setup>
import { formatDate } from "@/composables/useDate";
defineProps({
  article: {
    type: Object,
    required: true,
  },
});
const localePath = useLocalePath();
const { t, locale } = useI18n();
const aboutPictures = t("pages.blog.blogSection.filters.aboutPictures");
const interview = t("pages.blog.blogSection.filters.interview");
const exhibitions = t("pages.blog.blogSection.filters.exhibitions");
const inspiration = t("pages.blog.blogSection.filters.inspiration");

const themeValues = {
  aboutPictures,
  interview,
  exhibitions,
  inspiration,
};
</script>
