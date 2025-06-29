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
    <video
      preload="none"
      autoplay
      muted
      loop
      playsinline
      class="preview__video"
    >
      <source src="assets/videos/preview-video.mp4" type="video/mp4" />
      {{ t("pages.home.previewSection.noVideoText") }}
    </video>
  </section>
</template>

<script setup>
const { t } = useI18n();
</script>
