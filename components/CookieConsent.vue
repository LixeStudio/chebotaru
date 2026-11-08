<template>
  <div class="cookie-consent-layer">
    <!-- dims the page as in the design; the page stays scrollable and clickable under it -->
    <div class="cookie-consent-backdrop" aria-hidden="true" />
    <section
      class="cookie-consent"
      role="region"
      aria-labelledby="cookie-consent-title"
    >
      <div class="cookie-consent__body">
        <h2 id="cookie-consent-title" class="cookie-consent__title">
          {{ t("cookieConsent.title") }}
        </h2>
        <p class="cookie-consent__text">
          {{ t("cookieConsent.text") }}
          <NuxtLink :to="localePath('/privacy')" class="cookie-consent__link">{{
            t("cookieConsent.policy")
          }}</NuxtLink>
        </p>
      </div>
      <div class="cookie-consent__actions">
        <!-- the same size and the same yellow frame: declining stays as easy to see as accepting -->
        <button
          ref="firstButton"
          type="button"
          class="btn-circle cookie-consent__btn cookie-consent__btn--accept"
          @click="accept"
        >
          {{ t("cookieConsent.accept") }}
        </button>
        <button
          type="button"
          class="btn-circle cookie-consent__btn"
          @click="decline"
        >
          {{ t("cookieConsent.decline") }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useCookieConsent } from "@/composables/useCookieConsent";

// Loaded only when the banner is shown (app.vue): visitors who already answered download none of it.
// Fixed over the page, so it never moves the content (no layout shift); styles in _cookie-consent.scss.
const { t } = useI18n();
const localePath = useLocalePath();
const { choice, accept, decline } = useCookieConsent();
const firstButton = ref(null);

onMounted(() => {
  // reopened from "Cookie settings" in the footer: move the keyboard focus here; a first visit keeps it on the page
  if (choice.value) firstButton.value?.focus();
});
</script>
