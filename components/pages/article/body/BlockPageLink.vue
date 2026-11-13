<template>
  <div v-if="to" class="body__link-block link-block">
    <NuxtLink :to="to" class="link-block__link link-block__link--page">
      <span class="link-block__overline">{{
        t("pages.article.body.website")
      }}</span>
      <span class="link-block__page-name">{{ name }}</span>
      <span class="link-block__action link-block__action--end">
        {{ t("pages.article.body.visit") }}
        <span class="link-block__arrow" aria-hidden="true" />
      </span>
    </NuxtLink>
  </div>
</template>

<script setup>
import { PAGE_LINKS, pageLinkPath } from "@/composables/api/articleBlocks";

// A page of the site inside the text (block "page_link"): the author's label, or else the name of the page
const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();
const localePath = useLocalePath();

const path = computed(() => pageLinkPath(props.block.pageKey, props.block.filters));
const to = computed(() => (path.value ? localePath(path.value) : null));
const name = computed(
  () => props.block.label || t(PAGE_LINKS[props.block.pageKey].nameKey)
);
</script>
