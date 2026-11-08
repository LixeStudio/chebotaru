<template>
  <h3 class="body__h3">{{ block.text }}</h3>
</template>

<script setup>
defineProps({
  block: {
    type: Object,
    required: true,
  },
});
</script>
