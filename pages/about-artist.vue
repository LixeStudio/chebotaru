<template>
  <div class="about-artist-page">
    <Header />
    <main class="main">
      <PreviewSection />
      <AboutAuthorSection />
      <section class="hero">
        <div class="hero__container">
          <div class="hero__content">
            <h2 class="hero__title">Путь в искусстве</h2>
            <p class="hero__text">
              Андрей Чеботару родился в 1984 году в Севастополе в художественной
              семье. Его творческий путь начался с раннего детства — он рос
              среди кистей, холстов и этюдников. Родители-художники, Николай
              и Тамара Чеботару, стали для него первыми наставниками.
            </p>
            <p class="hero__text">
              Уже в юном возрасте Андрей начал постигать азы композиции, цвета
              и света, а в 2011 году, ещё будучи студентом, стал членом
              Национального союза художников Украины.
            </p>
            <p class="hero__bg-text bg-text">Path</p>
          </div>
          <div class="hero__image">
            <img
              src="./public/images/pages/family/about-author/chebotaru-mountains-painting.webp"
              alt="Andrii Chebotaru painting"
              width="720"
              height="840"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <section class="inspiration-map">
        <div class="inspiration-map__container">
          <div class="inspiration-map__content">
            <h2 class="inspiration-map__title">География вдохновения</h2>
            <p class="inspiration-map__text">
              Путешествия — важная часть жизни художника. Он считает, что каждый
              пейзаж, каждый город, каждый световой акцент могут стать отправной
              точкой для новой работы.
            </p>
            <p class="inspiration-map__bg-text bg-text">Inspiration</p>
          </div>
          <ul class="inspiration-map__locations">
            <li
              class="inspiration-map__location location-inspiration-map location-1"
            >
              <div class="location-inspiration-map__image">
                <img
                  src="./public/images/pages/family/about-author/inspiration-map/Montenegro.webp"
                  alt="Montenegro image"
                />
              </div>
              <p class="location-inspiration-map__name">
                Черногория. Которский залив
              </p>
            </li>
            <li
              class="inspiration-map__location location-inspiration-map location-2"
            >
              <div class="location-inspiration-map__image">
                <img
                  src="./public/images/pages/family/about-author/inspiration-map/france.webp"
                  alt="France image"
                />
              </div>
              <p class="location-inspiration-map__name">
                Франция. Бискайский залив
              </p>
            </li>
            <li
              class="inspiration-map__location location-inspiration-map location-3"
            >
              <div class="location-inspiration-map__image">
                <img
                  src="./public/images/pages/family/about-author/inspiration-map/Croatia.webp"
                  alt="Croatia image"
                />
              </div>
              <p class="location-inspiration-map__name">Хорватия. Дубровник</p>
            </li>
            <li
              class="inspiration-map__location location-inspiration-map location-4"
            >
              <div class="location-inspiration-map__image">
                <img
                  src="./public/images/pages/family/about-author/inspiration-map/turkey.webp"
                  alt="Turkey image"
                />
              </div>
              <p class="location-inspiration-map__name">Турция. Мармарис</p>
            </li>
            <li
              class="inspiration-map__location location-inspiration-map location-5"
            >
              <div class="location-inspiration-map__image">
                <img
                  src="./public/images/pages/family/about-author/inspiration-map/Dutch.webp"
                  alt="Dutch image"
                />
              </div>
              <p class="location-inspiration-map__name">
                Нидерланды. Амстердам
              </p>
            </li>
          </ul>
        </div>
      </section>
      <HeroReverseSection />
      <FamilyQuote :quote="quoteText" :author="quoteAuthor" />
      <CareerTimelineSection />
      <ContactUs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import PreviewSection from "@/components/pages/aboutArtist/Preview-section.vue";
import AboutAuthorSection from "@/components/pages/aboutArtist/AboutAuthor-section.vue";
import HeroReverseSection from "@/components/pages/aboutArtist/HeroReverse-section.vue";
import FamilyQuote from "@/layouts/FamilyQuote.vue";
import CareerTimelineSection from "@/components/pages/aboutArtist/CareerTimeline-section.vue";
import ContactUs from "@/layouts/Contact-us.vue";
import Footer from "@/layouts/Footer.vue";
const { t } = useI18n();
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = true;
const quoteText = t("pages.aboutArtist.quoteSection.text");
const quoteAuthor = t("pages.aboutArtist.quoteSection.author");
</script>

<style lang="scss">
@use "@/assets/scss/pages/about-artist.scss";
</style>
