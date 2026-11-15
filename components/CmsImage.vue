<template>
  <img
    ref="imgRef"
    :src="image.src"
    :srcset="image.srcset"
    :sizes="image.srcset ? sizes : undefined"
    :alt="image.alt"
    :width="width || image.width"
    :height="height || image.height"
    :loading="loading"
    :fetchpriority="priority ? 'high' : undefined"
    decoding="async"
    :class="{ 'cms-image--pending': pending, 'cms-image--fade': fade }"
    @load="reveal"
    @error="reveal"
  />
</template>

<script setup>
// <img> for CMS images: responsive srcset from the CMS sizes, the original as src (lightbox, fallback).
// width/height default to the intrinsic size to reserve space before the image loads.
//
// After a client-side navigation the image fades in once it has loaded instead of being painted piece by piece.
// Not on the first (server-rendered) load: the image may already be on screen and hiding it would blink.
// An image that is already in the browser cache is shown at once, without the fade.
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

const nuxtApp = useNuxtApp();
const imgRef = ref(null);
const pending = ref(import.meta.client && !nuxtApp.isHydrating);
const fade = ref(false);

const reveal = () => {
  if (!pending.value) return;
  pending.value = false;
  fade.value = true;
};

onMounted(() => {
  // already in the cache: show it as is. naturalWidth too: Chrome reports a deferred loading="lazy" image as complete
  const img = imgRef.value;
  if (pending.value && img?.complete && img.naturalWidth > 0) pending.value = false;
});
</script>

<style lang="scss">
// a keyframe animation, not a transition: cards and galleries set their own `transition` on img (hover zoom)
.cms-image--pending {
  opacity: 0;
}

.cms-image--fade {
  animation: cms-image-fade 0.25s ease;
}

@keyframes cms-image-fade {
  from {
    opacity: 0;
  }
}
</style>
