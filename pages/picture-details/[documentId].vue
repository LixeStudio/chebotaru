<template>
  <div v-if="picture" class="picture-details-page">
    <Header />
    <main class="main">
      <ArtworkSection :picture="picture" @toggle-popup="togglePopup" />
      <RelatedWorksSection :related-pictures="relatedPictures" />
      <ContactUs />
    </main>
    <Footer />
    <PopupComponent
      :is-pop-up-opened="isPopUpOpened"
      @toggle-popup="togglePopup"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "@/layouts/Header.vue";
import ArtworkSection from "@/components/pages/pictureDetails/artworkSection.vue";
import RelatedWorksSection from "@/components/pages/pictureDetails/relatedWorksSection.vue";
import PopupComponent from "@/components/popupComponent.vue";
import { useBodyScrollLock } from "@/composables/useBodyScrollLock";
import { useRoute, useRouter } from "vue-router";
import {
  fetchPictureByDocumentId,
  fetchRelatedPictures,
} from "@/composables/api/paintings";
const ContactUs = defineAsyncComponent(() =>
  import("@/layouts/Contact-us.vue")
);
const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));
const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const config = useRuntimeConfig();
const baseUrl = config.public.SITE_URL || "https://andriichebotaru.com";
const currentUrl = `${baseUrl}${route.fullPath}`;

const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;

const isPopUpOpened = ref(false);

const togglePopup = (actionType = "open") => {
  if (actionType === "open") isPopUpOpened.value = true;
  if (actionType === "close") isPopUpOpened.value = false;
};
useBodyScrollLock(isPopUpOpened);

const { locale } = useI18n();
const [documentId] = route.params["documentId"].split("-");

const picture = ref(null);
const relatedPictures = ref([]);

onMounted(async () => {
  const res = await fetchPictureByDocumentId(documentId, locale.value);
  if (!res) {
    router.replace(
      locale.value === "ru" ? "/catalog" : `/${locale.value}/catalog`
    );
  } else {
    picture.value = res;
    relatedPictures.value = await fetchRelatedPictures(res, locale.value);
  }
});

watch(picture, () => {
  if (!picture.value) return;

  useHead({
    title: picture.value.title + t("seo.pictureDetails.title"),
    meta: [
      { name: "description", content: t("seo.pictureDetails.description") },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content: picture.value.title + t("seo.pictureDetails.title"),
      },
      {
        property: "og:description",
        content: t("seo.pictureDetails.description"),
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
});
</script>
<style lang="scss"></style>
