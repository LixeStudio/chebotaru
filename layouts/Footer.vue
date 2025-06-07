<template>
  <footer class="footer">
    <div class="footer__container">
      <NuxtLink
        to="/"
        class="footer__logo"
        :aria-label="t('header.logo.linkAriaLabel')"
      >
        <img
          src="/assets/images/logo.svg"
          :alt="t('header.logo.imgAlt')"
          width="237"
          height="49"
          loading="lazy"
          decoding="async"
        />
      </NuxtLink>
      <nav class="footer__nav" aria-label="Основная навигация сайта">
        <ul class="footer__links links-footer">
          <li class="links-footer__column">
            <div class="links-footer__mail">
              <p class="links-footer__title">
                {{ t("footer.links.contacts.mail") }}
              </p>
              <a href="mailto:chebotaru.a@gmail.com" class="links-footer__link"
                >chebotaru.a@gmail.com</a
              >
            </div>
            <div class="links-footer__phone">
              <p class="links-footer__title">
                {{ t("footer.links.contacts.phone") }}
              </p>
              <a href="tel:380679884402" class="links-footer__link"
                >+380679884402</a
              >
            </div>
          </li>
          <li class="links-footer__column">
            <h3 class="links-footer__title">
              {{ t("footer.links.aboutAuthor.title") }}
            </h3>
            <NuxtLink to="/catalog" class="links-footer__link">{{
              t("footer.links.aboutAuthor.catalog")
            }}</NuxtLink>
            <NuxtLink to="/about-autho" class="links-footer__link">{{
              t("footer.links.aboutAuthor.aboutArtist")
            }}</NuxtLink>
            <NuxtLink to="/blog" class="links-footer__link">{{
              t("footer.links.aboutAuthor.blog")
            }}</NuxtLink>
            <NuxtLink to="/contacts" class="links-footer__link">{{
              t("footer.links.aboutAuthor.contacts")
            }}</NuxtLink>
          </li>
          <li class="links-footer__column">
            <h3 class="links-footer__title">
              {{ t("footer.links.family.title") }}
            </h3>
            <NuxtLink to="/about-mother" class="links-footer__link">{{
              t("footer.links.family.mother")
            }}</NuxtLink>
            <NuxtLink to="/about-father" class="links-footer__link">{{
              t("footer.links.family.father")
            }}</NuxtLink>
            <NuxtLink to="/" class="links-footer__link">{{
              t("footer.links.family.brother")
            }}</NuxtLink>
          </li>
          <li class="links-footer__column">
            <p class="links-footer__title">
              {{ t("footer.links.social.title") }}
            </p>
            <a
              href="https://t.me/andriichebotaru"
              target="_blank"
              rel="noopener noreferrer"
              class="links-footer__link"
              >Telegram</a
            >
            <a
              href="https://wa.me/380679884402"
              target="_blank"
              rel="noopener noreferrer"
              class="links-footer__link"
              >Whatsapp</a
            >
            <a
              href="https://www.instagram.com/chebotaru.a?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              class="links-footer__link"
              >Instagram</a
            >
            <a
              href="https://youtube.com/@chebotaru.a?si=-xx3GsFYShWEUuJt"
              target="_blank"
              rel="noopener noreferrer"
              class="links-footer__link"
              >Youtube</a
            >
          </li>
        </ul>
      </nav>
      <div class="footer__bottom">
        <p class="footer__copyright">Copyright (© 2025 Andrii Chebotaru)</p>
        <a href="#" class="footer__confidential-police">
          {{ t("footer.bottom.confidential-police") }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { t } = useI18n();
</script>
