<template>
  <section class="info-cards brothers-wife">
    <div class="info-cards__container">
      <ul class="info-cards__list">
        <li class="info-cards__item item-info-cards">
          <p class="item-info-cards__text">
            {{
              t(
                "pages.aboutOleksiiAndWife.infoCardsBrothersWifeSection.card1.text"
              )
            }}
          </p>
        </li>
        <li class="info-cards__item item-info-cards">
          <p class="item-info-cards__text">
            {{
              t(
                "pages.aboutOleksiiAndWife.infoCardsBrothersWifeSection.card2.text"
              )
            }}
          </p>
        </li>
        <li class="info-cards__item item-info-cards">
          <p class="item-info-cards__text">
            {{
              t(
                "pages.aboutOleksiiAndWife.infoCardsBrothersWifeSection.card3.text"
              )
            }}
          </p>
        </li>
        <li class="info-cards__item item-info-cards">
          <p class="item-info-cards__text">
            {{
              t(
                "pages.aboutOleksiiAndWife.infoCardsBrothersWifeSection.card4.text"
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

<style lang="scss" scoped>
.info-cards {
  &.brothers-wife &__item {
    flex: 1 1 17.5rem;
  }
}
</style>
