<template>
  <section class="preview">
    <div class="preview__container">
      <h1 class="preview__title">
        {{ t("pages.aboutOleksiiAndWife.previewSection.title") }}
      </h1>
      <div class="preview__image">
        <picture>
          <source
            srcset="
              /images/pages/family/brother-and-wife/preview-image-tablet.webp
            "
            media="(max-width: 48.0625rem)"
          />
          <img
            src="/images/pages/family/brother-and-wife/preview-image.webp"
            :alt="t('pages.aboutOleksiiAndWife.previewSection.imgAlt')"
            width="1440"
            height="747"
            loading="lazy"
          />
        </picture>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
</script>
