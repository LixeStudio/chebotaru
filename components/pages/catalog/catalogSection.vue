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
        <ul class="pictures-catalog__list gallery__list">
          <GalleryItem v-for="a in 6" :key="a" />
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import GalleryItem from "@/components/GalleryItem.vue";
import FiltersMenu from "@/components/filtersMenu.vue";
defineProps({
  filters: Object,
});
const ifFilterMenuOpened = ref(false);

const toggleFitlerMenu = () => {
  ifFilterMenuOpened.value = !ifFilterMenuOpened.value;
};

const { t } = useI18n();
</script>
