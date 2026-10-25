<template>
  <section
    class="cookie-consent"
    role="region"
    :aria-label="t('cookieConsent.label')"
  >
    <p class="cookie-consent__text">
      {{ t("cookieConsent.text") }}
      <NuxtLink :to="localePath('/privacy')" class="cookie-consent__link">{{
        t("cookieConsent.policy")
      }}</NuxtLink>
    </p>
    <div class="cookie-consent__actions">
      <!-- both answers look the same: declining must be as easy as accepting -->
      <button
        ref="firstButton"
        type="button"
        class="btn-circle cookie-consent__btn"
        @click="decline"
      >
        {{ t("cookieConsent.decline") }}
      </button>
      <button
        type="button"
        class="btn-circle cookie-consent__btn"
        @click="accept"
      >
        {{ t("cookieConsent.accept") }}
      </button>
    </div>
  </section>
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
