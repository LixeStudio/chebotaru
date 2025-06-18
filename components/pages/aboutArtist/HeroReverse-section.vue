<template>
  <section class="hero reverse">
    <div class="hero__container">
      <div class="hero__content">
        <div class="hero__content-wrapper">
          <h2 class="hero__title">
            {{ t("pages.aboutArtist.heroReverseSection.title") }}
          </h2>
          <ul class="hero__list">
            <li class="hero__item">
              {{ t("pages.aboutArtist.heroReverseSection.items.item1") }}
            </li>
            <li class="hero__item">
              {{ t("pages.aboutArtist.heroReverseSection.items.item2") }}
            </li>
            <li class="hero__item">
              {{ t("pages.aboutArtist.heroReverseSection.items.item3") }}
            </li>
          </ul>
          <p class="hero__text">
            {{ t("pages.aboutArtist.heroReverseSection.text") }}
          </p>
        </div>
        <p class="hero__bg-text bg-text">
          {{ t("pages.aboutArtist.heroReverseSection.bgText") }}
        </p>
      </div>
      <div class="hero__image">
        <NuxtImg
          src="/images/pages/family/about-author/hero-second.webp"
          :alt="t('pages.aboutArtist.heroReverseSection.heroImgAlt')"
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
