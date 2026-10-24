<template>
  <img
    :src="image.src"
    :srcset="image.srcset"
    :sizes="image.srcset ? sizes : undefined"
    :alt="image.alt"
    :width="width || image.width"
    :height="height || image.height"
    :loading="loading"
    :fetchpriority="priority ? 'high' : undefined"
    decoding="async"
  />
</template>

<script setup>
// <img> for CMS images: responsive srcset from the CMS sizes, the original as src (lightbox, fallback).
// width/height default to the intrinsic size to reserve space before the image loads.
defineProps({
  image: {
    type: Object,
    required: true,
  },
  sizes: {
    type: String,
    default: "100vw",
  },
  width: {
    type: [Number, String],
    default: undefined,
  },
  height: {
    type: [Number, String],
    default: undefined,
  },
  loading: {
    type: String,
    default: "lazy",
  },
  priority: {
    type: Boolean,
    default: false,
  },
});
</script>
