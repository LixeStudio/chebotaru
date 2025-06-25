<template>
  <h2 class="body__h2">{{ block.text }}</h2>
</template>

<script setup>
defineProps({
  block: {
    type: Object,
    required: true,
  },
});
</script>
