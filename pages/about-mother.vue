<template>
  <div>
    <Header />
    <main class="main">
      <section class="hero family-hero">
        <div class="hero__container family-hero__container">
          <div class="hero__content family-hero__content">
            <span class="hero__role family-hero__role"
              >Мать Андрея Чеботару —
            </span>
            <h1 class="hero__title family-hero__title">Тамара Чеботару</h1>
            <p class="hero__text family-hero__text">
              Украинская художница, мастер натюрморта, посвятившая свою жизнь
              искусству и воспитанию творческой семьи. Её картины пронизаны
              цветом и светом, а педагогическая деятельность — искренней любовью
              к молодым талантам.
            </p>
            <p class="hero__bg-text family-hero__bg-text bg-text">Mother</p>
          </div>
          <div class="hero__image family-hero__image">
            <img
              src="./public/images/pages/family/about-mother/tamara-chebotaru.webp"
              alt="mother of Andrii Chebotaru"
              width="720"
              height="840"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <section class="career-timeline">
        <div class="career-timeline__container">
          <h2 class="career-timeline__title">Образование и карьера</h2>
          <p class="career-timeline__bg-text bg-text">Path</p>
          <div class="career-timeline__cards">
            <article class="career-timeline__card">
              <p class="career-timeline__story">
                Родилась 7 мая 1954 года в с. Глубокое, Одесская область.
              </p>
              <p class="career-timeline__number bg-text">1</p>
            </article>
            <article class="career-timeline__card">
              <p class="career-timeline__story">
                Окончила художественно-графический факультет Одесского
                педагогического института. Проходила обучение у профессора
                В. А. Гегомяна — ученика Мартироса Сарьяна.
              </p>
              <p class="career-timeline__number bg-text">2</p>
            </article>
            <article class="career-timeline__card">
              <p class="career-timeline__story">
                В 1977 году начала профессиональную деятельность в Севастополе.
              </p>
              <p class="career-timeline__number bg-text">3</p>
            </article>
            <article class="career-timeline__card">
              <p class="career-timeline__story">
                Работала преподавателем в изостудии и художником-декоратором
                в культурном комплексе «Корабел». 4
              </p>
              <p class="career-timeline__number bg-text">4</p>
            </article>
            <article class="career-timeline__card">
              <p class="career-timeline__story">
                Жена известного крымского художника Николая Чеботару.
              </p>
              <p class="career-timeline__number bg-text">5</p>
            </article>
          </div>
        </div>
      </section>
      <RecognitionSection />
      <FamilyQuote :quote="quoteText" :author="quoteAuthor" />
      <ContactUs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import FamilyQuote from "@/layouts/FamilyQuote.vue";
import RecognitionSection from "@/components/pages/aboutMother/Recognition-section.vue";
import ContactUs from "@/layouts/Contact-us.vue";
import Footer from "@/layouts/Footer.vue";
const { t } = useI18n();
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;
const quoteText = t("pages.aboutMother.quoteSection.text");
const quoteAuthor = t("pages.aboutMother.quoteSection.author");
</script>

<style lang="scss">
@use "@/assets/scss/pages/about-mother.scss";
</style>
