<template>
  <section class="preview">
    <div class="preview__container">
      <h1 class="preview__title">
        <span class="visually-hidden">{{
          t("pages.home.previewSection.titleSpan")
        }}</span>
        <NuxtImg
          src="/images/pages/home/logo.svg"
          :alt="t('pages.home.previewSection.titleImgAlt')"
          width="969"
          height="201"
        />
      </h1>
    </div>
    <div class="preview__bg"></div>
  </section>
</template>

<script setup>
const { t } = useI18n();
</script>
