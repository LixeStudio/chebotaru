<template>
  <section class="quote">
    <div class="quote__container">
      <blockquote class="quote__text">
        <div class="quote__wrapper">
          <div class="quote__arrow left"></div>
          <p>{{ quote }}</p>
          <div class="quote__arrow right"></div>
        </div>
        <cite v-if="author" class="quote__author">{{ author }}</cite>
      </blockquote>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  quote: string;
  author?: string;
}>();
</script>
