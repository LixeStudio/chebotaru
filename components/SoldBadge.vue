<template>
  <!--
    "card": a yellow brush-stroke ribbon across the top-left corner of the painting, cut by the painting's edges;
    "inline": the same stroke as a small plaque in the text flow (picture page, next to the price)
  -->
  <span v-if="placement === 'card'" class="sold-frame" :style="frameStyle">
    <span class="sold-badge sold-badge--ribbon">
      <svg
        class="sold-badge__stroke"
        viewBox="0 0 120 40"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path class="sold-badge__paint" :d="PAINT" />
        <path class="sold-badge__streak" :d="STREAKS" />
      </svg>
      <span class="sold-badge__text">{{ t("sold") }}</span>
    </span>
  </span>
  <span v-else class="sold-badge sold-badge--inline">
    <svg
      class="sold-badge__stroke"
      viewBox="0 0 120 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path class="sold-badge__paint" :d="PAINT" />
      <path class="sold-badge__streak" :d="STREAKS" />
    </svg>
    <span class="sold-badge__text">{{ t("sold") }}</span>
  </span>
</template>

<script setup>
const props = defineProps({
  placement: {
    type: String,
    default: "card",
  },
  // width / height of the picture: a card shows it centred in a square (object-fit: contain), so the ribbon's frame
  // is the painting itself, without the empty bands around it
  imageRatio: {
    type: Number,
    default: 1,
  },
});
const { t } = useI18n();

// one dry brush stroke with uneven ends, and lighter bristle lines on it
const PAINT =
  "M5 12C21 6 62 4 115 8l3 4c-8 2-5 5 0 7-6 3-2 6 1 10-36 5-77 6-115 4 4-3-2-6 2-10-5-3-2-6 1-8-3-1-3-2-2-3Z";
const STREAKS = "M10 11c30-3 62-4 100-2M8 29c35 3 72 2 106-1M12 20c28-2 60-2 96 0";

// top/bottom % are shares of the container height, left/right % of its width: both are the side of the square
const frameStyle = computed(() => {
  const ratio = props.imageRatio;
  if (!ratio || !Number.isFinite(ratio) || ratio === 1) return undefined;
  if (ratio > 1) {
    const band = `${((1 - 1 / ratio) / 2) * 100}%`;
    return { top: band, bottom: band };
  }
  const band = `${((1 - ratio) / 2) * 100}%`;
  return { left: band, right: band };
});
</script>
