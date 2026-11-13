import type { BlogBlock, PageFilters, PageKey, RichTextDoc, TwoColumnsTarget } from "@/types/article";
import type { CmsImage } from "./media.ts";
import { mapArticle, mapImage, type CmsArticleItem } from "./articleItem.ts";
import { mapPicture, type CmsPictureItem } from "./pictureItem.ts";

// The blocks of an article of the Chebotaru CMS Public API (GET /articles/{documentId}) as the site shows them.
// Pure functions (no Nuxt): tests/article-blocks.test.ts.

export type CmsBlock =
    | { key: string; type: "heading"; level: 2 | 3 | 4; text: string }
    | { key: string; type: "text"; doc: RichTextDoc; text: string }
    | { key: string; type: "gallery"; images: CmsImage[] }
    | { key: string; type: "picture_link"; picture: CmsPictureItem }
    | { key: string; type: "article_link"; article: CmsArticleItem }
    | { key: string; type: "page_link"; pageKey: PageKey; filters: PageFilters | null; label: string | null }
    | {
          key: string;
          type: "two_columns";
          mediaSide: "left" | "right";
          target: { kind: "picture"; picture: CmsPictureItem } | { kind: "article"; article: CmsArticleItem };
          heading: string | null;
          doc: RichTextDoc;
          text: string;
      };

// the pages a page_link points to: their routes (pages/) and the name of each in the menu translations
export const PAGE_LINKS: Record<PageKey, { path: string; nameKey: string }> = {
    home: { path: "/", nameKey: "header.burger.content.links.home" },
    catalog: { path: "/catalog", nameKey: "header.burger.content.links.catalog" },
    blog: { path: "/blog", nameKey: "header.burger.content.links.blog" },
    about_artist: { path: "/about-artist", nameKey: "header.burger.content.links.aboutAuthor" },
    about_father: { path: "/about-father", nameKey: "footer.links.family.father" },
    about_mother: { path: "/about-mother", nameKey: "footer.links.family.mother" },
    about_oleksii_and_wife: { path: "/about-oleksii-and-wife", nameKey: "footer.links.family.brother" },
    contacts: { path: "/contacts", nameKey: "header.burger.content.links.contactUs" },
};

// the filters in the order the catalog writes them to its address
const CATALOG_FILTER_ORDER = ["price", "pictureSize", "pictureOrientation", "availability"] as const;

// The address of a page_link without the language prefix (the component adds it): the catalog filters are written
// as the catalog itself does, e.g. /catalog?pictureSize=small,large&availability=available. null: an unknown page.
export function pageLinkPath(pageKey: string, filters: PageFilters | null | undefined): string | null {
    const page = PAGE_LINKS[pageKey as PageKey];
    if (!page) return null;
    if (pageKey !== "catalog" || !filters) return page.path;
    const parts = CATALOG_FILTER_ORDER.flatMap((name) => {
        const values = (filters[name] || []).filter((value) => /^[a-z0-9-]+$/.test(value));
        return values.length ? [`${name}=${values.join(",")}`] : [];
    });
    return parts.length ? `${page.path}?${parts.join("&")}` : page.path;
}

type CmsTarget = Extract<CmsBlock, { type: "two_columns" }>["target"];

function mapTarget(target: CmsTarget | undefined, mediaBase: string): TwoColumnsTarget | null {
    if (target?.kind === "picture" && target.picture) return { kind: "picture", picture: mapPicture(target.picture, mediaBase) };
    if (target?.kind === "article" && target.article) return { kind: "article", article: mapArticle(target.article, mediaBase) };
    return null;
}

export function mapBlocks(blocks: CmsBlock[] | undefined, mediaBase: string): BlogBlock[] {
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
                case "picture_link":
                    // a block without its target is not shown (the CMS does not send such a block at all)
                    return block.picture
                        ? { key: block.key, type: "picture_link", picture: mapPicture(block.picture, mediaBase) }
                        : null;
                case "article_link":
                    return block.article
                        ? { key: block.key, type: "article_link", article: mapArticle(block.article, mediaBase) }
                        : null;
                case "page_link":
                    return pageLinkPath(block.pageKey, null) === null
                        ? null
                        : {
                              key: block.key,
                              type: "page_link",
                              pageKey: block.pageKey,
                              filters: block.filters || null,
                              label: block.label?.trim() || null,
                          };
                case "two_columns": {
                    const target = mapTarget(block.target, mediaBase);
                    if (!target) return null;
                    return {
                        key: block.key,
                        type: "two_columns",
                        mediaSide: block.mediaSide === "right" ? "right" : "left",
                        target,
                        heading: block.heading?.trim() || null,
                        text: block.text || "",
                        doc: block.doc,
                    };
                }
                default:
                    // new block types may be added by the CMS: skipped until the site supports them
                    return null;
            }
        })
        .filter((b): b is BlogBlock => b !== null);
}
