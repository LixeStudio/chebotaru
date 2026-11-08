<template>
  <section class="privacy">
    <div class="privacy__container">
      <header class="privacy__header">
        <h1 class="privacy__title">{{ t("pages.privacy.title") }}</h1>
        <p class="privacy__updated">{{ t("pages.privacy.updated") }}</p>
        <p class="privacy__intro">{{ t("pages.privacy.intro") }}</p>
      </header>

      <div class="privacy__body">
        <article
          v-for="section in sections"
          :key="section.id"
          class="privacy__section"
        >
          <h2 class="privacy__section-title">{{ section.title }}</h2>
          <div class="privacy__text-block">
            <p
              v-for="(paragraph, pIndex) in section.paragraphs"
              :key="pIndex"
              class="privacy__text"
            >
              {{ paragraph }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t, tm, rt, locale } = useI18n();

const sections = computed(() => {
  locale.value;
  const raw = tm("pages.privacy.sections");
  if (!raw || typeof raw !== "object") return [];

  return Object.entries(raw).map(([id, section]) => {
    const paragraphsRaw = section?.paragraphs || {};
    const paragraphs = Object.keys(paragraphsRaw)
      .sort()
      .map((key) => rt(paragraphsRaw[key]));

    return {
      id,
      title: rt(section.title),
      paragraphs,
    };
  });
});
</script>
