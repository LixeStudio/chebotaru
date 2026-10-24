<template>
  <section class="preview">
    <div class="preview__container">
      <div class="preview__top">
        <h1 class="preview__title">
          {{ article.title }}
        </h1>
        <div class="preview__info">
          <!-- the author (byline) links to the artist's page; same look and separator dot as the theme -->
          <NuxtLink
            :to="localePath('/about-artist')"
            rel="author"
            class="preview__author articles-blog__theme article-card__theme"
          >
            {{ t("seo.siteName") }}
          </NuxtLink>
          <p class="articles-blog__theme article-card__theme">
            {{ themeValues[article.theme] }}
          </p>
          <p
            v-if="article.publishedAt"
            class="preview__date article-card__date"
          >
            <time :datetime="article.publishedAt">{{
              formatDate(article.publishedAt, locale)
            }}</time>
          </p>
        </div>
      </div>
      <div v-if="article.image && article.image.src" class="preview__image">
        <CmsImage
          :image="article.image"
          sizes="100vw"
          width="1440"
          height="690"
          loading="eager"
          priority
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
import CmsImage from "@/components/CmsImage.vue";
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
const localePath = useLocalePath();
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
