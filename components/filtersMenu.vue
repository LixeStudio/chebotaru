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
          value="available"
        />
        <inputCheckbox
          id="saleStatusSold"
          v-model="filters.availability"
          :label-text="
            t('pages.catalog.catalogSection.filters.availability.sold')
          "
          value="sold"
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
          value="vertical"
        />
        <inputCheckbox
          id="pictureOrientationHorizontal"
          v-model="filters.pictureOrientation"
          :label-text="
            t(
              'pages.catalog.catalogSection.filters.pictureOrientation.horizontal'
            )
          "
          value="horizontal"
        />
        <inputCheckbox
          id="pictureOrientationSquare"
          v-model="filters.pictureOrientation"
          :label-text="
            t('pages.catalog.catalogSection.filters.pictureOrientation.square')
          "
          value="square"
        />
      </div>
    </div>
    <span class="filters-catalog__separator separator"></span>
    <div class="filters-catalog__bottom">
      <div class="filters-catalog__bottom-column">
        <filterDropdown
          :drop-downtitle="
            t('pages.catalog.catalogSection.filters.dropdowns.price.title')
          "
          :dropdown-id="'price'"
          :is-opened="isPriceDropdownOpened"
          @toggle="toggleDropdown('priceDropdown')"
        >
          <inputCheckbox
            id="priceLess300"
            v-model="filters.price"
            :label-text="
              t(
                'pages.catalog.catalogSection.filters.dropdowns.price.values.less300'
              )
            "
            value="less-300"
          />
          <inputCheckbox
            id="price300-700"
            v-model="filters.price"
            label-text="$300-700"
            value="300-700"
          />
          <inputCheckbox
            id="priceMore700"
            v-model="filters.price"
            label-text="$700+"
            value="more-700"
          />
        </filterDropdown>
        <filterDropdown
          :drop-downtitle="
            t(
              'pages.catalog.catalogSection.filters.dropdowns.pictureSize.title'
            )
          "
          :dropdown-id="'pictureSize'"
          :is-opened="isPictureSizeDropdownOpened"
          @toggle="toggleDropdown('pictureSize')"
        >
          <inputCheckbox
            id="smallPictures"
            v-model="filters.pictureSize"
            :label-text="
              t(
                'pages.catalog.catalogSection.filters.dropdowns.pictureSize.values.small'
              )
            "
            value="small"
          />
          <inputCheckbox
            id="middlePictures"
            v-model="filters.pictureSize"
            :label-text="
              t(
                'pages.catalog.catalogSection.filters.dropdowns.pictureSize.values.middle'
              )
            "
            value="middle"
          />
          <inputCheckbox
            id="bigPictures"
            v-model="filters.pictureSize"
            :label-text="
              t(
                'pages.catalog.catalogSection.filters.dropdowns.pictureSize.values.big'
              )
            "
            value="big"
          />
        </filterDropdown>
      </div>
      <div class="filters-catalog__bottom-column">
        <filterDropdown
          :drop-downtitle="
            t('pages.catalog.catalogSection.filters.dropdowns.sortBy.title')
          "
          class="position-right"
          :dropdown-id="'sortBy'"
          :is-opened="isSortByDropdownOpened"
          @toggle="toggleDropdown('sortByDropdown')"
        >
          <p
            class="filters-catalog__dropdown-text"
            @click="selectSortBy('newPictures')"
          >
            {{
              t(
                "pages.catalog.catalogSection.filters.dropdowns.sortBy.values.newPictures"
              )
            }}
          </p>
          <p
            class="filters-catalog__dropdown-text"
            @click="selectSortBy('cheapPictures')"
          >
            {{
              t(
                "pages.catalog.catalogSection.filters.dropdowns.sortBy.values.cheapPictures"
              )
            }}
          </p>
          <p
            class="filters-catalog__dropdown-text"
            @click="selectSortBy('expensivePictures')"
          >
            {{
              t(
                "pages.catalog.catalogSection.filters.dropdowns.sortBy.values.expensivePictures"
              )
            }}
          </p>
        </filterDropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import filterDropdown from "@/components/filterDropdown.vue";
import inputCheckbox from "@/components/inputCheckbox.vue";
const { t } = useI18n();
const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
});

const closeAllDropdowns = (exceptType) => {
  if (isPriceDropdownOpened.value && exceptType !== "priceDropdown") {
    isPriceDropdownOpened.value = false;
  } else if (
    isPictureSizeDropdownOpened.value &&
    exceptType !== "pictureSize"
  ) {
    isPictureSizeDropdownOpened.value = false;
  } else if (isSortByDropdownOpened.value && exceptType !== "sortByDropdown") {
    isSortByDropdownOpened.value = false;
  }
};

const toggleDropdown = (type) => {
  closeAllDropdowns(type);
  if (type === "priceDropdown") {
    isPriceDropdownOpened.value = !isPriceDropdownOpened.value;
  }
  if (type === "pictureSize") {
    isPictureSizeDropdownOpened.value = !isPictureSizeDropdownOpened.value;
  }
  if (type === "sortByDropdown") {
    isSortByDropdownOpened.value = !isSortByDropdownOpened.value;
  }
};

const isPriceDropdownOpened = ref(false);
const isPictureSizeDropdownOpened = ref(false);
const isSortByDropdownOpened = ref(false);

const selectSortBy = (sortBy) => {
  closeAllDropdowns();
  props.filters.sortBy = sortBy;
};
</script>
