<template>
  <section class="contact-us">
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
import { ref, watch } from "vue";
import { subscribe } from "@/composables/api/subscribe";
defineProps({
  showTitle: {
    type: Boolean,
    default: true,
  },
});
const { t } = useI18n();

const alertMessage = {
  error: t("pages.contacts.alert.errorMessage"),
  success: t("pages.contacts.alert.successMessage"),
  errorEmail: t("pages.contacts.alert.errorEmailMessage"),
};

const email = useState("contact-email", () => "");
const success = ref(false);
const alert = ref(null);
const handleSubmit = async () => {
  if (!email.value.trim()) {
    console.warn("Email is empty");
    return;
  }

  success.value = await subscribe(email.value);
  email.value = "";
};

watch(success, () => {
  if (success.value.success === true)
    alert.value = {
      type: "success",
      message: alertMessage.success,
    };
  if (success.value.success === false && success.value.type === "duplicate")
    alert.value = {
      type: "error",
      message: alertMessage.errorEmail,
    };
  if (success.value.success === false && success.value.type === "general")
    alert.value = {
      type: "error",
      message: alertMessage.error,
    };
  setTimeout(() => {
    alert.value = {};
  }, 3000);
});
</script>
