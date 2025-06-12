<template>
  <div class="dropdown-filter" :class="{ opened: isOpened }">
    <button
      class="dropdown-filter__toggle"
      aria-haspopup="true"
      aria-expanded="false"
      aria-controls="filter-price-list"
      @click="toggleMenu"
    >
      {{ props.dropDowntitle }}
      <span class="dropdown-filter__icon"></span>
    </button>

    <div :id="dropdownId" class="dropdown-filter__dropdown" hidden>
      <slot />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["toggle"]);
const props = defineProps({
  dropDowntitle: {
    type: String,
    required: true,
  },
  dropdownId: {
    type: String,
    required: true,
  },
  isOpened: {
    type: Boolean,
    required: true,
  },
});

const toggleMenu = () => {
  emit("toggle");
};
</script>
