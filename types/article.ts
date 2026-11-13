import type { Picture } from "./picture";

export type Article = {
    documentId: string;
    title: string;
    slug: string;
    theme: "aboutPictures" | "interview" | "exhibitions" | "inspiration";
    previewText: string;
    image: ImageWithMeta;
    publishedAt: string;
    // last change in the CMS (detail requests only)
    updatedAt?: string;
    body?: BlogBlock[];
    // slug of every locale the article is visible in (detail requests only)
    localizedSlugs?: Record<string, string>;
}

export type BlogBlock =
    | HeadingBlock
    | TextBlock
    | PictureGalleryBlock
    | PictureLinkBlock
    | ArticleLinkBlock
    | PageLinkBlock
    | TwoColumnsBlock;

export interface HeadingBlock {
    key: string;
    type: "heading";
    level: 2 | 3 | 4;
    text: string;
}

export interface TextBlock {
    key: string;
    type: "text";
    // the same text as plain lines (one paragraph per line)
    text: string;
    // formatted text: a restricted TipTap document (JSON nodes, not HTML)
    doc?: RichTextDoc;
}

export interface PictureGalleryBlock {
    key: string;
    type: "gallery";
    // all images in order, up to 12
    images: ImageWithMeta[];
}

// a painting of the catalog inside an article (its current state: price, sold or not)
export interface PictureLinkBlock {
    key: string;
    type: "picture_link";
    picture: Picture;
}

// another article of the blog inside an article
export interface ArticleLinkBlock {
    key: string;
    type: "article_link";
    article: Article;
}

// the pages of the site a link block can point to (the pageKey of the CMS)
export type PageKey =
    | "home"
    | "catalog"
    | "blog"
    | "about_artist"
    | "about_father"
    | "about_mother"
    | "about_oleksii_and_wife"
    | "contacts";

// the filters of the catalog page (the same names and values as its query string)
export type PageFilters = Partial<Record<"availability" | "pictureSize" | "pictureOrientation" | "price", string[]>>;

export interface PageLinkBlock {
    key: string;
    type: "page_link";
    pageKey: PageKey;
    filters: PageFilters | null;
    // null: the author left it empty, the site names the page itself
    label: string | null;
}

export type TwoColumnsTarget = { kind: "picture"; picture: Picture } | { kind: "article"; article: Article };

// a picture or an article beside a text
export interface TwoColumnsBlock {
    key: string;
    type: "two_columns";
    mediaSide: "left" | "right";
    target: TwoColumnsTarget;
    heading: string | null;
    doc?: RichTextDoc;
    text: string;
}

export interface ImageWithMeta {
    src: string
    alt: string
    caption: string
    // responsive copies and intrinsic size from the CMS
    srcset?: string
    width?: number
    height?: number
}

// TipTap document of a text block, as validated by the CMS:
// doc -> (paragraph | bulletList | orderedList)*, paragraph -> (text | hardBreak)*,
// list -> listItem+, listItem -> paragraph (paragraph | list)*; marks: bold, italic, link { href }
export type RichTextMark = { type: "bold" } | { type: "italic" } | { type: "link"; attrs: { href: string } };
export type RichTextInline = { type: "text"; text: string; marks?: RichTextMark[] } | { type: "hardBreak" };
export type RichTextParagraph = { type: "paragraph"; content?: RichTextInline[] };
export type RichTextList = { type: "bulletList" | "orderedList"; content: RichTextListItem[] };
export type RichTextListItem = { type: "listItem"; content: (RichTextParagraph | RichTextList)[] };
export type RichTextDoc = { type: "doc"; content: (RichTextParagraph | RichTextList)[] };
