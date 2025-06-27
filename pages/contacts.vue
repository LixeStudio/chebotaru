<template>
  <div class="contacts-page">
    <Header />
    <main class="main">
      <HeroSection />
      <ContactUs :show-title="false" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import HeroSection from "@/components/pages/contacts/HeroSection.vue";
const ContactUs = defineAsyncComponent(() =>
  import("@/layouts/Contact-us.vue")
);
const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));
const route = useRoute();
const { t } = useI18n();
const config = useRuntimeConfig();
const baseUrl = config.public.SITE_URL || "https://andriichebotaru.com";
const currentUrl = `${baseUrl}${route.fullPath}`;
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;

useHead({
  title: t("seo.contacts.title"),
  meta: [
    { name: "description", content: t("seo.contacts.description") },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: t("seo.contacts.title") },
    { property: "og:description", content: t("seo.contacts.description") },
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
</script>

<style lang="scss"></style>
