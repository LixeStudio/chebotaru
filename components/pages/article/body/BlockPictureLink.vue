<template>
  <div class="body__link-block link-block">
    <NuxtLink :to="to" class="link-block__link link-block__link--picture">
      <div class="link-block__media link-block__media--contain">
        <CmsImage
          v-if="picture.image && picture.image.src"
          :image="image"
          sizes="(max-width: 767px) 120px, 181px"
          class="link-block__img"
        />
      </div>
      <div class="link-block__body">
        <p class="link-block__top">
          <span class="link-block__overline">{{
            t("pages.article.body.fromCatalogue")
          }}</span>
          <span v-if="picture.details.year" class="link-block__overline">{{
            picture.details.year
          }}</span>
        </p>
        <h3 class="link-block__title">{{ picture.title }}</h3>
        <p v-if="info" class="link-block__info">{{ info }}</p>
        <div class="link-block__bottom">
          <SoldBadge v-if="isSold" placement="title" class="link-block__sold" />
          <span v-else class="link-block__price">{{ price }}</span>
          <span class="link-block__action">
            {{ t("pages.article.body.viewInCatalogue") }}
            <span class="link-block__arrow" aria-hidden="true" />
          </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import CmsImage from "@/components/CmsImage.vue";
import SoldBadge from "@/components/SoldBadge.vue";
import { formatPrice } from "@/composables/usePrice";

// A painting of the catalog inside the text (block "picture_link"): the whole card is one link to its page
const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();
const localePath = useLocalePath();

const picture = computed(() => props.block.picture);
const to = computed(() =>
  localePath(`/picture-details/${picture.value.documentId}-${picture.value.slug}`)
);
// the alt of the image is the title of the painting
const image = computed(() => ({ ...picture.value.image, alt: picture.value.title }));
const isSold = computed(() => picture.value.availability === "sold");
const price = computed(() =>
  formatPrice(picture.value.price, picture.value.currency)
);
// the technique and material; without it the size of the painting
const info = computed(() => {
  const { material, sizeInSm } = picture.value.details;
  if (material) return material;
  return sizeInSm ? `${sizeInSm} ${t("units.centimeters")}` : "";
});
</script>
