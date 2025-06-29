<template>
  <article class="artwork">
    <div class="artwork__container">
      <figure class="artwork__image">
        <NuxtImg
          :src="picture.image.src"
          :alt="picture.image.alt"
          width="854"
          height="621"
          @click="openLightbox"
        />
        <figcaption class="visually-hidden">
          {{ picture.image.caption }}
        </figcaption>
      </figure>
      <section class="artwork__body">
        <h1 class="artwork__title">{{ picture.title }}</h1>
        <dl class="artwork__details">
          <div>
            <dt>
              {{ t("pages.pictureDetails.artworkSection.details.year") }}
            </dt>
            <dd>{{ picture.details.year }}</dd>
          </div>
          <div>
            <dt>{{ t("pages.pictureDetails.artworkSection.details.size") }}</dt>
            <dd>{{ picture.details.size }}</dd>
          </div>
          <div>
            <dt>
              {{ t("pages.pictureDetails.artworkSection.details.material") }}
            </dt>
            <dd>{{ picture.details.material }}</dd>
          </div>
          <div>
            <dt>
              {{ t("pages.pictureDetails.artworkSection.details.style") }}
            </dt>
            <dd>{{ picture.details.style }}</dd>
          </div>
        </dl>
        <div class="artwork__body-bottom">
          <p class="artwork__price">${{ picture.price }}</p>
          <button class="artwork__btn btn-circle" @click="emit('togglePopup')">
            {{ t("pages.pictureDetails.artworkSection.buyBtn") }}
          </button>
        </div>
      </section>
    </div>
  </article>
  <VueEasyLightbox
    v-if="imageUrl"
    :visible="visible"
    :index="0"
    :show-index="false"
    :rotate-disabled="true"
    :imgs="[imageUrl]"
    :zoom-scale="0.3"
    @hide="closeLightbox"
  />
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const VueEasyLightbox = defineAsyncComponent(() => import("vue-easy-lightbox"));
const emit = defineEmits(["togglePopup"]);
const props = defineProps({
  picture: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();
const imageUrl = computed(() => props.picture.image.src || "");

const visible = ref(false);

const openLightbox = () => {
  visible.value = true;
};

const closeLightbox = () => {
  visible.value = false;
};
</script>

<style lang="scss"></style>
