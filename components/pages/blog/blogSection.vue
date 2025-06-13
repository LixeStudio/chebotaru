<template>
  <section class="blog">
    <div class="blog__container">
      <BlogFiltersMenu :filters="filters" />
      <div class="blog__articles articles-blog">
        <BlogArticle v-for="a in 8" :key="a" />
      </div>
    </div>
  </section>
</template>

<script setup>
import BlogFiltersMenu from "@/components/blogFiltersMenu.vue";
import BlogArticle from "@/components/BlogArticle.vue";
defineProps({
  filters: Object,
});
</script>
