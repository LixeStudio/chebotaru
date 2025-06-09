<template>
  <div>
    <Header />
    <main class="main">
      <PreviewSection />
      <WorksSection />
      <BlogSection />
      <FamilySection />
      <ContactUs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import PreviewSection from "@/components/pages/home/Preview-section.vue";
import WorksSection from "@/components/pages/home/Works-Section.vue";
import BlogSection from "@/components/pages/home/Blog-section.vue";
import FamilySection from "@/components/pages/home/Family-section.vue";
import ContactUs from "@/layouts/Contact-us.vue";
import Footer from "@/layouts/Footer.vue";
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = true;
</script>

<style lang="scss">
@use "@/assets/scss/pages/home.scss";
</style>
