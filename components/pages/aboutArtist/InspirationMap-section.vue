<template>
  <section class="inspiration-map">
    <div class="inspiration-map__container">
      <div class="inspiration-map__content">
        <h2 class="inspiration-map__title">
          {{ t("pages.aboutArtist.inspirationMapSection.title") }}
        </h2>
        <p class="inspiration-map__text">
          {{ t("pages.aboutArtist.inspirationMapSection.text") }}
        </p>
        <p class="inspiration-map__bg-text bg-text">
          {{ t("pages.aboutArtist.inspirationMapSection.bgText") }}
        </p>
      </div>
      <ul class="inspiration-map__locations">
        <li
          class="inspiration-map__location location-inspiration-map location-1"
        >
          <div class="location-inspiration-map__image">
            <NuxtImg
              src="/images/pages/family/about-author/inspiration-map/Montenegro.webp"
              :alt="
                t(
                  'pages.aboutArtist.inspirationMapSection.locations.location1.imgAlt'
                )
              "
              loading="lazy"
            />
          </div>
          <p class="location-inspiration-map__name">
            {{
              t(
                "pages.aboutArtist.inspirationMapSection.locations.location1.name"
              )
            }}
          </p>
        </li>
        <li
          class="inspiration-map__location location-inspiration-map location-2"
        >
          <div class="location-inspiration-map__image">
            <NuxtImg
              src="/images/pages/family/about-author/inspiration-map/france.webp"
              :alt="
                t(
                  'pages.aboutArtist.inspirationMapSection.locations.location2.imgAlt'
                )
              "
              loading="lazy"
            />
          </div>
          <p class="location-inspiration-map__name">
            {{
              t(
                "pages.aboutArtist.inspirationMapSection.locations.location2.name"
              )
            }}
          </p>
        </li>
        <li
          class="inspiration-map__location location-inspiration-map location-3"
        >
          <div class="location-inspiration-map__image">
            <NuxtImg
              src="/images/pages/family/about-author/inspiration-map/Croatia.webp"
              :alt="
                t(
                  'pages.aboutArtist.inspirationMapSection.locations.location3.imgAlt'
                )
              "
              loading="lazy"
            />
          </div>
          <p class="location-inspiration-map__name">
            {{
              t(
                "pages.aboutArtist.inspirationMapSection.locations.location3.name"
              )
            }}
          </p>
        </li>
        <li
          class="inspiration-map__location location-inspiration-map location-4"
        >
          <div class="location-inspiration-map__image">
            <NuxtImg
              src="./images/pages/family/about-author/inspiration-map/turkey.webp"
              :alt="
                t(
                  'pages.aboutArtist.inspirationMapSection.locations.location4.imgAlt'
                )
              "
              loading="lazy"
            />
          </div>
          <p class="location-inspiration-map__name">
            {{
              t(
                "pages.aboutArtist.inspirationMapSection.locations.location4.name"
              )
            }}
          </p>
        </li>
        <li
          class="inspiration-map__location location-inspiration-map location-5"
        >
          <div class="location-inspiration-map__image">
            <NuxtImg
              src="/images/pages/family/about-author/inspiration-map/Dutch.webp"
              :alt="
                t(
                  'pages.aboutArtist.inspirationMapSection.locations.location5.imgAlt'
                )
              "
              loading="lazy"
            />
          </div>
          <p class="location-inspiration-map__name">
            {{
              t(
                "pages.aboutArtist.inspirationMapSection.locations.location5.name"
              )
            }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
</script>

<style lang="scss"></style>
