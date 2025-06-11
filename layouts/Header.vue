<template>
  <header
    ref="headerRef"
    :class="['header', { sticky: isSticky, 'white-theme': isWhiteTheme }]"
  >
    <div class="header__container">
      <button
        class="burger"
        :class="{ active: isOpened }"
        :aria-expanded="isOpened.toString()"
        :aria-label="
          t(
            isOpened
              ? 'header.burger.btnAriaLabel.opened'
              : 'header.burger.btnAriaLabel.closed'
          )
        "
        @click="toggleMenu"
      >
        <span class="burger__line"></span>
        <span class="burger__line"></span>
        <span class="burger__line"></span>
      </button>

      <nav
        class="burger-content"
        :class="{ active: isOpened }"
        :aria-label="t('header.burger.content.navAriaLabel')"
        :aria-hidden="(!isOpened).toString()"
      >
        <div class="burger-content__inner header__container">
          <div class="burger-content__panel">
            <div
              class="burger-content__languages"
              role="navigation"
              :aria-label="t('header.burger.content.languagesAriaLabel')"
            >
              <button
                :class="{ choosed: locale === 'uk' }"
                @click="switchLanguage('uk')"
                lang="uk"
              >
                УКР
              </button>
              <button
                :class="{ choosed: locale === 'ru' }"
                @click="switchLanguage('ru')"
                lang="ru"
              >
                РУС
              </button>
              <button
                :class="{ choosed: locale === 'en' }"
                @click="switchLanguage('en')"
                lang="en"
              >
                ENG
              </button>
            </div>
            <ul class="burger-content__list">
              <li class="burger-conent__li">
                <NuxtLink class="burger-content__link" :to="localePath('/')">{{
                  t("header.burger.content.links.home")
                }}</NuxtLink>
              </li>
              <li class="burger-conent__li">
                <NuxtLink
                  class="burger-content__link"
                  :to="localePath('/catalog')"
                  >{{ t("header.burger.content.links.catalog") }}</NuxtLink
                >
              </li>
              <li class="burger-conent__li">
                <NuxtLink
                  class="burger-content__link"
                  :to="localePath('/about-artist')"
                  >{{ t("header.burger.content.links.aboutAuthor") }}</NuxtLink
                >
              </li>
              <li class="burger-conent__li">
                <NuxtLink class="burger-content__link" to="/blog">{{
                  t("header.burger.content.links.blog")
                }}</NuxtLink>
              </li>
              <li class="burger-conent__li">
                <NuxtLink
                  class="burger-content__link"
                  :to="localePath('/contacts')"
                  >{{ t("header.burger.content.links.contactUs") }}</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <NuxtLink
        to="/"
        class="header__logo"
        :class="{ 'opacity-0': isLogoHidden && !isLogoVisible }"
        :aria-label="t('header.logo.linkAriaLabel')"
      >
        <img
          src="/assets/images/logo.svg"
          :alt="t('header.logo.imgAlt')"
          width="237"
          height="49"
          loading="lazy"
          decoding="async"
        />
      </NuxtLink>

      <div class="header__social">
        <a
          class="header__social-link tg"
          href="https://t.me/andriichebotaru"
          :aria-label="t('header.social.telegramAriaLabel')"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15.7678 7.72921C16.2017 7.56994 16.4176 7.51291 16.5361 7.49216C16.5371 7.53167 16.5366 7.56179 16.5346 7.58254C16.3649 9.39296 15.6193 13.8471 15.2359 15.9198C15.1466 16.405 15.0778 16.6361 14.6139 16.3605C14.3095 16.1791 14.0344 15.9509 13.7388 15.7553C12.7693 15.1116 11.382 14.1538 11.4962 14.2116C10.542 13.5745 10.9415 13.1849 11.4742 12.6649C11.5598 12.5812 11.6498 12.4938 11.7376 12.4012C11.7771 12.3597 11.9696 12.179 12.2403 11.9234C13.1096 11.1056 14.7895 9.52407 14.832 9.3411C14.8393 9.31147 14.8451 9.19888 14.78 9.14036C14.7142 9.08109 14.6169 9.1011 14.5473 9.11739C14.4483 9.14011 12.8693 10.1967 9.81033 12.2871C9.36253 12.5982 8.95668 12.7498 8.59279 12.7419L8.59645 12.7442C8.11718 12.573 7.63938 12.4256 7.15939 12.2775C6.84131 12.1808 6.52423 12.0808 6.20818 11.9775L5.98282 11.9049C9.29522 10.4441 11.5013 9.48259 12.6069 9.01665C14.2122 8.34033 15.1649 7.95144 15.7678 7.72921ZM17.5407 6.30102C17.385 6.17612 17.2034 6.0885 17.0095 6.04472C16.8632 6.00916 16.7241 5.99805 16.6195 6.00027C16.2705 6.0062 15.8966 6.1062 15.2688 6.33658C14.6286 6.57214 13.6452 6.97511 12.0449 7.64846C10.9157 8.12403 8.67132 9.10282 5.31185 10.5848C5.01625 10.7041 4.74625 10.8397 4.5326 10.9997C4.33504 11.1486 4.05919 11.4145 4.0087 11.8219C3.97065 12.1301 4.05919 12.4145 4.23919 12.639C4.39577 12.8338 4.59625 12.9523 4.74918 13.0271C4.976 13.1382 5.28185 13.2353 5.55039 13.3205C5.96965 13.4538 6.38745 13.5894 6.80818 13.7197C8.10913 14.1227 9.18034 14.4546 10.3584 15.2413C11.2225 15.8176 12.0705 16.4191 12.9361 16.9939C13.2522 17.2035 13.5471 17.4443 13.8727 17.6384C14.2298 17.8495 14.682 18.0428 15.2337 17.9917C16.0663 17.9139 16.4995 17.1383 16.6751 16.1917C17.0563 14.1249 17.8144 9.60926 17.9922 7.72328C18.0084 7.50444 17.9993 7.28442 17.9651 7.06771C17.9218 6.76794 17.7706 6.49493 17.5407 6.30102Z"
            />
            <circle cx="12" cy="12" r="10.2" stroke-width="1.6" />
          </svg>
        </a>
        <a
          class="header__social-link"
          href="https://wa.me/380679884402"
          :aria-label="t('header.social.whatsappAriaLabel')"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.0498 4.90999C18.1329 3.9841 17.0408 3.24996 15.8373 2.75036C14.6338 2.25075 13.3429 1.99568 12.0398 1.99999C6.5798 1.99999 2.1298 6.44999 2.1298 11.91C2.1298 13.66 2.5898 15.36 3.4498 16.86L2.0498 22L7.2998 20.62C8.7498 21.41 10.3798 21.83 12.0398 21.83C17.4998 21.83 21.9498 17.38 21.9498 11.92C21.9498 9.26999 20.9198 6.77999 19.0498 4.90999ZM12.0398 20.15C10.5598 20.15 9.1098 19.75 7.8398 19L7.5398 18.82L4.4198 19.64L5.2498 16.6L5.0498 16.29C4.22735 14.9771 3.79073 13.4593 3.7898 11.91C3.7898 7.36999 7.4898 3.66999 12.0298 3.66999C14.2298 3.66999 16.2998 4.52999 17.8498 6.08999C18.6174 6.85386 19.2257 7.76254 19.6394 8.76332C20.0531 9.76411 20.264 10.8371 20.2598 11.92C20.2798 16.46 16.5798 20.15 12.0398 20.15ZM16.5598 13.99C16.3098 13.87 15.0898 13.27 14.8698 13.18C14.6398 13.1 14.4798 13.06 14.3098 13.3C14.1398 13.55 13.6698 14.11 13.5298 14.27C13.3898 14.44 13.2398 14.46 12.9898 14.33C12.7398 14.21 11.9398 13.94 10.9998 13.1C10.2598 12.44 9.7698 11.63 9.6198 11.38C9.4798 11.13 9.5998 11 9.7298 10.87C9.8398 10.76 9.9798 10.58 10.0998 10.44C10.2198 10.3 10.2698 10.19 10.3498 10.03C10.4298 9.85999 10.3898 9.71999 10.3298 9.59999C10.2698 9.47999 9.7698 8.25999 9.5698 7.75999C9.3698 7.27999 9.1598 7.33999 9.0098 7.32999H8.5298C8.3598 7.32999 8.0998 7.38999 7.8698 7.63999C7.6498 7.88999 7.0098 8.48999 7.0098 9.70999C7.0098 10.93 7.89981 12.11 8.0198 12.27C8.1398 12.44 9.7698 14.94 12.2498 16.01C12.8398 16.27 13.2998 16.42 13.6598 16.53C14.2498 16.72 14.7898 16.69 15.2198 16.63C15.6998 16.56 16.6898 16.03 16.8898 15.45C17.0998 14.87 17.0998 14.38 17.0298 14.27C16.9598 14.16 16.8098 14.11 16.5598 13.99Z"
            />
          </svg>
        </a>
        <a
          class="header__social-link"
          href="https://www.instagram.com/chebotaru.a?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          :aria-label="t('header.social.instagramAriaLabel')"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 17.7383 21.3889 19.2135 20.3012 20.3012C19.2135 21.3889 17.7383 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 6.26174 2.61107 4.78649 3.69878 3.69878C4.78649 2.61107 6.26174 2 7.8 2ZM7.6 4C6.64522 4 5.72955 4.37928 5.05442 5.05442C4.37928 5.72955 4 6.64522 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C17.3548 20 18.2705 19.6207 18.9456 18.9456C19.6207 18.2705 20 17.3548 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.5815 5.5 17.8995 5.6317 18.1339 5.86612C18.3683 6.10054 18.5 6.41848 18.5 6.75C18.5 7.08152 18.3683 7.39946 18.1339 7.63388C17.8995 7.8683 17.5815 8 17.25 8C16.9185 8 16.6005 7.8683 16.3661 7.63388C16.1317 7.39946 16 7.08152 16 6.75C16 6.41848 16.1317 6.10054 16.3661 5.86612C16.6005 5.6317 16.9185 5.5 17.25 5.5ZM12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z"
            />
          </svg>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useHeaderLogoVisibility } from "@/composables/useHeaderLogoVisibility";
import { useRoute, useRouter } from "vue-router";
const localePath = useLocalePath();
const { t, locale, setLocale } = useI18n();
const route = useRoute();
const router = useRouter();
const isWhiteTheme = useState("header-white-theme", () => false);
const isSticky = useState("header-is-sticky");
const isOpened = useState("burger-opened", () => false);
const toggleMenu = () => {
  isOpened.value = !isOpened.value;
};
const isLogoHidden = computed(
  () =>
    route.name?.toString().startsWith("index") ||
    route.path === "/" ||
    route.name?.toString().startsWith("about-artist")
);

const { isLogoVisible } = useHeaderLogoVisibility();

const switchLanguage = async (lang) => {
  if (locale.value === lang) return;

  const pathWithoutLocale = route.fullPath.replace(/^\/(ru|uk|en)/, "") || "/";
  await setLocale(lang);

  const isDefault = lang === "ru";
  const newPath = isDefault
    ? pathWithoutLocale
    : `/${lang}${pathWithoutLocale}`;

  router.replace({
    path: newPath,
    query: route.query,
    hash: route.hash,
  });
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/layout/header.scss";
</style>
