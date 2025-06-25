<template>
  <div v-if="paragraphs.length" class="body__text-block">
    <p v-for="(paragraph, index) in paragraphs" :key="index" class="body__text">
      {{ paragraph }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const paragraphs = computed(() => {
  return props.block.text.split("\n").filter((p) => p.trim().length);
});
</script>
