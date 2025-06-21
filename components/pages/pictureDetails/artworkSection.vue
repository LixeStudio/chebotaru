<template>
  <article class="artwork">
    <div class="artwork__container">
      <figure class="artwork__image">
        <NuxtImg
          src="/images/pages/home/picture_1.jpg"
          alt="Картина Безграничная свобода художника XYZ"
          width="854"
          height="621"
        />
        <figcaption class="visually-hidden">Описание изображения</figcaption>
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
</template>

<script setup>
const emit = defineEmits(["togglePopup"]);
defineProps({
  picture: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();
</script>
