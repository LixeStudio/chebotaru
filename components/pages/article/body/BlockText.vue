<template>
  <div v-if="hasDoc" class="body__text-block">
    <RichText :doc="block.doc" />
  </div>
  <div v-else-if="paragraphs.length" class="body__text-block">
    <p v-for="(paragraph, index) in paragraphs" :key="index" class="body__text">
      {{ paragraph }}
    </p>
  </div>
</template>

<script setup>
import RichText from "@/components/pages/article/body/RichText.vue";

const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

// formatted text (TipTap document); the plain lines of `text` are the fallback
const hasDoc = computed(() => !!props.block.doc?.content?.length);

const paragraphs = computed(() => {
  return (props.block.text || "").split("\n").filter((p) => p.trim().length);
});
</script>
