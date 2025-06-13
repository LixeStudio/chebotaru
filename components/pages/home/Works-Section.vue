<template>
  <section class="works">
    <div class="works__container">
      <div class="works__top">
        <h2
          class="works__title title-works"
          :aria-label="t('pages.home.worksSection.title.titleAriaLabel')"
        >
          <span class="title-works__row row-1">
            <span class="big-yellow span-1">{{
              t("pages.home.worksSection.title.row1.yellowSpan")
            }}</span>
            {{ t("pages.home.worksSection.title.row1.textPart1") }}
          </span>
          <span class="title-works__row row-2">
            <span class="span-3">{{
              t("pages.home.worksSection.title.row2.textPart1")
            }}</span>
            <span class="big-yellow span-4">{{
              t("pages.home.worksSection.title.row2.yellowSpan")
            }}</span>
          </span>
          <span class="title-works__row row-3">
            {{ t("pages.home.worksSection.title.row3.textPart1") }}
            <span class="big-yellow span-6">{{
              t("pages.home.worksSection.title.row3.yellowSpan")
            }}</span>
            {{ t("pages.home.worksSection.title.row3.textPart2") }}
          </span>
        </h2>
        <NuxtLink
          :to="localePath('/about-artist')"
          class="works__btn-toknow btn-circle"
        >
          {{ t("pages.home.worksSection.btnToKnow") }}
        </NuxtLink>
      </div>
      <div class="works__pictures pictures-works gallery">
        <ul class="pictures-works__list gallery__list">
          <GalleryItem v-for="a in 6" :key="a" />
        </ul>
      </div>
      <NuxtLink to="/catalog" class="works__btn-view-all btn-circle">
        {{ t("pages.home.worksSection.btnViewAll") }}
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
import GalleryItem from "@/components/GalleryItem.vue";
const localePath = useLocalePath();
const { t } = useI18n();
</script>
