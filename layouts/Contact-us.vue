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
defineProps({
  showTitle: {
    type: Boolean,
    default: true,
  },
});
const { t } = useI18n();

const email = useState("contact-email", () => "");

const handleSubmit = () => {
  if (!email.value.trim()) {
    console.warn("Email is empty");
    return;
  }

  console.log("Submitted email:", email.value);
  email.value = "";
};
</script>
