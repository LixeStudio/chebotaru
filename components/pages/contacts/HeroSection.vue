<template>
  <section class="hero">
    <div class="hero__container">
      <h1 class="hero__title">
        <span class="hero__title-line"
          >{{ t("pages.contacts.title.part1") }}
        </span>
        <span class="hero__title-line second">{{
          t("pages.contacts.title.part2")
        }}</span>
      </h1>
      <div class="hero__wrapper">
        <p class="hero__description">
          {{ t("pages.contacts.description") }}
        </p>
        <span class="hero__separator-line"></span>
        <nav class="hero__nav" :aria-label="t('pages.contacts.navAriaLabel')">
          <ul class="hero__links links-hero">
            <li class="links-hero__column">
              <div class="links-hero__mail">
                <p class="links-hero__title">
                  {{ t("pages.contacts.links.mail.title") }}
                </p>
                <a
                  href="mailto:chebotaru.a@gmail.com"
                  :aria-label="t('pages.contacts.links.mail.ariaLabel')"
                  class="links-hero__link"
                  >chebotaru.a@gmail.com</a
                >
              </div>
              <div class="links-hero__phone">
                <p class="links-hero__title">
                  {{ t("pages.contacts.links.phone.title") }}
                </p>
                <a
                  href="tel:380679884402"
                  :aria-label="t('pages.contacts.links.phone.ariaLabel')"
                  class="links-hero__link"
                  >+380679884402</a
                >
              </div>
            </li>
            <li class="links-hero__column">
              <p class="links-hero__title">
                {{ t("pages.contacts.links.social.title") }}
              </p>
              <a
                href="https://t.me/andriichebotaru"
                :aria-label="t('pages.contacts.links.social.telegramAriaLabel')"
                target="_blank"
                rel="noopener noreferrer"
                class="links-hero__link"
                >Telegram</a
              >
              <a
                href="https://wa.me/380679884402"
                :aria-label="t('pages.contacts.links.social.whatsappAriaLabel')"
                target="_blank"
                rel="noopener noreferrer"
                class="links-hero__link"
                >Whatsapp</a
              >
              <a
                href="https://www.instagram.com/chebotaru.a?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                :aria-label="
                  t('pages.contacts.links.social.instagramAriaLabel')
                "
                target="_blank"
                rel="noopener noreferrer"
                class="links-hero__link"
                >Instagram</a
              >
              <a
                href="https://youtube.com/@chebotaru.a?si=-xx3GsFYShWEUuJt"
                :aria-label="t('pages.contacts.links.social.youtubeAriaLabel')"
                target="_blank"
                rel="noopener noreferrer"
                class="links-hero__link"
                >Youtube</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
</script>
