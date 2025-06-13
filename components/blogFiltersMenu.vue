<template>
  <div class="blog__filters blog-filters">
    <div class="blog-filters__content">
      <inputCheckbox
        id="aboutPictures"
        v-model="prop.filters.typeOfArticle"
        class="blog-filters__label"
        :label-text="t('pages.blog.blogSection.filters.aboutPictures')"
        value="aboutPictures"
      />
      <inputCheckbox
        id="interview"
        v-model="prop.filters.typeOfArticle"
        class="blog-filters__label"
        :label-text="t('pages.blog.blogSection.filters.interview')"
        value="interview"
      />
      <inputCheckbox
        id="exhibitions"
        v-model="prop.filters.typeOfArticle"
        class="blog-filters__label"
        :label-text="t('pages.blog.blogSection.filters.exhibitions')"
        value="exhibitions"
      />
      <inputCheckbox
        id="inspiration"
        v-model="prop.filters.typeOfArticle"
        class="blog-filters__label"
        :label-text="t('pages.blog.blogSection.filters.inspiration')"
        value="inspiration"
      />
    </div>
    <span class="blog-filters__separator separator"></span>
  </div>
</template>

<script setup>
import inputCheckbox from "@/components/inputCheckbox.vue";

const prop = defineProps({
  filters: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();
</script>
