<template>
  <section class="career-timeline">
    <div class="career-timeline__container">
      <h2 class="career-timeline__title">
        {{ t("pages.aboutMother.careerTimelineSection.title") }}
      </h2>
      <p class="career-timeline__bg-text bg-text">
        {{ t("pages.aboutMother.careerTimelineSection.BgText") }}
      </p>
      <div class="career-timeline__cards">
        <article class="career-timeline__card">
          <p class="career-timeline__story">
            {{ t("pages.aboutMother.careerTimelineSection.stories.story1") }}
          </p>
          <p class="career-timeline__number bg-text">1</p>
        </article>
        <article class="career-timeline__card">
          <p class="career-timeline__story">
            {{ t("pages.aboutMother.careerTimelineSection.stories.story2") }}
          </p>
          <p class="career-timeline__number bg-text">2</p>
        </article>
        <article class="career-timeline__card">
          <p class="career-timeline__story">
            {{ t("pages.aboutMother.careerTimelineSection.stories.story3") }}
          </p>
          <p class="career-timeline__number bg-text">3</p>
        </article>
        <article class="career-timeline__card">
          <p class="career-timeline__story">
            {{ t("pages.aboutMother.careerTimelineSection.stories.story4") }}
          </p>
          <p class="career-timeline__number bg-text">4</p>
        </article>
        <article class="career-timeline__card">
          <p class="career-timeline__story">
            {{ t("pages.aboutMother.careerTimelineSection.stories.story5") }}
          </p>
          <p class="career-timeline__number bg-text">5</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
</script>
