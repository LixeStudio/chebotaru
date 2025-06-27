<template>
  <div class="about-mother-page">
    <Header />
    <main class="main">
      <HeroSection />
      <CareerTimelineSection />
      <RecognitionSection />
      <FamilyQuote :quote="quoteText" :author="quoteAuthor" />
      <ContactUs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import HeroSection from "@/components/pages/aboutMother/Hero-section.vue";
import CareerTimelineSection from "@/components/pages/aboutMother/CareerTimeline-section.vue";
import RecognitionSection from "@/components/pages/aboutMother/Recognition-section.vue";
import FamilyQuote from "@/layouts/FamilyQuote.vue";
const ContactUs = defineAsyncComponent(() =>
  import("@/layouts/Contact-us.vue")
);
const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));
const route = useRoute();
const { t } = useI18n();
const config = useRuntimeConfig();
const baseUrl = config.public.SITE_URL || "https://andriichebotaru.com";
const currentUrl = `${baseUrl}${route.fullPath}`;
useHead({
  title: t("seo.aboutMother.title"),
  meta: [
    { name: "description", content: t("seo.aboutMother.description") },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: t("seo.aboutMother.title") },
    {
      property: "og:description",
      content: t("seo.aboutMother.description"),
    },
    { property: "og:url", content: currentUrl },
    { property: "og:image", content: `${baseUrl}/og/default.jpg` },
  ],
  link: [
    { rel: "canonical", href: currentUrl },
    { rel: "alternate", hreflang: "uk", href: `${baseUrl}/uk` },
    { rel: "alternate", hreflang: "ru", href: `${baseUrl}/` },
    { rel: "alternate", hreflang: "en", href: `${baseUrl}/en` },
  ],
});

const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;
const quoteText = t("pages.aboutMother.quoteSection.text");
const quoteAuthor = t("pages.aboutMother.quoteSection.author");
</script>

<style lang="scss"></style>
