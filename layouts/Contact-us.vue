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
              class="contact-us__alert"
              :class="{ error: alert.type === 'error' }"
            >
              {{ alert.message }}
            </p>
            <button href="#" class="contact-us__subscribe btn-circle">
              {{ t("contactUs.btnSubscribe") }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { subscribe } from "@/composables/api/subscribe";
defineProps({
  showTitle: {
    type: Boolean,
    default: true,
  },
});
const { t } = useI18n();

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

const alertMessage = {
  error: t("pages.contacts.alert.errorMessage"),
  success: t("pages.contacts.alert.successMessage"),
  invalidEmail: t("pages.contacts.alert.invalidEmailMessage"),
};

const email = useState("contact-email", () => "");
const website = ref("");
const success = ref(false);
const alert = ref(null);
const handleSubmit = async () => {
  if (!email.value.trim()) {
    console.warn("Email is empty");
    return;
  }

  success.value = await subscribe(email.value, website.value);
  // keep the address when it has to be corrected or sent again
  if (success.value.success) email.value = "";
};

watch(success, () => {
  if (success.value.success === true)
    alert.value = {
      type: "success",
      message: alertMessage.success,
    };
  // an already subscribed address gets the same success message: the site does not reveal who is subscribed
  if (success.value.success === false && success.value.type === "invalid")
    alert.value = {
      type: "error",
      message: alertMessage.invalidEmail,
    };
  if (success.value.success === false && success.value.type === "general")
    alert.value = {
      type: "error",
      message: alertMessage.error,
    };
  setTimeout(() => {
    // null (not {}) so that v-if removes the empty alert paragraph
    alert.value = null;
  }, 3000);
});
</script>
