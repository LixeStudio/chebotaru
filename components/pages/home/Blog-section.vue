<template>
  <section class="blog">
    <div class="blog__container">
      <div class="blog__content">
        <p class="blog__bg-text">
          {{ t("pages.home.blogSection.blogBgText") }}
        </p>
        <h2 class="blog__title">{{ t("pages.home.blogSection.blogTitle") }}</h2>
        <NuxtLink to="/blog" class="blog__link btn-circle">
          {{ t("pages.home.blogSection.blogLink") }}
        </NuxtLink>
      </div>
      <div class="blog__articles articles-blog">
        <article class="articles-blog__article article-card">
          <div class="articles-blog__image article-card__image">
            <img
              src="/assets/images/pages/home/picture_2.jpg"
              alt="image of chebotaru"
              width="392"
              height="300"
            />
          </div>
          <h3 class="articles-blog__title article-card__title">
            Новая коллекция картин: Вдохновение природой
          </h3>
          <p class="articles-blog__text article-card__text">
            Недавно я завершил серию картин, вдохновленных природой. В этой
            коллекции я попытался передать всю мощь и красоту окружающего мира.
            Подробнее о процессе создания..
          </p>
          <span
            class="articles-blog__separator-line article-card__separator-line"
          ></span>
          <div class="articles-blog__bottom article-card__bottom">
            <p class="articles-blog__theme article-card__theme">О картинах</p>
            <p class="articles-blog__date article-card__date">11 ноября</p>
            <a
              href="#"
              class="articles-blog__linkto article-card__linkto link-to"
            ></a>
          </div>
        </article>
        <article class="articles-blog__article article-card">
          <div class="articles-blog__image article-card__image">
            <img
              src="/assets/images/pages/home/picture_2.jpg"
              alt="image of chebotaru"
              width="392"
              height="300"
            />
          </div>
          <h3 class="articles-blog__title article-card__title">
            Новая коллекция картин: Вдохновение природой
          </h3>
          <p class="articles-blog__text article-card__text">
            Недавно я завершил серию картин, вдохновленных природой. В этой
            коллекции я попытался передать всю мощь и красоту окружающего мира.
            Подробнее о процессе создания..
          </p>
          <span
            class="articles-blog__separator-line article-card__separator-line"
          ></span>
          <div class="articles-blog__bottom article-card__bottom">
            <p class="articles-blog__theme article-card__theme">О картинах</p>
            <p class="articles-blog__date article-card__date">11 ноября</p>
            <a
              href="./blog.html"
              class="articles-blog__linkto article-card__linkto link-to"
            >
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
</script>
