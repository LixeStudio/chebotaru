<template>
  <div class="blog-page">
    <Header />
    <main class="main">
      <HeroSection />
      <BlogSection :filters="filters" />
      <ContactUs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { useFilters } from "@/composables/useFilters";
import Header from "@/layouts/Header.vue";
import HeroSection from "@/components/pages/blog/heroSection.vue";
import BlogSection from "@/components/pages/blog/blogSection.vue";
import ContactUs from "@/layouts/Contact-us.vue";
import Footer from "@/layouts/Footer.vue";
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;

const { filters } = useFilters({
  typeOfArticle: [],
});
</script>

<style lang="scss">
@use "@/assets/scss/pages/blog.scss";
</style>
