<template>
  <section v-if="relatedPictures.length" class="related-works">
    <div class="related-works__container">
      <h2 class="related-works__title">
        {{ t("pages.pictureDetails.relatedWorks.title") }}
      </h2>
      <div class="related-works__pictures gallery">
        <ul class="related-works__list gallery__list">
          <GalleryItem
            v-for="pic in relatedPictures"
            :key="pic.id"
            :picture="pic"
            class="related-works__item"
          />
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import GalleryItem from "@/components/GalleryItem.vue";
defineProps({
  relatedPictures: {
    type: Array,
    required: true,
  },
});
const { t } = useI18n();
</script>
