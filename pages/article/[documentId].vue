<template>
  <div v-if="article" class="article-page">
    <Header />
    <main class="main">
      <PreviewSection :article="article" :paragraphs="paragraphs" />
      <BodySection :body="article.body" />
      <relatedSection :related-articles="relatedArticles || []" />
      <ContactUs />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import PreviewSection from "@/components/pages/article/previewSection.vue";
import BodySection from "@/components/pages/article/bodySection.vue";
import relatedSection from "@/components/pages/article/relatedSection.vue";
import { usePageSeo } from "@/composables/usePageSeo";
import {
  fetchArticlesByDocumentId,
  fetchRelatedArticles,
} from "@/composables/api/articles";
const ContactUs = defineAsyncComponent(() =>
  import("@/layouts/Contact-us.vue")
);
const Footer = defineAsyncComponent(() => import("@/layouts/Footer.vue"));
const route = useRoute();
const { t, locale } = useI18n();
const localePath = useLocalePath();
const setI18nParams = useSetI18nParams();

const isWhiteTheme = useState("header-white-theme");
isWhiteTheme.value = false;

// the route param is "<documentId>-<slug>", only the documentId identifies the article
const documentId = computed(
  () => String(route.params.documentId || "").split("-")[0]
);

// the article and the related articles only depend on the documentId,
// so both requests run in parallel on the server
const [{ data: article, error }, { data: relatedArticles }] = await Promise.all([
  useAsyncData(
    () => `article-${documentId.value}-${locale.value}`,
    () => fetchArticlesByDocumentId(documentId.value, locale.value)
  ),
  useAsyncData(
    () => `article-related-${documentId.value}-${locale.value}`,
    () => fetchRelatedArticles({ documentId: documentId.value }, locale.value),
    { default: () => [] }
  ),
]);

if (error.value) {
  throw createError({
    statusCode: 503,
    statusMessage: "Article is temporarily unavailable",
    fatal: true,
  });
}
if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Article not found",
    fatal: true,
  });
}

const articlePath = (lang) => {
  if (!article.value) return documentId.value;
  const slug = article.value.localizedSlugs?.[lang] || article.value.slug;
  return `${article.value.documentId}-${slug}`;
};
const canonicalPath = computed(() =>
  localePath(`/article/${articlePath(locale.value)}`)
);

// an outdated or foreign-language slug permanently redirects to the canonical URL
if (decodeURIComponent(route.path) !== canonicalPath.value) {
  await navigateTo(
    { path: canonicalPath.value, query: route.query },
    { redirectCode: 301, replace: true }
  );
}

// language switcher and hreflang links use the slug of the target language
setI18nParams(
  Object.fromEntries(
    Object.keys(article.value.localizedSlugs || {}).map((lang) => [
      lang,
      { documentId: articlePath(lang) },
    ])
  )
);

const paragraphs = computed(() =>
  (article.value?.previewText || "").split("\n").filter((p) => p.trim().length)
);

// preview text of the article (its first line often repeats the title)
const description = computed(() => {
  const title = (article.value?.title || "").trim().replace(/\.$/, "");
  const text = paragraphs.value
    .filter((p) => p.trim().replace(/\.$/, "") !== title)
    .join(" ")
    .trim();
  if (!text) return t("seo.article.description");
  return text.length > 160 ? text.slice(0, 157).trimEnd() + "…" : text;
});

usePageSeo({
  title: () => (article.value?.title || "") + t("seo.article.title"),
  description,
  image: () => article.value?.image.src,
  type: "article",
  path: canonicalPath,
});
useSeoMeta({
  articlePublishedTime: () => article.value?.publishedAt || undefined,
});
</script>
<style lang="scss"></style>
