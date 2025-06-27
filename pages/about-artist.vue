<template>
  <div class="about-artist-page">
    <Header />
    <main class="main">
      <PreviewSection />
      <AboutAuthorSection />
      <HeroSection />
      <InspirationMapSection />
      <HeroReverseSection />
      <FamilyQuote :quote="quoteText" :author="quoteAuthor" />
      <CareerTimelineSection />
      <ContactUs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import PreviewSection from "@/components/pages/aboutArtist/Preview-section.vue";
import AboutAuthorSection from "@/components/pages/aboutArtist/AboutAuthor-section.vue";
import InspirationMapSection from "@/components/pages/aboutArtist/InspirationMap-section.vue";
import HeroReverseSection from "@/components/pages/aboutArtist/HeroReverse-section.vue";
import FamilyQuote from "@/layouts/FamilyQuote.vue";
import CareerTimelineSection from "@/components/pages/aboutArtist/CareerTimeline-section.vue";
import HeroSection from "@/components/pages/aboutArtist/Hero-section.vue";
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
  title: t("seo.aboutArtist.title"),
  meta: [
    { name: "description", content: t("seo.aboutArtist.description") },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: t("seo.aboutArtist.title") },
    {
      property: "og:description",
      content: t("seo.aboutArtist.description"),
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
isWhiteTheme.value = true;
console.log(isWhiteTheme.value);

const quoteText = t("pages.aboutArtist.quoteSection.text");
const quoteAuthor = t("pages.aboutArtist.quoteSection.author");
</script>

<style lang="scss"></style>
