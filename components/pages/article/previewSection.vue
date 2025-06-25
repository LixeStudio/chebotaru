<template>
  <section class="preview">
    <div class="preview__container">
      <div class="preview__top">
        <h1 class="preview__title">
          {{ article.title }}
        </h1>
        <div class="preview__info">
          <p class="articles-blog__theme article-card__theme">
            {{ themeValues[article.theme] }}
          </p>
          <p
            v-if="article.publishedAt"
            class="preview__date article-card__date"
          >
            {{ formatDate(article.publishedAt, locale) }}
          </p>
        </div>
      </div>
      <div v-if="article.image && article.image.src" class="preview__image">
        <NuxtImg
          :src="article.image.src"
          :alt="article.image.alt"
          width="1440"
          height="690"
        />
      </div>
      <div v-if="paragraphs.length" class="preview__text-block">
        <p
          v-for="(paragraph, index) in paragraphs"
          :key="index"
          class="preview__text"
        >
          {{ paragraph }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { formatDate } from "@/composables/useDate";
defineProps({
  article: {
    type: Object,
    required: true,
  },
  paragraphs: {
    type: Array,
    default: () => [],
  },
});
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
