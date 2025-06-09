<template>
  <section class="recognition">
    <div class="recognition__container">
      <div class="recognition__top">
        <h2 class="recognition__title">
          {{ t("pages.aboutFather.recognitionSection.title") }}
        </h2>
        <p class="recognition__bg-text bg-text">
          {{ t("pages.aboutFather.recognitionSection.BgText") }}
        </p>
        <ul class="recognition__list">
          <li class="recognition__item">
            {{ t("pages.aboutFather.recognitionSection.listOfItems.item1") }}
          </li>
          <li class="recognition__item">
            {{ t("pages.aboutFather.recognitionSection.listOfItems.item2") }}
          </li>
          <li class="recognition__item">
            {{ t("pages.aboutFather.recognitionSection.listOfItems.item3") }}
          </li>
          <li class="recognition__item">
            {{ t("pages.aboutFather.recognitionSection.listOfItems.item4") }}
          </li>
          <li class="recognition__item">
            {{ t("pages.aboutFather.recognitionSection.listOfItems.item5") }}
          </li>
        </ul>
      </div>
      <div class="recognition__paintings paintings-recognition">
        <ul class="paintings-recognition__list">
          <li class="paintings-recognition__item picture-1">
            <article class="paintings-recognition__card">
              <div class="paintings-recognition__image">
                <NuxtImg
                  src="/images/pages/family/about-father/pictures/I-love-the-charm-of-the-eyes.webp"
                  :alt="
                    t(
                      'pages.aboutFather.recognitionSection.paintings.picture1.imgAlt'
                    )
                  "
                />
              </div>
              <div class="paintings-recognition__info">
                <span class="paintings-recognition__year"> 2021 </span>
                <h3 class="paintings-recognition__title">
                  {{
                    t(
                      "pages.aboutFather.recognitionSection.paintings.picture1.title"
                    )
                  }}
                </h3>
                <span class="paintings-recognition__size"> 50×70см </span>
              </div>
            </article>
          </li>
          <li class="paintings-recognition__item picture-2">
            <article class="paintings-recognition__card">
              <div class="paintings-recognition__image">
                <NuxtImg
                  src="/images/pages/family/about-father/pictures/summer.webp"
                  :alt="
                    t(
                      'pages.aboutFather.recognitionSection.paintings.picture2.imgAlt'
                    )
                  "
                />
              </div>
              <div class="paintings-recognition__info">
                <span class="paintings-recognition__year"> 1993 </span>
                <h3 class="paintings-recognition__title">
                  {{
                    t(
                      "pages.aboutFather.recognitionSection.paintings.picture2.title"
                    )
                  }}
                </h3>
                <span class="paintings-recognition__size"> 50×60см </span>
              </div>
            </article>
          </li>
          <li class="paintings-recognition__item picture-3">
            <article class="paintings-recognition__card">
              <div class="paintings-recognition__image">
                <NuxtImg
                  src="/images/pages/family/about-father/pictures/Lilac-in-backlight.webp"
                  :alt="
                    t(
                      'pages.aboutFather.recognitionSection.paintings.picture3.imgAlt'
                    )
                  "
                />
              </div>
              <div class="paintings-recognition__info">
                <span class="paintings-recognition__year"> 2018 </span>
                <h3 class="paintings-recognition__title">
                  {{
                    t(
                      "pages.aboutFather.recognitionSection.paintings.picture3.title"
                    )
                  }}
                </h3>
                <span class="paintings-recognition__size"> 50×70см </span>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
</script>
