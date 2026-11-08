<template>
  <section class="error" :aria-labelledby="titleId">
    <div class="error__bg" aria-hidden="true"></div>
    <div class="error__overlay" aria-hidden="true"></div>
    <div class="error__container">
      <p class="error__code" aria-hidden="true">
        {{ is404 ? "404" : statusCode }}
      </p>
      <div class="error__content">
        <h1 :id="titleId" class="error__title">
          {{ is404 ? t("pages.error.title") : t("pages.error.genericTitle") }}
        </h1>
        <p class="error__text">
          {{ is404 ? t("pages.error.text") : t("pages.error.genericText") }}
        </p>
        <button type="button" class="error__btn btn-circle" @click="emit('home')">
          {{ t("pages.error.btnHome") }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  statusCode: {
    type: Number,
    default: 404,
  },
});

const emit = defineEmits(["home"]);
const { t } = useI18n();
const titleId = "error-page-title";
const is404 = computed(() => props.statusCode === 404);
</script>
