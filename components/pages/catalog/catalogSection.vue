<template>
  <section class="catalog">
    <div class="catalog__container">
      <div class="catalog__filters filters-catalog">
        <button
          @click="toggleFitlerMenu"
          class="filters-catalog__filter-btn filter-btn"
        >
          {{ t("pages.catalog.catalogSection.filterBtn") }}
        </button>
        <FiltersMenu
          :class="{ opened: ifFilterMenuOpened }"
          :filters="filters"
        />
      </div>
      <div class="catalog__pictures pictures-catalog gallery">
        <ul v-if="pictures.length" class="pictures-catalog__list gallery__list">
          <GalleryItem
            v-for="pic in pictures"
            :key="pic.documentId"
            :picture="pic"
          />
        </ul>
        <p v-else-if="hasAnyFilters" class="catalog__text-second">
          {{ t("pages.catalog.catalogSection.noFilteredResults") }}
        </p>
        <p v-else class="catalog__text-second">
          {{ t("pages.catalog.catalogSection.noPictures") }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import GalleryItem from "@/components/GalleryItem.vue";
import FiltersMenu from "@/components/filtersMenu.vue";
defineProps({
  filters: {
    type: Object,
    required: true,
  },
  pictures: {
    type: Array,
    required: true,
  },
  hasAnyFilters: {
    type: Boolean,
    required: true,
  },
});
const ifFilterMenuOpened = ref(false);

const toggleFitlerMenu = () => {
  ifFilterMenuOpened.value = !ifFilterMenuOpened.value;
};

const { t } = useI18n();
</script>
