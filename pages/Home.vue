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

const route = useRoute();
const { t } = useI18n();
const config = useRuntimeConfig();
const baseUrl = config.public.SITE_URL || "https://andriichebotaru.com";
const currentUrl = `${baseUrl}${route.fullPath}`;

useHead({
  title: t("seo.home.title"),
  meta: [
    { name: "description", content: t("seo.home.description") },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: t("seo.home.title") },
    { property: "og:description", content: t("seo.home.description") },
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
</script>
<style lang="scss"></style>
