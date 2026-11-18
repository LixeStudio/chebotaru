<template>
  <div class="newsletter-page">
    <Header />
    <main class="main">
      <div class="newsletter-page__content">
        <!-- the e-mail address and the token only exist in the browser: the server renders just this placeholder card -->
        <section
          v-if="view === 'loading'"
          class="newsletter-card"
          :aria-label="t('newsletter.preferences.loading')"
          aria-busy="true"
        >
          <div class="newsletter-card__skeleton" aria-hidden="true">
            <span class="newsletter-card__bar newsletter-card__bar--title"></span>
            <span class="newsletter-card__bar"></span>
            <span class="newsletter-card__bar newsletter-card__bar--wide"></span>
            <span class="newsletter-card__bar newsletter-card__bar--wide"></span>
            <span class="newsletter-card__bar newsletter-card__bar--button"></span>
          </div>
        </section>

        <form
          v-else-if="view === 'form'"
          class="newsletter-card"
          novalidate
          @submit.prevent="save"
        >
          <div class="newsletter-card__heading">
            <h1 class="newsletter-card__title">
              {{ t("newsletter.preferences.title") }}
            </h1>
            <p class="newsletter-card__text">
              {{ t("newsletter.preferences.email", { email: current?.email }) }}
            </p>
          </div>
          <hr class="newsletter-card__divider" />
          <fieldset class="newsletter-card__topics">
            <legend class="newsletter-card__lead">
              {{ t("newsletter.preferences.choose") }}
            </legend>
            <div class="newsletter-card__topic">
              <label class="checkbox newsletter-card__check">
                <input v-model="form.catalog" type="checkbox" :disabled="busy" />
                <span class="checkbox__custom"></span>
                {{ t("newsletter.preferences.catalogName") }}
              </label>
              <p class="newsletter-card__hint">
                {{ t("newsletter.preferences.catalogDesc") }}
              </p>
            </div>
            <div class="newsletter-card__topic">
              <label class="checkbox newsletter-card__check">
                <input v-model="form.blog" type="checkbox" :disabled="busy" />
                <span class="checkbox__custom"></span>
                {{ t("newsletter.preferences.blogName") }}
              </label>
              <p class="newsletter-card__hint">
                {{ t("newsletter.preferences.blogDesc") }}
              </p>
            </div>
          </fieldset>
          <div class="newsletter-card__actions">
            <button type="submit" class="newsletter-card__button" :disabled="busy">
              {{ t("newsletter.preferences.save") }}
            </button>
            <p v-if="notice" class="newsletter-card__notice" role="status">
              {{ t("newsletter.preferences.saved") }}
            </p>
            <p
              v-if="saveFailed"
              class="newsletter-card__notice newsletter-card__notice--error"
              role="alert"
            >
              {{ t("newsletter.preferences.saveError") }}
            </p>
            <button
              type="button"
              class="newsletter-card__link"
              :disabled="busy"
              @click="unsubscribeAll"
            >
              {{ t("newsletter.preferences.unsubscribe") }}
            </button>
          </div>
        </form>

        <section v-else-if="view === 'unsubscribed'" class="newsletter-card">
          <div class="newsletter-card__heading">
            <span class="newsletter-card__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 12.5 4 4 8-9" /></svg>
            </span>
            <h1 class="newsletter-card__title">
              {{ t("newsletter.preferences.unsubscribedTitle") }}
            </h1>
            <p class="newsletter-card__text">
              {{ t("newsletter.preferences.unsubscribedText") }}
            </p>
          </div>
          <NuxtLink :to="localePath('/')" class="newsletter-card__button">
            {{ t("newsletter.preferences.back") }}
          </NuxtLink>
        </section>

        <section v-else-if="view === 'updated'" class="newsletter-card">
          <div class="newsletter-card__heading">
            <span class="newsletter-card__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 12.5 4 4 8-9" /></svg>
            </span>
            <h1 class="newsletter-card__title">
              {{ t("newsletter.preferences.updatedTitle") }}
            </h1>
            <div class="newsletter-card__text newsletter-card__lines">
              <p v-for="line in updatedLines" :key="line.topic">
                {{ t(`newsletter.preferences.${line.change}.${line.topic}`) }}
              </p>
            </div>
          </div>
          <NuxtLink :to="localePath('/')" class="newsletter-card__button">
            {{ t("newsletter.preferences.back") }}
          </NuxtLink>
        </section>

        <section v-else-if="view === 'invalid'" class="newsletter-card">
          <div class="newsletter-card__heading">
            <h1 class="newsletter-card__title">
              {{ t("newsletter.preferences.invalidTitle") }}
            </h1>
            <p class="newsletter-card__text">
              {{ t("newsletter.preferences.invalidText") }}
            </p>
          </div>
          <NuxtLink :to="localePath('/')" class="newsletter-card__button">
            {{ t("newsletter.preferences.back") }}
          </NuxtLink>
        </section>

        <section v-else class="newsletter-card">
          <div class="newsletter-card__heading">
            <h1 class="newsletter-card__title">
              {{ t("newsletter.preferences.loadErrorTitle") }}
            </h1>
            <p class="newsletter-card__text">
              {{ t("newsletter.preferences.loadErrorText") }}
            </p>
          </div>
          <button type="button" class="newsletter-card__button" @click="load">
            {{ t("newsletter.preferences.retry") }}
          </button>
        </section>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { saveOutcome } from "@/utils/newsletter";
import Header from "@/layouts/Header.vue";

const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));
const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;

// The link in an e-mail carries a secret token: keep the page out of search results and out of the sitemap, and do not
// send the address (with the token) as the Referer when the visitor leaves. The token stays in the address bar, so that
// a reload keeps working. Google Analytics gets the page without the query (plugins/gtag.client.ts).
useHead({
  title: () => t("seo.newsletter.title"),
  meta: [
    { name: "description", content: () => t("seo.newsletter.description") },
    { name: "robots", content: "noindex, nofollow" },
    { name: "referrer", content: "no-referrer" },
  ],
});

// loading | form | unsubscribed | updated | invalid | error
const view = ref("loading");
const current = ref(null); // what the CMS has now: { email, blog, catalog }
const form = reactive({ blog: false, catalog: false });
const busy = ref(false);
const notice = ref(false);
const saveFailed = ref(false);
const updatedLines = ref([]);

const token = computed(() => {
  const value = route.query.token;
  return typeof value === "string" ? value : "";
});

const statusOf = (error) => error?.statusCode ?? error?.response?.status;

async function load() {
  if (!token.value) {
    view.value = "invalid";
    return;
  }
  view.value = "loading";
  try {
    const data = await $fetch("/api/newsletter/preferences", {
      query: { token: token.value },
    });
    current.value = data;
    form.blog = !!data.blog;
    form.catalog = !!data.catalog;
    view.value = "form";
  } catch (error) {
    view.value = statusOf(error) === 400 ? "invalid" : "error";
  }
}

// the request goes out from the browser only: the server render is the placeholder card
onMounted(load);

// one request at a time: the buttons are disabled while it runs, so a double click cannot send it twice
async function request(call) {
  if (busy.value) return;
  busy.value = true;
  notice.value = false;
  saveFailed.value = false;
  try {
    await call();
  } catch (error) {
    if (statusOf(error) === 400) view.value = "invalid";
    else saveFailed.value = true; // 429, 5xx or no network: the checkboxes stay as they were
  } finally {
    busy.value = false;
  }
}

function save() {
  return request(async () => {
    const after = { blog: form.blog, catalog: form.catalog };
    const before = { blog: !!current.value.blog, catalog: !!current.value.catalog };
    await $fetch("/api/newsletter/preferences", {
      method: "PUT",
      body: { token: token.value, ...after },
    });
    const outcome = saveOutcome(before, after);
    current.value = { ...current.value, ...after };
    if (outcome.kind === "saved") notice.value = true;
    else if (outcome.kind === "unsubscribed") view.value = "unsubscribed";
    else {
      updatedLines.value = outcome.lines;
      view.value = "updated";
    }
  });
}

function unsubscribeAll() {
  return request(async () => {
    await $fetch("/api/newsletter/unsubscribe", {
      method: "POST",
      body: { token: token.value },
    });
    view.value = "unsubscribed";
  });
}
</script>
