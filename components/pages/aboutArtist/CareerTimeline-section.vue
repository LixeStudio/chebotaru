<template>
  <section class="career-timeline">
    <div class="career-timeline__container">
      <h2 class="career-timeline__title">
        {{ t("pages.aboutArtist.careerTimelineSection.title") }}
      </h2>
      <p class="career-timeline__bg-text bg-text">
        {{ t("pages.aboutArtist.careerTimelineSection.BgText") }}
      </p>
      <div class="career-timeline__cards">
        <article class="career-timeline__card">
          <p class="career-timeline__story">
            {{ t("pages.aboutArtist.careerTimelineSection.stories.story1") }}
          </p>
          <p class="career-timeline__number bg-text">1</p>
        </article>
        <article class="career-timeline__card">
          <p class="career-timeline__story">
            {{ t("pages.aboutArtist.careerTimelineSection.stories.story2") }}
          </p>
          <p class="career-timeline__number bg-text">2</p>
        </article>
        <article class="career-timeline__card">
          <p class="career-timeline__story">
            {{ t("pages.aboutArtist.careerTimelineSection.stories.story3") }}
          </p>
          <p class="career-timeline__number bg-text">3</p>
        </article>
        <article class="career-timeline__card">
          <p class="career-timeline__story">
            {{ t("pages.aboutArtist.careerTimelineSection.stories.story4") }}
          </p>
          <p class="career-timeline__number bg-text">4</p>
        </article>
        <article class="career-timeline__card custom">
          <p class="career-timeline__story">
            {{ t("pages.aboutArtist.careerTimelineSection.stories.story5") }}
          </p>
          <div class="career-timeline__image">
            <NuxtImg
              src="/images/pages/family/about-author/rewards-image.webp"
              loading="lazy"
              width="1044"
              height="558"
              :alt="
                t('pages.aboutArtist.careerTimelineSection.stories.storyImgAlt')
              "
            />
          </div>
          <p class="career-timeline__number bg-text">5</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
</script>

<style lang="scss" scoped>
@use "assets/scss/utils/variables" as *;
.career-timeline {
  &__card {
    min-width: 18rem;
    &.custom {
      flex-basis: 100%;
    }
  }
  &__card.custom &__story {
    margin-bottom: 1rem;
  }
}

@media screen and (min-width: $mobile) {
  .career-timeline {
    &__card.custom &__story {
      margin-bottom: 2rem;
    }
  }
}
@media screen and (min-width: $tablet) {
  .career-timeline {
    &__card {
      min-width: 18rem;
      &.custom {
        flex-basis: 100%;
      }
    }
    &__card.custom &__story {
      max-width: 31.0625rem;
      width: 41%;
      margin-bottom: 0;
    }
    &__image {
      max-width: 65.25rem;
      margin-left: auto;
      width: 87%;
      margin-top: -7%;
    }
  }
}
</style>
