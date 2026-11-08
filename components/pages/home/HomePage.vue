<template>
  <div class="home-page">
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
import PreviewSection from "@/components/pages/home/Preview-Section.vue";
import WorksSection from "@/components/pages/home/Works-Section.vue";
import BlogSection from "@/components/pages/home/Blog-section.vue";
import FamilySection from "@/components/pages/home/Family-section.vue";
const ContactUs = defineAsyncComponent(() =>
  import("@/layouts/Contact-us.vue")
);
const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));

const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = true;
</script>
<style lang="scss"></style>
