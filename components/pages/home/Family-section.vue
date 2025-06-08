<template>
  <section class="family">
    <h2 class="family__title visually-hidden">
      {{ t("pages.home.familySection.title") }}
    </h2>
    <div class="family__container">
      <div class="family__top">
        <blockquote class="family__quote">
          {{ t("pages.home.familySection.quote") }}
        </blockquote>
        <p class="family__bg-text">
          {{ t("pages.home.familySection.bgText") }}
        </p>
      </div>
      <ul class="family__members">
        <li class="family__member member-family">
          <article class="member-family__card">
            <div class="member-family__image">
              <NuxtImg
                src="/images/pages/home/family/mother.webp"
                :alt="t('pages.home.familySection.members.mother.imgAlt')"
                width="392"
                height="490"
                loading="lazy"
              />
            </div>
            <h3 class="member-family__name">
              {{ t("pages.home.familySection.members.mother.name") }}
            </h3>
            <div class="member-family__bottom">
              <p class="member-family__role">
                {{ t("pages.home.familySection.members.mother.role") }}
              </p>
              <NuxtLink
                :to="localePath('/about-mother')"
                class="member-family__linkto link-to"
                :aria-label="
                  t('pages.home.familySection.members.mother.linkAriaLabel')
                "
              ></NuxtLink>
            </div>
          </article>
        </li>
        <li class="family__member member-family">
          <article class="member-family__card">
            <div class="member-family__image">
              <NuxtImg
                src="/images/pages/home/family/father.webp"
                :alt="t('pages.home.familySection.members.father.imgAlt')"
                width="392"
                height="490"
                loading="lazy"
              />
            </div>
            <h3 class="member-family__name">
              {{ t("pages.home.familySection.members.father.name") }}
            </h3>
            <div class="member-family__bottom">
              <p class="member-family__role">
                {{ t("pages.home.familySection.members.father.role") }}
              </p>
              <NuxtLink
                :to="localePath('/about-father')"
                class="member-family__linkto link-to"
                :aria-label="
                  t('pages.home.familySection.members.father.linkAriaLabel')
                "
              ></NuxtLink>
            </div>
          </article>
        </li>
        <li class="family__member member-family">
          <article class="member-family__card">
            <div class="member-family__image">
              <NuxtImg
                src="/images/pages/home/family/oleksii-and-wife.webp"
                :alt="
                  t('pages.home.familySection.members.oleksiiAndWife.imgAlt')
                "
                width="392"
                height="490"
                loading="lazy"
              />
            </div>
            <h3 class="member-family__name">
              {{ t("pages.home.familySection.members.oleksiiAndWife.name") }}
            </h3>
            <div class="member-family__bottom">
              <p class="member-family__role">
                {{ t("pages.home.familySection.members.oleksiiAndWife.role") }}
              </p>
              <NuxtLink
                :to="localePath('/about-oleksii-and-wife')"
                :aria-label="
                  t(
                    'pages.home.familySection.members.oleksiiAndWife.linkAriaLabel'
                  )
                "
                class="member-family__linkto link-to"
              ></NuxtLink>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const localePath = useLocalePath();
const { t } = useI18n();
</script>
