<template>
  <article class="artwork">
    <div class="artwork__container">
      <div class="artwork__media">
        <figure class="artwork__image">
          <CmsImage
            :image="photos[active]"
            sizes="(max-width: 1023px) 100vw, 854px"
            width="854"
            height="621"
            loading="eager"
            priority
            @click="openLightbox"
          />
          <figcaption class="visually-hidden">
            {{ picture.image.caption }}
          </figcaption>
        </figure>
        <ul v-if="photos.length > 1" class="artwork__thumbs">
          <li v-for="(photo, index) in photos" :key="photo.src">
            <button
              type="button"
              class="artwork__thumb"
              :class="{ 'artwork__thumb--active': index === active }"
              :aria-label="t('pages.pictureDetails.artworkSection.photo', { n: index + 1, total: photos.length })"
              :aria-current="index === active ? 'true' : undefined"
              @click="active = index"
            >
              <CmsImage :image="photo" sizes="5rem" alt="" />
            </button>
          </li>
        </ul>
      </div>
      <section class="artwork__body">
        <h1 class="artwork__title" :class="{ 'artwork__title--sold': isSold }">
          {{ picture.title }}
        </h1>
        <SoldBadge v-if="isSold" placement="title" />
        <dl class="artwork__details" :class="{ 'artwork__details--sold': isSold }">
          <div>
            <dt>
              {{ t("pages.pictureDetails.artworkSection.details.year") }}
            </dt>
            <dd>{{ picture.details.year }}</dd>
          </div>
          <div>
            <dt>{{ t("pages.pictureDetails.artworkSection.details.size") }}</dt>
            <dd>
              {{ picture.details.sizeInSm }}
              {{ t("units.centimeters") }}
            </dd>
          </div>
          <div>
            <dt>
              {{ t("pages.pictureDetails.artworkSection.details.material") }}
            </dt>
            <dd>{{ picture.details.material }}</dd>
          </div>
          <div v-if="!isSold">
            <dt>
              {{ t("pages.pictureDetails.artworkSection.details.style") }}
            </dt>
            <dd>{{ picture.details.style }}</dd>
          </div>
          <div v-else>
            <dt>
              {{ t("pages.pictureDetails.artworkSection.details.status") }}
            </dt>
            <dd>{{ t("pages.pictureDetails.artworkSection.details.sold") }}</dd>
          </div>
        </dl>
        <!-- a sold painting (the design's "Sold out" page): the sale price, and a request for a similar work in the Buy popup -->
        <div v-if="isSold" class="artwork__sold">
          <p class="artwork__sale">
            <span class="artwork__sale-label">
              {{ t("pages.pictureDetails.artworkSection.salePrice") }}
            </span>
            <span class="artwork__sale-price">
              {{ formatPrice(picture.price, picture.currency) }}
            </span>
          </p>
          <button
            class="artwork__similar btn-circle"
            @click="emit('togglePopup')"
          >
            {{ t("pages.pictureDetails.artworkSection.similarBtn") }}
          </button>
        </div>
        <div v-else class="artwork__body-bottom">
          <p class="artwork__price">
            {{ formatPrice(picture.price, picture.currency) }}
          </p>
          <button class="artwork__btn btn-circle" @click="emit('togglePopup')">
            {{ t("pages.pictureDetails.artworkSection.buyBtn") }}
          </button>
        </div>
      </section>
    </div>
  </article>
  <VueEasyLightbox
    v-if="fullImages.length"
    :visible="visible"
    :index="active"
    :show-index="fullImages.length > 1"
    :rotate-disabled="true"
    :imgs="fullImages"
    :zoom-scale="0.3"
    @hide="closeLightbox"
    @on-index-change="(_, index) => (active = index)"
  />
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import CmsImage from "@/components/CmsImage.vue";
import SoldBadge from "@/components/SoldBadge.vue";
import { formatPrice } from "@/composables/usePrice";

const VueEasyLightbox = defineAsyncComponent(() => import("vue-easy-lightbox"));
const emit = defineEmits(["togglePopup"]);
const props = defineProps({
  picture: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();
// every photo of the painting, the main one first; the thumbnails switch the large one
const isSold = computed(() => props.picture.availability === "sold");
const photos = computed(() => (props.picture.photos?.length ? props.picture.photos : [props.picture.image]));
const active = ref(0);
watch(() => props.picture.documentId, () => (active.value = 0));
// the full-screen view gets the sharpest files, loaded only when it opens
const fullImages = computed(() => photos.value.map((photo) => photo.full || photo.src).filter(Boolean));

const visible = ref(false);

const openLightbox = () => {
  visible.value = true;
};

const closeLightbox = () => {
  visible.value = false;
};
</script>

<style lang="scss"></style>
