<template>
  <div class="contacts-page">
    <Header />
    <main class="main">
      <HeroSection />
      <ContactUs :showTitle="false" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import HeroSection from "@/components/pages/contacts/HeroSection.vue";
import ContactUs from "@/layouts/Contact-us.vue";
import Footer from "@/layouts/Footer.vue";

const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;
</script>

<style lang="scss">
@use "@/assets/scss/pages/contact-us.scss";
</style>
