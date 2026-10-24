<template>
  <section class="preview">
    <div class="preview__container">
      <div class="preview__content">
        <h1 class="visually-hidden">
          {{ t("pages.aboutArtist.previewSection.hiddenTitle") }}
        </h1>
        <blockquote class="preview__quote">
          <p class="preview__title">
            <span class="part-1">{{
              t("pages.aboutArtist.previewSection.title.part1")
            }}</span>
            <span class="part-2">{{
              t("pages.aboutArtist.previewSection.title.part2")
            }}</span>
            <span class="part-3">{{
              t("pages.aboutArtist.previewSection.title.part3")
            }}</span>
          </p>
          <footer class="preview__author">
            —
            <cite>{{
              t("pages.aboutArtist.previewSection.previewAuthor")
            }}</cite>
          </footer>
        </blockquote>
        <p class="preview__text">
          {{ t("pages.aboutArtist.previewSection.previewText") }}
        </p>
        <NuxtLink
          :to="localePath('/catalog')"
          class="preview__watch-works btn-circle"
        >
          {{ t("pages.aboutArtist.previewSection.previewLink") }}
        </NuxtLink>
      </div>
      <div class="preview__image-wrapper">
        <div class="preview__image"></div>
        <div class="shadow"></div>
      </div>
    </div>
    <div class="preview__bg"></div>
  </section>
</template>

<script setup>
const localePath = useLocalePath();
const { t } = useI18n();

// The first screen is drawn by two CSS backgrounds (about-artist.scss); the background is the largest element (LCP).
// CSS backgrounds are found only after the stylesheet is parsed, so both are preloaded with the HTML.
useHead({
  link: [
    {
      rel: "preload",
      as: "image",
      type: "image/webp",
      href: "/images/pages/family/about-author/preview__bg.webp",
      fetchpriority: "high",
    },
    {
      rel: "preload",
      as: "image",
      type: "image/webp",
      href: "/images/pages/family/about-author/author-image.webp",
    },
  ],
});
</script>

<style lang="scss"></style>
