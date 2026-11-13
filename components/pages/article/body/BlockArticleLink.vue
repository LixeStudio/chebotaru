<template>
  <div class="body__link-block link-block">
    <NuxtLink :to="to" class="link-block__link link-block__link--article">
      <div class="link-block__media link-block__media--cover">
        <CmsImage
          v-if="article.image && article.image.src"
          :image="image"
          sizes="(max-width: 767px) 120px, 181px"
          class="link-block__img"
        />
      </div>
      <div class="link-block__body">
        <p class="link-block__top">
          <span class="link-block__overline link-block__overline--theme">
            {{ t("pages.article.body.blog") }}
            <template v-if="themeName">
              <span class="link-block__dot" aria-hidden="true" />
              {{ themeName }}
            </template>
          </span>
          <span v-if="article.publishedAt" class="link-block__overline">{{
            formatDate(article.publishedAt, locale)
          }}</span>
        </p>
        <h3 class="link-block__title link-block__title--article">
          {{ article.title }}
        </h3>
        <p v-if="article.previewText" class="link-block__description">
          {{ article.previewText }}
        </p>
        <span class="link-block__action link-block__action--below">
          {{ t("pages.article.body.readArticle") }}
          <span class="link-block__arrow" aria-hidden="true" />
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import CmsImage from "@/components/CmsImage.vue";
import { formatDate } from "@/composables/useDate";

// Another article of the blog inside the text (block "article_link"): the whole card is one link to it
const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const { t, locale } = useI18n();
const localePath = useLocalePath();

const article = computed(() => props.block.article);
const to = computed(() =>
  localePath(`/article/${article.value.documentId}-${article.value.slug}`)
);
// the alt of the image is the title of the article
const image = computed(() => ({ ...article.value.image, alt: article.value.title }));
const themeName = computed(() =>
  article.value.theme ? t(`pages.blog.blogSection.filters.${article.value.theme}`) : ""
);
</script>
