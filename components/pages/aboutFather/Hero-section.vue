<template>
  <section class="hero family-hero">
    <div class="hero__container family-hero__container">
      <div class="hero__content family-hero__content">
        <span class="hero__role family-hero__role"
          >{{ t("pages.aboutFather.heroSection.heroRole") }}
        </span>
        <h1 class="hero__title family-hero__title">
          {{ t("pages.aboutFather.heroSection.heroTitle") }}
        </h1>
        <p class="hero__text family-hero__text">
          {{ t("pages.aboutFather.heroSection.heroText") }}
        </p>
        <p class="hero__bg-text family-hero__bg-text bg-text">
          {{ t("pages.aboutFather.heroSection.bgText") }}
        </p>
      </div>
      <div class="hero__image family-hero__image">
        <NuxtImg
          src="/images/pages/family/about-father/nikolai-chebotaru.webp"
          :alt="t('pages.aboutFather.heroSection.heroImg.imgAlt')"
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
