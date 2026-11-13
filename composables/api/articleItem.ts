import type { Article } from "@/types/article";
import { mapCmsImage, type CmsImage } from "./media.ts";

// An article card of the Chebotaru CMS Public API (the blog list, the article itself, the "related" list and
// the article inside a link block)

export type CmsArticleItem = {
    documentId: string;
    slug: string;
    title: string;
    theme: Article["theme"];
    previewText: string;
    publishedAt: string;
    cover: CmsImage;
};

export function mapImage(image: CmsImage | null | undefined, mediaBase: string) {
    return {
        ...mapCmsImage(image, mediaBase),
        alt: image?.alt || "",
        caption: image?.caption || "",
    };
}

export function mapArticle(raw: CmsArticleItem, mediaBase: string): Article {
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
