<template>
  <div class="error-page">
    <Header />
    <main class="main">
      <ErrorSection :status-code="statusCode" @home="goHome" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import ErrorSection from "@/components/pages/error/errorSection.vue";

const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));

const props = defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
});

const { t } = useI18n();
const localePath = useLocalePath();

const statusCode = computed(() => Number(props.error?.statusCode) || 500);
const is404 = computed(() => statusCode.value === 404);

const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;

const config = useRuntimeConfig();
const baseUrl = config.public.SITE_URL || "https://andriichebotaru.com";
const defaultImage = `${baseUrl}/og/default.jpg`;

useHead({
  title: is404.value ? t("seo.error.title") : t("seo.error.genericTitle"),
  meta: [
    {
      name: "description",
      content: is404.value
        ? t("seo.error.description")
        : t("seo.error.genericDescription"),
    },
    { name: "robots", content: "noindex, follow" },
    {
      name: "twitter:title",
      content: is404.value ? t("seo.error.title") : t("seo.error.genericTitle"),
    },
    {
      name: "twitter:description",
      content: is404.value
        ? t("seo.error.description")
        : t("seo.error.genericDescription"),
    },
    { name: "twitter:image", content: defaultImage },
  ],
});

const goHome = async () => {
  await clearError({ redirect: localePath("/") });
};
</script>

<style lang="scss"></style>
