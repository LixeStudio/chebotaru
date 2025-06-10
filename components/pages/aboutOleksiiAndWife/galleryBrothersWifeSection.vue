<template>
  <section class="gallery">
    <div class="gallery__container">
      <div class="gallery__top">
        <h2 class="gallery__title">
          {{ t("pages.aboutOleksiiAndWife.galleryBrothersWifeSection.title") }}
        </h2>
        <p class="gallery__bg-text bg-text">
          {{ t("pages.aboutOleksiiAndWife.galleryBrothersWifeSection.bgText") }}
        </p>
      </div>
      <ul class="gallery__paintings paintings-gallery brothers-wife">
        <li class="paintings-gallery__item picture-1">
          <article class="paintings-gallery__card">
            <div class="paintings-gallery__image">
              <NuxtImg
                src="/images/pages/family/brother-and-wife/pictures/Enchanted-Forest.webp"
                :alt="
                  t(
                    'pages.aboutOleksiiAndWife.galleryBrothersWifeSection.paintings.picture1.imgAlt'
                  )
                "
                height="366"
                width="407"
                format="webp"
                loading="lazy"
              />
            </div>
            <div class="paintings-gallery__info">
              <span class="paintings-gallery__year"> 2020 </span>
              <h3 class="paintings-gallery__title">
                {{
                  t(
                    "pages.aboutOleksiiAndWife.galleryBrothersWifeSection.paintings.picture1.title"
                  )
                }}
              </h3>
              <span class="paintings-gallery__size"> 100х100см </span>
            </div>
          </article>
        </li>
        <li class="paintings-gallery__item picture-2">
          <article class="paintings-gallery__card">
            <div class="paintings-gallery__image">
              <NuxtImg
                src="/images/pages/family/brother-and-wife/pictures/Luxurious-flowers.webp"
                :alt="
                  t(
                    'pages.aboutOleksiiAndWife.galleryBrothersWifeSection.paintings.picture2.imgAlt'
                  )
                "
                height="413"
                width="461"
                format="webp"
                loading="lazy"
              />
            </div>
            <div class="paintings-gallery__info">
              <span class="paintings-gallery__year"> 2020 </span>
              <h3 class="paintings-gallery__title">
                {{
                  t(
                    "pages.aboutOleksiiAndWife.galleryBrothersWifeSection.paintings.picture2.title"
                  )
                }}
              </h3>
              <span class="paintings-gallery__size"> 70х80см </span>
            </div>
          </article>
        </li>
        <li class="paintings-gallery__item picture-3">
          <article class="paintings-gallery__card">
            <div class="paintings-gallery__image">
              <NuxtImg
                src="/images/pages/family/brother-and-wife/pictures/Feelings.webp"
                :alt="
                  t(
                    'pages.aboutOleksiiAndWife.galleryBrothersWifeSection.paintings.picture3.imgAlt'
                  )
                "
                height="366"
                width="407"
                format="webp"
                loading="lazy"
              />
            </div>
            <div class="paintings-gallery__info">
              <span class="paintings-gallery__year"> 2020 </span>
              <h3 class="paintings-gallery__title">
                {{
                  t(
                    "pages.aboutOleksiiAndWife.galleryBrothersWifeSection.paintings.picture3.title"
                  )
                }}
              </h3>
              <span class="paintings-gallery__size"> 100х100см </span>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
</script>

<style lang="scss" scoped>
@use "assets/scss/utils/variables" as *;
.gallery {
  padding-bottom: 3.75rem;
  margin-bottom: 2rem;
  background-color: white;
  &__top {
    display: flex;
    justify-content: center;
    padding-top: 5.625rem;
    position: relative;
    width: 100%;
  }
  &__title {
    font-size: 2.125rem;
    font-weight: 500;
    line-height: 117.647%;
    max-width: 27.125rem;
    text-align: center;
    margin-bottom: 1.25rem;
  }
  &__bg-text {
    top: 0;
    right: 0;
    left: 0;
    text-align: center;
  }
}

.paintings-gallery {
  display: flex;
  overflow-y: auto;
  gap: 1.5rem;

  &.brothers-wife &__item {
    flex: 0 0 22.875rem;
    &.picture-2 {
      flex: 1 1 auto;
      min-width: 28.8rem;
    }
  }
  &__image {
    margin-bottom: 0.75rem;
    position: relative;
    width: 100%;
    height: 25.4375rem;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__year,
  &__size {
    font-size: 0.875rem;
    line-height: 142.857%;
    color: $Default-gray-500;
  }
  &__title {
    line-height: 150%;
  }
}
@media screen and (min-width: $mobile) {
  .gallery {
    margin-bottom: 3.75rem;
    &__top {
      padding-top: 7.5rem;
    }
    &__title {
      font-size: 3rem;
      line-height: 108.333%;
      margin-bottom: 3rem;
    }
    &__bg-text {
      top: 5rem;
    }
  }
}

@media screen and (min-width: $tablet) {
  .gallery {
    &__bg-text {
      top: 0;
    }
  }
}
</style>
