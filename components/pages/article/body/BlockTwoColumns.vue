<template>
  <div
    class="body__two-columns two-columns"
    :class="`two-columns--media-${block.mediaSide}`"
  >
    <!-- the card comes first in the markup: on a phone it is always on top, whatever side it has on a wide screen -->
    <NuxtLink
      :to="to"
      class="two-columns__card"
      :class="`two-columns__card--${block.target.kind}`"
    >
      <div
        class="two-columns__media"
        :class="
          isPicture
            ? 'two-columns__media--contain'
            : 'two-columns__media--cover'
        "
      >
        <CmsImage
          v-if="image && image.src"
          :image="image"
          sizes="(max-width: 767px) 100vw, 440px"
          class="two-columns__img"
        />
      </div>

      <div v-if="isPicture" class="two-columns__card-body">
        <p class="link-block__overline">
          {{ t("pages.article.body.fromCatalogue") }}
        </p>
        <div class="two-columns__row two-columns__row--title">
          <h3 class="two-columns__card-title">{{ picture.title }}</h3>
          <SoldBadge v-if="isSold" placement="title" class="link-block__sold" />
          <span v-else class="two-columns__price">{{ price }}</span>
        </div>
        <div class="two-columns__row">
          <p class="two-columns__info">{{ pictureInfo }}</p>
          <span class="link-block__action">
            {{ t("pages.article.body.viewInCatalogue") }}
            <span class="link-block__arrow" aria-hidden="true" />
          </span>
        </div>
      </div>

      <div v-else class="two-columns__card-body two-columns__card-body--article">
        <p class="two-columns__row">
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
        <h3 class="two-columns__card-title two-columns__card-title--article">
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

    <div class="two-columns__text">
      <h3 v-if="block.heading" class="two-columns__heading">
        {{ block.heading }}
      </h3>
      <RichText v-if="hasDoc" :doc="block.doc" />
    </div>
  </div>
</template>

<script setup>
import CmsImage from "@/components/CmsImage.vue";
import SoldBadge from "@/components/SoldBadge.vue";
import RichText from "@/components/pages/article/body/RichText.vue";
import { formatDate } from "@/composables/useDate";
import { formatPrice } from "@/composables/usePrice";

// A picture or an article beside a text (block "two_columns"). The card is one link; the text keeps the formatting
// of the other text blocks. The heading is an h3: the h2 headings of the article stay above it.
const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const { t, locale } = useI18n();
const localePath = useLocalePath();

const isPicture = computed(() => props.block.target.kind === "picture");
const picture = computed(() => props.block.target.picture);
const article = computed(() => props.block.target.article);
const item = computed(() => (isPicture.value ? picture.value : article.value));

const to = computed(() =>
  localePath(
    isPicture.value
      ? `/picture-details/${item.value.documentId}-${item.value.slug}`
      : `/article/${item.value.documentId}-${item.value.slug}`
  )
);
// the alt of the image is the title of the picture or the article
const image = computed(() =>
  item.value.image ? { ...item.value.image, alt: item.value.title } : null
);
const isSold = computed(() => isPicture.value && picture.value.availability === "sold");
const price = computed(() =>
  isPicture.value ? formatPrice(picture.value.price, picture.value.currency) : ""
);
// "2024 • Oil on canvas": what the CMS has of the year and the material
const pictureInfo = computed(() =>
  isPicture.value
    ? [picture.value.details.year, picture.value.details.material].filter(Boolean).join(" • ")
    : ""
);
const themeName = computed(() =>
  !isPicture.value && article.value.theme
    ? t(`pages.blog.blogSection.filters.${article.value.theme}`)
    : ""
);

const hasDoc = computed(() => !!props.block.doc?.content?.length);
</script>
