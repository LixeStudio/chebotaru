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
      <CmsImage
        v-if="image"
        :image="image"
        sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw"
        class="gallery-body__img"
      />
    </li>
  </ul>
</template>

<script setup>
import CmsImage from "@/components/CmsImage.vue";

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
