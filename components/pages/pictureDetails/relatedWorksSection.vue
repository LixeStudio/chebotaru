<template>
  <section class="related-works">
    <div class="related-works__container">
      <h2 class="related-works__title">
        {{ t("pages.pictureDetails.relatedWorks.title") }}
      </h2>
      <div class="related-works__pictures gallery">
        <ul class="related-works__list gallery__list">
          <GalleryItem v-for="a in relatedPictures" :key="a" class="related-works__item" />
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue"
import GalleryItem from "@/components/GalleryItem.vue";
const { t } = useI18n();
const relatedPictures = ref([])
</script>
