<template>
  <li class="pictures-works__item gallery__item">
    <NuxtLink
      :to="localePath(`/picture-details/${picture.documentId}-${picture.slug}`)"
      class="pictures-works__picture gallery__picture"
    >
      <div class="pictures-works__img gallery__img">
        <NuxtImg
          v-if="picture.image && picture.image.src"
          :src="picture.image.src"
          :alt="picture.image.alt"
          width="400"
          height="400"
        />
      </div>
      <h3 class="pictures-works__name gallery__name">{{ picture.title }}</h3>
      <p class="pictures-works__price gallery__price">${{ picture.price }}</p>
    </NuxtLink>
  </li>
</template>

<script setup>
defineProps({
  picture: {
    type: Object,
    required: true,
  },
});

const localePath = useLocalePath();
</script>
