<template>
  <div class="about-oleksii-and-wife-page">
    <Header />
    <main class="main">
      <PreviewSection />
      <HeroBrotherSection />
      <InfoCardsSection />
      <GalleryBrotherSection />
      <HeroBrothersWifeSection />
      <InfoCardsBrothersWifeSection />
      <GalleryBrothersWifeSection />
      <ContactUs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import PreviewSection from "@/components/pages/aboutOleksiiAndWife/previewSection.vue";
import HeroBrotherSection from "@/components/pages/aboutOleksiiAndWife/HeroBrotherSection.vue";
import InfoCardsSection from "@/components/pages/aboutOleksiiAndWife/infoCardsSection.vue";
import GalleryBrotherSection from "@/components/pages/aboutOleksiiAndWife/galleryBrotherSection.vue";
import HeroBrothersWifeSection from "@/components/pages/aboutOleksiiAndWife/heroBrothersWifeSection.vue";
import InfoCardsBrothersWifeSection from "@/components/pages/aboutOleksiiAndWife/infoCardsBrothersWifeSection.vue";
import GalleryBrothersWifeSection from "@/components/pages/aboutOleksiiAndWife/galleryBrothersWifeSection.vue";
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
  title: t("seo.aboutOleksiiAndWife.title"),
  meta: [
    { name: "description", content: t("seo.aboutOleksiiAndWife.description") },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: t("seo.aboutOleksiiAndWife.title") },
    {
      property: "og:description",
      content: t("seo.aboutOleksiiAndWife.description"),
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
</script>
<style lang="scss"></style>
