<template>
  <section
    ref="sectionRef"
    class="contact-us"
    :class="{ 'contact-us--bg-ready': backgroundsReady }"
  >
    <div class="contact-us__container">
      <div class="contact-us__bg" aria-hidden="true"></div>

      <h2 v-if="showTitle" class="contact-us__title">
        <span class="contact-us__line">{{ t("contactUs.title.part1") }} </span>
        <span class="contact-us__line second">{{
          t("contactUs.title.part2")
        }}</span>
      </h2>
      <div class="contact-us__wrapper">
        <div class="contact-us__content">
          <h3 class="contact-us__pretitle">
            {{ t("contactUs.pretitle") }}
          </h3>
          <p class="contact-us__text">
            {{ t("contactUs.text") }}
          </p>
          <form
            class="contact-us__form"
            novalidate
            @submit.prevent="handleSubmit"
          >
            <label for="email" class="contact-us__label">Email </label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="contact-us__input"
              :placeholder="t('contactUs.form.inputPlaceholder')"
              autocomplete="email"
              required
              aria-label="Email address"
            />
            <!-- honeypot: hidden from people and screen readers, bots fill it; the CMS then stores nothing -->
            <input
              v-model="website"
              type="text"
              name="website"
              class="visually-hidden"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
            />
            <p
              v-if="alert"
              :key="alert.message"
              class="contact-us__alert"
              :class="{ error: alert.type === 'error' }"
            >
              {{ alert.message }}
            </p>
            <button
              type="submit"
              class="contact-us__subscribe btn-circle"
              :disabled="sending"
            >
              {{ t("contactUs.btnSubscribe") }}
            </button>
            <p class="contact-us__consent">
              <i18n-t keypath="contactUs.consent.text" tag="span">
                <template #policy>
                  <NuxtLink :to="localePath('/privacy')">{{
                    t("contactUs.consent.policy")
                  }}</NuxtLink>
                </template>
              </i18n-t>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { subscribe } from "@/composables/api/subscribe";
defineProps({
  showTitle: {
    type: Boolean,
    default: true,
  },
});
const { t, locale } = useI18n();
const { track } = useAnalyticsEvent();

// The painting behind this section (up to ~1 MB) and the flowers are CSS backgrounds, which a browser downloads at once,
// competing with the first screen of every page. They are switched on (assets/scss/components/_contact-us.scss) only
// when the section is within about one screen of the viewport.
const sectionRef = ref(null);
const backgroundsReady = ref(false);
let observer = null;
onMounted(() => {
  if (!("IntersectionObserver" in window) || !sectionRef.value) {
    backgroundsReady.value = true;
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        backgroundsReady.value = true;
        observer?.disconnect();
      }
    },
    { rootMargin: "100% 0px 100% 0px" }
  );
  observer.observe(sectionRef.value);
});
onBeforeUnmount(() => observer?.disconnect());

const localePath = useLocalePath();

const email = useState("contact-email", () => "");
const website = ref("");
const alert = ref(null);
const sending = ref(false);
let alertTimer = 0;
const showAlert = (type, message) => {
  alert.value = { type, message };
  clearTimeout(alertTimer);
  // null (not {}) so that v-if removes the empty alert paragraph
  alertTimer = window.setTimeout(() => (alert.value = null), 6000);
};
onBeforeUnmount(() => clearTimeout(alertTimer));

const handleSubmit = async () => {
  if (!email.value.trim() || sending.value) return;
  sending.value = true;
  const result = await subscribe(email.value, locale.value, website.value);
  sending.value = false;
  if (result.success) {
    // an already subscribed address gets the same message: the site does not reveal who is subscribed
    email.value = "";
    track("newsletter_subscribe");
    showAlert("success", t("contactUs.form.success"));
    return;
  }
  // the address stays in the field so that it can be corrected or sent again
  const messages = {
    invalid: t("contactUs.form.invalidEmail"),
    rate_limited: t("contactUs.form.rateLimited"),
    general: t("pages.contacts.alert.errorMessage"),
  };
  showAlert("error", messages[result.type]);
};
</script>
