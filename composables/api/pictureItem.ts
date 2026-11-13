import type { Currency, Picture } from "@/types/picture";
import { mapCmsImage, type CmsImage } from "./media.ts";

// A picture card of the Chebotaru CMS Public API (the catalog, the picture itself, the "related" list and the picture
// inside an article block). Relative imports carry the extension: node:test (tests/) loads this file as it is.

export type CmsPictureItem = {
    documentId: string;
    slug: string;
    title: string;
    price: number | null;
    currency: Currency;
    availability: "available" | "sold";
    orientation: "vertical" | "horizontal" | "square" | null;
    size: "small" | "middle" | "large" | null;
    widthCm: number | null;
    heightCm: number | null;
    year: number | null;
    material: string;
    style: string;
    publishedAt: string;
    image: CmsImage;
};

export function mapPicture(raw: CmsPictureItem, mediaBase: string): Picture {
    return {
        documentId: raw.documentId,
        slug: raw.slug,
        title: raw.title,
        publishedAt: raw.publishedAt,
        image: {
            ...mapCmsImage(raw.image, mediaBase), // src (large), srcset (thumb + large), width, height
            alt: raw.image?.alt || "",
            caption: raw.image?.caption || "",
        },
        details: {
            year: raw.year ? String(raw.year) : "",
            size: raw.size || "",
            material: raw.material || "",
            style: raw.style || "",
            sizeInSm: raw.widthCm && raw.heightCm ? `${raw.widthCm}x${raw.heightCm}` : "",
        },
        price: raw.price,
        currency: raw.currency,
        availability: raw.availability,
        orientation: raw.orientation,
    };
}
