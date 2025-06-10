<template>
  <section class="hero brothers-wife reverse">
    <div class="hero__container">
      <div class="hero__content">
        <div class="hero__content-wrapper">
          <span class="hero__role"
            >{{ t("pages.aboutOleksiiAndWife.heroBrothersWifeSection.role") }}
          </span>
          <h2 class="hero__title">
            {{ t("pages.aboutOleksiiAndWife.heroBrothersWifeSection.title") }}
          </h2>
          <p class="hero__text">
            {{ t("pages.aboutOleksiiAndWife.heroBrothersWifeSection.text") }}
          </p>
        </div>
        <p class="hero__bg-text bg-text">
          {{ t("pages.aboutOleksiiAndWife.heroBrothersWifeSection.bgText") }}
        </p>
      </div>
      <div class="hero__image">
        <NuxtImg
          src="/images/pages/family/brother-and-wife/Alla-Kislyakova.webp"
          :alt="t('pages.aboutOleksiiAndWife.heroBrothersWifeSection.imgAlt')"
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
