<template>
  <section class="hero">
    <div class="hero__container">
      <h1 class="hero__title">{{ t("pages.blog.heroSection.title") }}</h1>
      <p class="hero__text">
        {{ t("pages.blog.heroSection.text") }}
      </p>
      <p class="hero__bg-text bg-text">
        {{ t("pages.blog.heroSection.bgText") }}
      </p>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
</script>
