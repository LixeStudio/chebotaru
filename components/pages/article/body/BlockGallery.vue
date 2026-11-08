<template>
  <!-- the layout has rules for 1-4 images: longer galleries (up to 12) are shown as several rows of up to 4 -->
  <ul
    v-for="(group, groupIndex) in groups"
    :key="groupIndex"
    class="body__gallery gallery-body"
    :class="`gallery--${group.length}-images`"
  >
    <li
      v-for="(image, indx) in group"
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
import { splitGallery } from "@/composables/splitGallery";

const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const groups = computed(() => splitGallery(props.block.images || []));
</script>
