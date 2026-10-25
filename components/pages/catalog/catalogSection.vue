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
        <ul
          v-if="state === 'list'"
          :key="listKey"
          class="pictures-catalog__list gallery__list"
          :class="{ 'list-entrance': entering }"
        >
          <GalleryItem
            v-for="(pic, index) in pictures"
            :key="pic.documentId"
            v-reveal
            :picture="pic"
            :eager="index < 3"
            :priority="index === 0"
          />
        </ul>
        <p v-else-if="state === 'unavailable'" class="catalog__text-second">
          {{ t("pages.catalog.catalogSection.unavailable") }}
        </p>
        <p v-else-if="state === 'noFilteredResults'" class="catalog__text-second">
          {{ t("pages.catalog.catalogSection.noFilteredResults") }}
        </p>
        <p v-else class="catalog__text-second">
          {{ t("pages.catalog.catalogSection.noPictures") }}
        </p>
        <div v-if="state === 'list' && total > pictures.length" class="catalog__more">
          <p class="catalog__shown">
            {{ t("pages.catalog.catalogSection.shown", { shown: pictures.length, total }) }}
          </p>
          <NuxtLink
            v-if="nextPage"
            :to="nextPage"
            class="catalog__more-btn btn-circle"
            replace
          >
            {{ t("pages.catalog.catalogSection.showMore") }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import GalleryItem from "@/components/GalleryItem.vue";
import FiltersMenu from "@/components/filtersMenu.vue";
import { listState } from "@/composables/listState";
import { useListEntrance, vReveal } from "@/composables/reveal";
const props = defineProps({
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
  // the CMS request failed (not the same as an empty catalog)
  unavailable: {
    type: Boolean,
    default: false,
  },
  // all works that match the filters (the list shows the first pages of them)
  total: {
    type: Number,
    default: 0,
  },
  // the address of the next page ("show more"), or null when everything is shown
  nextPage: {
    type: Object,
    default: null,
  },
  // changes with the filters and the sorting only: then the list animates in again (more cards just appear)
  listId: {
    type: String,
    default: "",
  },
});
const state = computed(() =>
  listState({
    count: props.pictures.length,
    failed: props.unavailable,
    hasFilters: props.hasAnyFilters,
  })
);
const { listKey, entering } = useListEntrance(() => props.listId);
const ifFilterMenuOpened = ref(false);

const toggleFitlerMenu = () => {
  ifFilterMenuOpened.value = !ifFilterMenuOpened.value;
};

const { t } = useI18n();
</script>
