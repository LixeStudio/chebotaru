export type Article = {
    documentId: string;
    title: string;
    slug: string;
    theme: "aboutPictures" | "interview" | "exhibitions" | "inspiration";
    previewText: string;
    image: ImageWithMeta;
    publishedAt: string;
    body?: BlogBlock[];
    // slug of every locale the article is visible in (detail requests only)
    localizedSlugs?: Record<string, string>;
}

export type BlogBlock = HeadingBlock | TextBlock | PictureGalleryBlock;

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
