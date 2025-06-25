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
import ContactUs from "@/layouts/Contact-us.vue";
import Footer from "@/layouts/Footer.vue";
import PopupComponent from "@/components/popupComponent.vue";
import { useBodyScrollLock } from "@/composables/useBodyScrollLock";
import { useRoute, useRouter } from "vue-router";
import {
  fetchPictureByDocumentId,
  fetchRelatedPictures,
} from "@/composables/api/paintings";
const route = useRoute();
const router = useRouter();
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
</script>

<style lang="scss">
@use "@/assets/scss/pages/picture-details.scss";
</style>
