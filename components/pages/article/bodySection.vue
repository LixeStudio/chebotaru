<template>
  <section v-if="body.length" class="body">
    <div class="body__container">
      <component
        :is="components[block.__component]"
        v-for="(block, index) in body"
        :key="`${block.__component}-${block.id ?? index}`"
        :block="block"
      />
    </div>
  </section>
</template>

<script setup>
import BlockH2 from "@/components/pages/article/body/BlockH2.vue";
import BlockH3 from "@/components/pages/article/body/BlockH3.vue";
import BlockH4 from "@/components/pages/article/body/BlockH4.vue";
import BlockText from "@/components/pages/article/body/BlockText.vue";
import BlockGallery from "@/components/pages/article/body/BlockGallery.vue";
defineProps({
  body: {
    type: Array,
    default: () => [],
  },
});

const components = {
  "blog.heading-h2": BlockH2,
  "blog.heading-h3": BlockH3,
  "blog.heading-h4": BlockH4,
  "blog.text-block": BlockText,
  "blog.picture-gallery-block": BlockGallery,
};
</script>
