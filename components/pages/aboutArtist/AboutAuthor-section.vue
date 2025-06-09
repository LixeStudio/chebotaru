<template>
  <section class="about-author">
    <div class="about-author__container">
      <div class="about-author__images">
        <NuxtImg
          src="/images/icons/about-author/surfers.webp"
          class="about-author__art-element surfers"
          width="185"
          height="222"
          loading="lazy"
          :alt="t('pages.aboutArtist.aboutAuthorSection.images.imgAlt1')"
        />
        <NuxtImg
          src="/images/icons/about-author/boat.webp"
          class="about-author__art-element boat"
          width="126"
          height="159"
          loading="lazy"
          :alt="t('pages.aboutArtist.aboutAuthorSection.images.imgAlt2')"
        />
      </div>
      <p class="about-author__text">
        {{ t("pages.aboutArtist.aboutAuthorSection.text") }}
      </p>
      <div class="about-author__images">
        <NuxtImg
          src="/images/icons/about-author/sunflower.webp"
          class="about-author__art-element sunflower"
          width="133"
          height="154"
          loading="lazy"
          :alt="t('pages.aboutArtist.aboutAuthorSection.images.imgAlt3')"
        />
        <NuxtImg
          src="/images/icons/about-author/pueblo.webp"
          class="about-author__art-element pueblo"
          width="503"
          height="191"
          loading="lazy"
          :alt="t('pages.aboutArtist.aboutAuthorSection.images.imgAlt4')"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
</script>

<style lang="scss" scoped>
@use "assets/scss/utils/variables" as *;
</style>
