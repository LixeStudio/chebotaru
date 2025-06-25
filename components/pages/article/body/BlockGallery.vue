<template>
  <ul
    v-if="block.images.length"
    class="body__gallery gallery-body"
    :class="pictureCountClass"
  >
    <li
      v-for="(image, indx) in block.images"
      :key="indx"
      class="gallery-body__item"
    >
      <NuxtImg
        v-if="image"
        :src="image.src"
        :alt="image.alt"
        class="gallery-body__img"
      />
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const pictureCountClass = computed(() => {
  const count = props.block.images?.length || 0;
  return `gallery--${count}-images`;
});
</script>
