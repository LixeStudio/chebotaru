<template>
  <div
    v-if="isPopUpOpened"
    class="contacts-popup"
    role="dialog"
    aria-labelledby="popup-title"
    aria-modal="true"
  >
    <div class="contacts-popup__overlay">
      <div class="contacts-popup__container">
        <button
          class="contacts-popup__close"
          :aria-label="t('popup.btnCloseAriaLabel')"
          @click="emit('togglePopup', 'close')"
        >
          <NuxtImg src="/images/icons/x-close.svg" width="24" height="24" />
        </button>
        <h2 id="popup-title" class="contacts-popup__title">
          {{ t("popup.title") }}
        </h2>
        <p class="contacts-popup__subtitle">
          {{ t("popup.subtitle") }}
        </p>
        <nav class="contacts-popup__nav">
          <ul class="contacts-popup__list">
            <li class="contacts-popup__item">
              <a href="#" class="contacts-popup__link">
                <NuxtImg
                  src="/images/icons/social/telegram-ico.svg"
                  :alt="t('popup.links.telegram.imgAlt')"
                  width="24"
                  height="24"
                />
                {{ t("popup.links.telegram.text") }}
              </a>
            </li>
            <li class="contacts-popup__item">
              <a href="#" class="contacts-popup__link">
                <NuxtImg
                  src="/images/icons/social/whatsapp-ico.svg"
                  :alt="t('popup.links.whatsapp.imgAlt')"
                  width="24"
                  height="24"
                />
                {{ t("popup.links.whatsapp.text") }}
              </a>
            </li>
            <li class="contacts-popup__item">
              <a href="#" class="contacts-popup__link">
                <NuxtImg
                  src="/images/icons/social/mail-ico.svg"
                  :alt="t('popup.links.email.imgAlt')"
                  width="24"
                  height="24"
                />
                {{ t("popup.links.email.text") }}
              </a>
            </li>
          </ul>
        </nav>
        <p class="contacts-popup__text">
          {{ t("popup.text") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["togglePopup"]);
defineProps({
  isPopUpOpened: Boolean,
});
const { t } = useI18n();
</script>
