import type { Article, BlogBlock, RichTextDoc } from "@/types/article";
import { mapCmsImage, cmsMediaBase, type CmsImage } from "./media";
import {
    cmsFetch,
    fetchAllPages,
    fetchLocalizedDetail,
    type CmsList,
    type CmsLocale,
    type CmsPagination,
} from "./cms";

// Blog of the Chebotaru CMS Public API: GET /articles, /articles/{documentId}, /articles/{documentId}/related

type Theme = Article["theme"];

type CmsArticleItem = {
    documentId: string;
    slug: string;
    title: string;
    theme: Theme;
    previewText: string;
    publishedAt: string;
    cover: CmsImage;
};

type CmsBlock =
    | { key: string; type: "heading"; level: 2 | 3 | 4; text: string }
    | { key: string; type: "text"; doc: RichTextDoc; text: string }
    | { key: string; type: "gallery"; images: CmsImage[] };

type CmsArticleDetail = CmsArticleItem & {
    blocks: CmsBlock[];
    availableLocales: CmsLocale[];
    updatedAt: string;
};

// themes (one or several), sorting and pages of GET /articles
export type ArticleQuery = {
    theme?: Theme[];
    sort?: "newest" | "oldest";
    page?: number;
    pageSize?: number;
};

const toCmsQuery = ({ theme, ...rest }: ArticleQuery) => ({
    ...rest,
    theme: theme?.length ? theme.join(",") : undefined,
});

export async function fetchArticles(
    locale: string,
    query: ArticleQuery = {}
): Promise<{ articles: Article[]; pagination: CmsPagination }> {
    // read before the first await: after it the Nuxt instance (useRuntimeConfig) is not available during SSR
    const mediaBase = cmsMediaBase();
    const res = await cmsFetch<CmsList<CmsArticleItem>>("articles", { locale, ...toCmsQuery(query) });
    return { articles: res.data.map((raw) => mapArticle(raw, mediaBase)), pagination: res.meta.pagination };
}

// the whole blog (all pages, newest first); request errors are rethrown
export async function fetchAllArticles(locale: string, query: Omit<ArticleQuery, "page" | "pageSize"> = {}): Promise<Article[]> {
    const mediaBase = cmsMediaBase();
    const items = await fetchAllPages<CmsArticleItem>("articles", { locale, ...toCmsQuery(query) });
    return items.map((raw) => mapArticle(raw, mediaBase));
}

// the newest articles (home page); an API error leaves the section empty
export async function fetchLimitedArticles(locale: string, limit: number): Promise<Article[]> {
    try {
        return (await fetchArticles(locale, { sort: "newest", pageSize: limit })).articles;
    } catch (e) {
        console.error("Ошибка при получении лимитированных статей:", e);
        return [];
    }
}

export type ArticleResult =
    | { status: "ok"; article: Article }
    | { status: "other_locales"; slugs: Record<string, string> }
    | { status: "not_found" };

// One article with all its blocks and the slug of every language it is visible in. "not_found" = 404,
// "other_locales" = not translated to this language; request errors are rethrown (not reported as 404).
export async function fetchArticlesByDocumentId(documentId: string, locale: string): Promise<ArticleResult> {
    // read before the first await: after it the Nuxt instance (useRuntimeConfig) is not available during SSR
    const mediaBase = cmsMediaBase();
    const result = await fetchLocalizedDetail<CmsArticleDetail>("articles", documentId, locale);
    if (result.status !== "ok") return result;

    const article = mapArticle(result.data, mediaBase);
    article.body = mapBlocks(result.data.blocks, mediaBase);
    article.localizedSlugs = result.slugs;
    return { status: "ok", article };
}

// the latest other articles in this language; an API error leaves the section empty
export async function fetchRelatedArticles(documentId: string, locale: string, limit = 3): Promise<Article[]> {
    // read before the first await: after it the Nuxt instance (useRuntimeConfig) is not available during SSR
    const mediaBase = cmsMediaBase();
    try {
        const res = await cmsFetch<{ data: CmsArticleItem[] }>(`articles/${documentId}/related`, { locale, limit });
        return res.data.map((raw) => mapArticle(raw, mediaBase));
    } catch (e) {
        console.error("Ошибка при получении похожих статей", e);
        return [];
    }
}

function mapImage(image: CmsImage | null | undefined, mediaBase: string) {
    return {
        ...mapCmsImage(image, mediaBase),
        alt: image?.alt || "",
        caption: image?.caption || "",
    };
}

function mapBlocks(blocks: CmsBlock[] | undefined, mediaBase: string): BlogBlock[] {
    return (blocks || [])
        .map((block): BlogBlock | null => {
            switch (block.type) {
                case "heading":
                    return { key: block.key, type: "heading", level: block.level, text: block.text };
                case "text":
                    return { key: block.key, type: "text", text: block.text || "", doc: block.doc };
                case "gallery":
                    return {
                        key: block.key,
                        type: "gallery",
                        images: (block.images || []).map((image) => mapImage(image, mediaBase)),
                    };
                default:
                    // new block types may be added by the CMS: skipped until the site supports them
                    return null;
            }
        })
        .filter((b): b is BlogBlock => b !== null);
}

function mapArticle(raw: CmsArticleItem, mediaBase: string): Article {
    return {
        documentId: raw.documentId,
        slug: raw.slug,
        title: raw.title,
        image: mapImage(raw.cover, mediaBase),
        theme: raw.theme,
        publishedAt: raw.publishedAt || "",
        previewText: raw.previewText || "",
    };
}
