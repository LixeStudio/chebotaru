<template>
  <h4 class="body__h4">{{ block.text }}</h4>
</template>

<script setup>
defineProps({
  block: {
    type: Object,
    required: true,
  },
});
</script>
