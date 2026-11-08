<template>
  <section v-if="body.length" class="body">
    <div class="body__container">
      <component
        :is="componentOf(block)"
        v-for="block in body"
        :key="block.key"
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

const headings = { 2: BlockH2, 3: BlockH3, 4: BlockH4 };
const componentOf = (block) => {
  if (block.type === "heading") return headings[block.level];
  if (block.type === "text") return BlockText;
  return BlockGallery;
};
</script>
