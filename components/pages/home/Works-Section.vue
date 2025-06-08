<template>
  <section class="works">
    <div class="works__container">
      <div class="works__top">
        <h2
          class="works__title title-works"
          :aria-label="t('pages.home.worksSection.title.titleAriaLabel')"
        >
          <span class="title-works__row row-1">
            <span class="big-yellow span-1">{{
              t("pages.home.worksSection.title.row1.yellowSpan")
            }}</span>
            {{ t("pages.home.worksSection.title.row1.textPart1") }}
          </span>
          <span class="title-works__row row-2">
            <span class="span-3">{{
              t("pages.home.worksSection.title.row2.textPart1")
            }}</span>
            <span class="big-yellow span-4">{{
              t("pages.home.worksSection.title.row2.yellowSpan")
            }}</span>
          </span>
          <span class="title-works__row row-3">
            {{ t("pages.home.worksSection.title.row3.textPart1") }}
            <span class="big-yellow span-6">{{
              t("pages.home.worksSection.title.row3.yellowSpan")
            }}</span>
            {{ t("pages.home.worksSection.title.row3.textPart2") }}
          </span>
        </h2>
        <NuxtLink to="/about-author" class="works__btn-toknow btn-circle">
          {{ t("pages.home.worksSection.btnToKnow") }}
        </NuxtLink>
      </div>
      <div class="works__pictures pictures-works gallery">
        <ul class="pictures-works__list gallery__list">
          <li class="pictures-works__item gallery__item">
            <a href="" class="pictures-works__picture gallery__picture">
              <div class="pictures-works__img gallery__img">
                <img
                  src="./public/images/pages/home/picture_1.jpg"
                  alt="picture"
                  width="400"
                  height="400"
                />
              </div>
              <h3 class="pictures-works__name gallery__name">
                Вечер над заливом
              </h3>
              <p class="pictures-works__price gallery__price">$2,500</p>
            </a>
          </li>
          <li class="pictures-works__item gallery__item">
            <a href="" class="pictures-works__picture gallery__picture">
              <div class="pictures-works__img gallery__img">
                <img
                  src="./public/images/pages/home/picture_2.jpg"
                  alt="picture"
                  width="400"
                  height="400"
                />
              </div>
              <h3 class="pictures-works__name gallery__name">
                Вечер над заливом
              </h3>
              <p class="pictures-works__price gallery__price">$2,500</p>
            </a>
          </li>
          <li class="pictures-works__item gallery__item">
            <a href="" class="pictures-works__picture gallery__picture">
              <div class="pictures-works__img gallery__img">
                <img
                  src="./public/images/pages/home/picture_1.jpg"
                  alt="picture"
                  width="400"
                  height="400"
                />
              </div>
              <h3 class="pictures-works__name gallery__name">
                Вечер над заливом
              </h3>
              <p class="pictures-works__price gallery__price">$2,500</p>
            </a>
          </li>
          <li class="pictures-works__item gallery__item">
            <a href="" class="pictures-works__picture gallery__picture">
              <div class="pictures-works__img gallery__img">
                <img
                  src="./public/images/pages/home/picture_2.jpg"
                  alt="picture"
                  width="400"
                  height="400"
                />
              </div>
              <h3 class="pictures-works__name gallery__name">
                Вечер над заливом
              </h3>
              <p class="pictures-works__price gallery__price">$2,500</p>
            </a>
          </li>
          <li class="pictures-works__item gallery__item">
            <a href="" class="pictures-works__picture gallery__picture">
              <div class="pictures-works__img gallery__img">
                <img
                  src="./public/images/pages/home/picture_1.jpg"
                  alt="picture"
                  width="400"
                  height="400"
                />
              </div>
              <h3 class="pictures-works__name gallery__name">
                Вечер над заливом
              </h3>
              <p class="pictures-works__price gallery__price">$2,500</p>
            </a>
          </li>
          <li class="pictures-works__item gallery__item">
            <a href="" class="pictures-works__picture gallery__picture">
              <div class="pictures-works__img gallery__img">
                <img
                  src="./public/images/pages/home/picture_2.jpg"
                  alt="picture"
                  width="400"
                  height="400"
                />
              </div>
              <h3 class="pictures-works__name gallery__name">
                Вечер над заливом
              </h3>
              <p class="pictures-works__price gallery__price">$2,500</p>
            </a>
          </li>
        </ul>
      </div>
      <NuxtLink to="/catalog" class="works__btn-view-all btn-circle">
        {{ t("pages.home.worksSection.btnViewAll") }}
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
</script>
