<template>
  <section class="info-cards">
    <div class="info-cards__container">
      <ul class="info-cards__list">
        <li class="info-cards__item item-info-cards">
          <h3 class="item-info-cards__title">
            {{ t("pages.aboutOleksiiAndWife.infoCardsSection.card1.title") }}
          </h3>
          <p class="item-info-cards__text">
            {{ t("pages.aboutOleksiiAndWife.infoCardsSection.card1.text1") }}
          </p>
          <p class="item-info-cards__text">
            {{ t("pages.aboutOleksiiAndWife.infoCardsSection.card1.text2") }}
          </p>
        </li>
        <li class="info-cards__item item-info-cards">
          <h3 class="item-info-cards__title">
            {{ t("pages.aboutOleksiiAndWife.infoCardsSection.card2.title") }}
          </h3>
          <p class="item-info-cards__text">
            {{ t("pages.aboutOleksiiAndWife.infoCardsSection.card2.text1") }}
          </p>
          <p class="item-info-cards__text">
            {{ t("pages.aboutOleksiiAndWife.infoCardsSection.card2.text2") }}
          </p>
        </li>
        <li class="info-cards__item item-info-cards">
          <h3 class="item-info-cards__title">
            {{ t("pages.aboutOleksiiAndWife.infoCardsSection.card3.title") }}
          </h3>
          <p class="item-info-cards__text">
            {{ t("pages.aboutOleksiiAndWife.infoCardsSection.card3.text1") }}
          </p>
          <p class="item-info-cards__text">
            {{ t("pages.aboutOleksiiAndWife.infoCardsSection.card3.text2") }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
</script>
