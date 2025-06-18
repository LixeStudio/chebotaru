<template>
  <section class="hero brother">
    <div class="hero__container">
      <div class="hero__content">
        <span class="hero__role"
          >{{ t("pages.aboutOleksiiAndWife.heroBrotherSection.role") }}
        </span>
        <h2 class="hero__title">
          {{ t("pages.aboutOleksiiAndWife.heroBrotherSection.title") }}
        </h2>
        <p class="hero__text">
          {{ t("pages.aboutOleksiiAndWife.heroBrotherSection.text") }}
        </p>
        <p class="hero__bg-text bg-text">
          {{ t("pages.aboutOleksiiAndWife.heroBrotherSection.bgText") }}
        </p>
      </div>
      <div class="hero__image">
        <NuxtImg
          src="/images/pages/family/brother-and-wife/oleskii-chebotaru.webp"
          :alt="t('pages.aboutOleksiiAndWife.heroBrotherSection.imgAlt')"
          width="720"
          height="840"
          format="webp"
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
