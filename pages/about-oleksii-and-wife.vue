<template>
  <div class="about-oleksii-and-wife-page">
    <Header />
    <main class="main">
      <PreviewSection />
      <HeroBrotherSection />
      <InfoCardsSection />
      <GalleryBrotherSection />
      <section class="hero brothers-wife reverse">
        <div class="hero__container">
          <div class="hero__content">
            <div class="hero__content-wrapper">
              <span class="hero__role"
                >Супруга Олексея (брата Андрея Чеботару)
              </span>
              <h2 class="hero__title">Алла Кислякова</h2>
              <p class="hero__text">
                Профессиональный художник-живописец, член Союза художников
                Украины. Ее работы охватывают такие стили, как импрессионизм
                и экспрессионизм. Алла активно участвует в выставках
                и арт-симпозиумах, а также ведет преподавательскую деятельность
                в Украине и за рубежом.
              </p>
            </div>
            <p class="hero__bg-text bg-text">Wife</p>
          </div>
          <div class="hero__image">
            <img
              src="./public/images/pages/family/brother-and-wife/Alla-Kislyakova.webp"
              alt="Andrii Chebotaru brothers wife"
              width="720"
              height="840"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <section class="info-cards brothers-wife">
        <div class="info-cards__container">
          <ul class="info-cards__list">
            <li class="info-cards__item item-info-cards">
              <p class="item-info-cards__text">
                Одесское художественное училище, факультет дизайна
              </p>
            </li>
            <li class="info-cards__item item-info-cards">
              <p class="item-info-cards__text">
                Работает в жанрах ботанической графики, иллюстрации,
                декоративного панно
              </p>
            </li>
            <li class="info-cards__item item-info-cards">
              <p class="item-info-cards__text">
                Участница совместных выставок и арт-резиденций
              </p>
            </li>
            <li class="info-cards__item item-info-cards">
              <p class="item-info-cards__text">
                Проводит мастер-классы и обучающие курсы по авторской технике
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section class="gallery">
        <div class="gallery__container">
          <div class="gallery__top">
            <h2 class="gallery__title">Галерея работ Аллы Кисляковой</h2>
            <p class="gallery__bg-text bg-text">Works</p>
          </div>
          <ul class="gallery__paintings paintings-gallery brothers-wife">
            <li class="paintings-gallery__item picture-1">
              <article class="paintings-gallery__card">
                <div class="paintings-gallery__image">
                  <img
                    src="./public/images/pages/family/brother-and-wife/pictures/Enchanted-Forest.webp"
                    alt="painting img"
                  />
                </div>
                <div class="paintings-gallery__info">
                  <span class="paintings-gallery__year"> 2020 </span>
                  <h3 class="paintings-gallery__title">Очарованный лес</h3>
                  <span class="paintings-gallery__size"> 100х100см </span>
                </div>
              </article>
            </li>
            <li class="paintings-gallery__item picture-2">
              <article class="paintings-gallery__card">
                <div class="paintings-gallery__image">
                  <img
                    src="./public/images/pages/family/brother-and-wife/pictures/Luxurious-flowers.webp"
                    alt="painting img"
                  />
                </div>
                <div class="paintings-gallery__info">
                  <span class="paintings-gallery__year"> 2020 </span>
                  <h3 class="paintings-gallery__title">Роскошные цветы</h3>
                  <span class="paintings-gallery__size"> 70х80см </span>
                </div>
              </article>
            </li>
            <li class="paintings-gallery__item picture-3">
              <article class="paintings-gallery__card">
                <div class="paintings-gallery__image">
                  <img
                    src="./public/images/pages/family/brother-and-wife/pictures/Feelings.webp"
                    alt="painting img"
                  />
                </div>
                <div class="paintings-gallery__info">
                  <span class="paintings-gallery__year"> 2020 </span>
                  <h3 class="paintings-gallery__title">Чувства</h3>
                  <span class="paintings-gallery__size"> 100х100см </span>
                </div>
              </article>
            </li>
          </ul>
        </div>
      </section>
      <ContactUs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import PreviewSection from "@/components/pages/aboutOleksiiAndWife/previewSection.vue";
import HeroBrotherSection from "@/components/pages/aboutOleksiiAndWife/HeroBrotherSection.vue";
import InfoCardsSection from "@/components/pages/aboutOleksiiAndWife/infoCardsSection.vue";
import GalleryBrotherSection from "@/components/pages/aboutOleksiiAndWife/galleryBrotherSection.vue";
import ContactUs from "@/layouts/Contact-us.vue";
import Footer from "@/layouts/Footer.vue";

const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;
</script>

<style lang="scss">
@use "@/assets/scss/pages/about-oleksii-and-wife.scss";
</style>
