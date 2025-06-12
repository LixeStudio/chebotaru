<template>
  <div
    class="contacts-popup"
    role="dialog"
    aria-labelledby="popup-title"
    aria-modal="true"
  >
    <div class="contacts-popup__overlay">
      <div class="contacts-popup__container">
        <button class="contacts-popup__close" aria-label="Закрыть окно">
          <img src="./public/images/icons/x-close.svg" width="24" height="24" />
        </button>
        <h2 class="contacts-popup__title" id="popup-title">
          Рад, что вас зацепила эта работа!
        </h2>
        <p class="contacts-popup__subtitle">
          Чтобы обсудить покупку или задать вопрос — просто напишите мне удобным
          способом:
        </p>
        <nav class="contacts-popup__nav">
          <ul class="contacts-popup__list">
            <li class="contacts-popup__item">
              <a href="#" class="contacts-popup__link">
                <img
                  src="./public/images/icons/social/telegram-ico.svg"
                  alt="Написать в Telegram"
                  width="24"
                  height="24"
                />
                Написать в Telegram
              </a>
            </li>
            <li class="contacts-popup__item">
              <a href="#" class="contacts-popup__link">
                <img
                  src="./public/images/icons/social/whatsapp-ico.svg"
                  alt="Написать в WhatsApp"
                  width="24"
                  height="24"
                />
                Написать в WhatsApp
              </a>
            </li>
            <li class="contacts-popup__item">
              <a href="#" class="contacts-popup__link">
                <img
                  src="./public/images/icons/social/mail-ico.svg"
                  alt="Написать на email"
                  width="24"
                  height="24"
                />
                Отправить письмо на email
              </a>
            </li>
          </ul>
        </nav>
        <p class="contacts-popup__text">
          Я отвечаю лично и всегда открыт к диалог
        </p>
      </div>
    </div>
  </div>
</template>

<script setup></script>
