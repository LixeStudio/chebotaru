<template>
  <div>
    <Header />
    <main class="main">
      <PreviewSection />
      <WorksSection />
    </main>
  </div>
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import PreviewSection from "@/components/pages/home/Preview-Section.vue";
import WorksSection from "@/components/pages/home/Works-Section.vue";
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = true;
</script>

<style lang="scss">
@use "@/assets/scss/pages/home.scss";
</style>
