export type Article = {
    id: string | number;
    documentId: string;
    title: string;
    slug: string;
    theme: "aboutPictures" | "interview" | "exhibitions" | "inspiration";
    previewText: string;
    image: ImageWithMeta;
    publishedAt: string;
    createdAt: string;
    body?: BlogBlock[];
}

export type BlogBlock =
    | TextBlock
    | HeadingH2
    | HeadingH3
    | HeadingH4
    | PictureGalleryBlock;


export interface TextBlock {
    __component: "blog.text-block";
    text: string;
}

export interface HeadingH2 {
    __component: "blog.heading-h2";
    text: string;
}
export interface HeadingH3 {
    __component: "blog.heading-h3";
    text: string;
}
export interface HeadingH4 {
    __component: "blog.heading-h4";
    text: string;
}

export interface PictureGalleryBlock {
    __component: "blog.picture-gallery-block";
    images: ImageWithMeta[];
}

export interface ImageWithMeta {
    src: string
    alt: string
    caption: string
}

