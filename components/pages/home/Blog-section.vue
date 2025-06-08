<template>
  <section class="blog">
    <div class="blog__container">
      <div class="blog__content">
        <p class="blog__bg-text">
          {{ t("pages.home.blogSection.blogBgText") }}
        </p>
        <h2 class="blog__title">{{ t("pages.home.blogSection.blogTitle") }}</h2>
        <NuxtLink to="/blog" class="blog__link btn-circle">
          {{ t("pages.home.blogSection.blogLink") }}
        </NuxtLink>
      </div>
      <div class="blog__articles articles-blog">
        <BlogArticle />
        <BlogArticle />
      </div>
    </div>
  </section>
</template>

<script setup>
import BlogArticle from "@/components/BlogArticle.vue";
const { t } = useI18n();
</script>
