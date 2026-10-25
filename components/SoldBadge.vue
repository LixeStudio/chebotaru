<template>
  <!--
    "card": the painting dimmed, with the designer's yellow brush stroke and "Sold out" in its centre;
    "title": the same stroke in the lighter yellow-300, under the title on the picture page
  -->
  <span v-if="placement === 'card'" class="sold-frame" :style="frameStyle">
    <span class="sold-badge">
      <span class="sold-badge__text">{{ t("sold") }}</span>
    </span>
  </span>
  <span v-else class="sold-badge sold-badge--title">
    <span class="sold-badge__text">{{ t("sold") }}</span>
  </span>
</template>

<script setup>
const props = defineProps({
  placement: {
    type: String,
    default: "card",
  },
  // width / height of the picture: a card shows it centred in a square (object-fit: contain), so the dimming and the
  // stroke cover the painting itself, without the empty bands around it
  imageRatio: {
    type: Number,
    default: 1,
  },
});
const { t } = useI18n();

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
