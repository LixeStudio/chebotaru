<template>
  <li class="pictures-works__item gallery__item">
    <NuxtLink
      :to="localePath(`/picture-details/${picture.documentId}-${picture.slug}`)"
      class="pictures-works__picture gallery__picture"
    >
      <div class="pictures-works__img gallery__img">
        <CmsImage
          v-if="picture.image && picture.image.src"
          :image="picture.image"
          sizes="(max-width: 767px) 100vw, (max-width: 1100px) 45vw, 400px"
          width="400"
          height="400"
          :loading="priority || eager ? 'eager' : 'lazy'"
          :priority="priority"
        />
      </div>
      <h3 class="pictures-works__name gallery__name">{{ picture.title }}</h3>
      <p class="pictures-works__price gallery__price">${{ picture.price }}</p>
    </NuxtLink>
  </li>
</template>

<script setup>
import CmsImage from "@/components/CmsImage.vue";

defineProps({
  picture: {
    type: Object,
    required: true,
  },
  // first cards of a page that can be in the first viewport
  eager: {
    type: Boolean,
    default: false,
  },
  // likely LCP image: high fetch priority
  priority: {
    type: Boolean,
    default: false,
  },
});

const localePath = useLocalePath();
</script>
