<template>
  <section class="hero">
    <div class="hero__container">
      <div class="hero__content">
        <h2 class="hero__title">
          {{ t("pages.aboutArtist.heroSection.title") }}
        </h2>
        <p class="hero__text">
          {{ t("pages.aboutArtist.heroSection.text") }}
        </p>
        <p class="hero__text">
          {{ t("pages.aboutArtist.heroSection.text2") }}
        </p>
        <p class="hero__bg-text bg-text">
          {{ t("pages.aboutArtist.heroSection.bgText") }}
        </p>
      </div>
      <div class="hero__image">
        <NuxtImg
          src="/images/pages/family/about-author/chebotaru-mountains-painting.webp"
          :alt="t('pages.aboutArtist.heroSection.imgAlt')"
          width="720"
          height="840"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
</script>

<style lang="scss" scoped>
@use "/assets/scss/components/family-hero";
</style>
