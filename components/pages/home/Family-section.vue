<template>
  <section class="family">
    <h2 class="family__title visually-hidden">Семья художника</h2>
    <div class="family__container">
      <div class="family__top">
        <blockquote class="family__quote">
          «Живопись — это часть нашей семьи. Мои родители и брат — тоже
          художники, и каждый из нас выражает искусство по-своему.»
        </blockquote>
        <p class="family__bg-text">Family</p>
      </div>
      <ul class="family__members">
        <li class="family__member member-family">
          <article class="member-family__card">
            <div class="member-family__image">
              <NuxtImg
                src="/images/pages/home/family/mom.jpg"
                alt="Тамара Чеботару — мать Андрея"
                width="392"
                height="490"
              />
            </div>
            <h3 class="member-family__name">Тамара Чеботару</h3>
            <div class="member-family__bottom">
              <p class="member-family__role">Мать Андрея</p>
              <a
                href="#"
                class="member-family__linkto link-to"
                aria-label="Подробнее о Тамаре Чеботару"
              ></a>
            </div>
          </article>
        </li>
        <li class="family__member member-family">
          <article class="member-family__card">
            <div class="member-family__image">
              <img
                src="./public/images/pages/home/family/father.jpg"
                alt="father"
                width="392"
                height="490"
              />
            </div>
            <h3 class="member-family__name">Николай Чеботару</h3>
            <div class="member-family__bottom">
              <p class="member-family__role">Отец Андрея</p>
              <a href="#" class="member-family__linkto link-to"></a>
            </div>
          </article>
        </li>
        <li class="family__member member-family">
          <article class="member-family__card">
            <div class="member-family__image">
              <img
                src="./public/images/pages/home/family/brother.jpg"
                alt="brother"
                width="392"
                height="490"
              />
            </div>
            <h3 class="member-family__name">
              Олексей Чеботару и Алла Кислякова
            </h3>
            <div class="member-family__bottom">
              <p class="member-family__role">Брат Андрея и его супруга</p>
              <a href="#" class="member-family__linkto link-to"></a>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>
