<template>
  <div class="filters-catalog__menu">
    <div class="filters-catalog__top">
      <div class="filters-catalog__top-column">
        <inputCheckbox
          id="saleStatusAvailable"
          v-model="filters.availability"
          :label-text="
            t('pages.catalog.catalogSection.filters.availability.available')
          "
          value="availablePictures"
        />
        <inputCheckbox
          id="saleStatusSold"
          v-model="filters.availability"
          :label-text="
            t('pages.catalog.catalogSection.filters.availability.sold')
          "
          value="soldPictures"
        />
      </div>
      <div class="filters-catalog__top-column">
        <inputCheckbox
          id="pictureOrientationVertical"
          v-model="filters.pictureOrientation"
          :label-text="
            t(
              'pages.catalog.catalogSection.filters.pictureOrientation.vertical'
            )
          "
          value="verticalPictures"
        />
        <inputCheckbox
          id="pictureOrientationHorizontal"
          v-model="filters.pictureOrientation"
          :label-text="
            t(
              'pages.catalog.catalogSection.filters.pictureOrientation.horizontal'
            )
          "
          value="horizontalPictures"
        />
        <inputCheckbox
          id="pictureOrientationSquare"
          v-model="filters.pictureOrientation"
          :label-text="
            t('pages.catalog.catalogSection.filters.pictureOrientation.square')
          "
          value="squarePictures"
        />
      </div>
    </div>
    <span class="filters-catalog__separator separator"></span>
    <div class="filters-catalog__bottom">
      <div class="filters-catalog__bottom-column">
        <div class="dropdown-filter">
          <button
            class="dropdown-filter__toggle"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="filter-price-list"
          >
            Цена
            <span class="dropdown-filter__icon"></span>
          </button>

          <div class="dropdown-filter__dropdown" id="filter-price-list" hidden>
            <label for="11" class="dropdown-filter__option checkbox">
              <input
                type="checkbox"
                class="dropdown-filter__checkbox"
                id="11"
              />
              <span class="checkbox__custom"></span>

              до $500
            </label>
            <label for="12" class="dropdown-filter__option checkbox">
              <input
                type="checkbox"
                class="dropdown-filter__checkbox"
                id="12"
              />
              <span class="checkbox__custom"></span>

              $300–700
            </label>
            <label for="13" class="dropdown-filter__option checkbox">
              <input
                type="checkbox"
                class="dropdown-filter__checkbox"
                id="13"
              />
              <span class="checkbox__custom"></span>

              $700+
            </label>
          </div>
        </div>
        <div class="dropdown-filter">
          <button
            class="dropdown-filter__toggle"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="filter-price-list"
          >
            Размер
            <span class="dropdown-filter__icon"></span>
          </button>

          <div class="dropdown-filter__dropdown" id="filter-price-list" hidden>
            <label for="14" class="dropdown-filter__option checkbox">
              <input
                type="checkbox"
                class="dropdown-filter__checkbox"
                id="14"
              />
              <span class="checkbox__custom"></span>

              Маленькие (до 30 см)
            </label>
            <label for="15" class="dropdown-filter__option checkbox">
              <input
                type="checkbox"
                class="dropdown-filter__checkbox"
                id="15"
              />
              <span class="checkbox__custom"></span>

              Средние (30–70 см)
            </label>
            <label for="16" class="dropdown-filter__option checkbox">
              <input
                type="checkbox"
                class="dropdown-filter__checkbox"
                id="16"
              />
              <span class="checkbox__custom"></span>

              Большие (от 70 см)
            </label>
          </div>
        </div>
      </div>
      <div class="filters-catalog__bottom-column">
        <div class="dropdown-filter">
          <button
            class="dropdown-filter__toggle"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="filter-price-list"
          >
            Сортировать по
            <span class="dropdown-filter__icon"></span>
          </button>

          <div class="dropdown-filter__dropdown" id="filter-price-list" hidden>
            <label for="17" class="dropdown-filter__option checkbox">
              <input
                type="checkbox"
                class="dropdown-filter__checkbox"
                id="17"
              />
              <span class="checkbox__custom"></span>

              Сначала новые
            </label>
            <label for="18" class="dropdown-filter__option checkbox">
              <input
                type="checkbox"
                class="dropdown-filter__checkbox"
                id="18"
              />
              <span class="checkbox__custom"></span>

              Сначала дешёвые
            </label>
            <label for="19" class="dropdown-filter__option checkbox">
              <input
                type="checkbox"
                class="dropdown-filter__checkbox"
                id="19"
              />
              <span class="checkbox__custom"></span>

              Сначала дорогие
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import inputCheckbox from "@/components/inputCheckbox.vue";
const { t } = useI18n();
const props = defineProps({
  filters: Object,
});
</script>
