<template>
  <article class="artwork">
    <div class="artwork__container">
      <figure class="artwork__image">
        <img
          src="./public/images/pages/home/picture_1.jpg"
          alt="Картина Безграничная свобода художника XYZ"
          width="854"
          height="621"
        />
        <figcaption class="visually-hidden">Описание изображения</figcaption>
      </figure>
      <section class="artwork__body">
        <h1 class="artwork__title">Безграничная свобода</h1>
        <dl class="artwork__details">
          <div>
            <dt>Год</dt>
            <dd>2024</dd>
          </div>
          <div>
            <dt>Размер</dt>
            <dd>50 × 60 см</dd>
          </div>
          <div>
            <dt>Материалы</dt>
            <dd>Холст, масло</dd>
          </div>
          <div>
            <dt>Стиль</dt>
            <dd>Импрессионизм</dd>
          </div>
        </dl>
        <div class="artwork__body-bottom">
          <p class="artwork__price">$1,780</p>
          <button class="artwork__btn btn-circle">Купить</button>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup></script>
