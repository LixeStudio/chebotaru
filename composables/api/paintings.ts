import type { Currency, Picture } from "@/types/picture";
import { mapCmsImage, cmsMediaBase, type CmsImage } from "./media";
import {
    cmsFetch,
    fetchAllPages,
    fetchLocalizedDetail,
    type CmsList,
    type CmsLocale,
    type CmsPagination,
} from "./cms";

// Pictures of the Chebotaru CMS Public API: GET /pictures, /pictures/{documentId}, /pictures/{documentId}/related

type CmsPictureItem = {
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

type CmsPictureDetail = CmsPictureItem & {
    description: string | null;
    images: (CmsImage & { isMain: boolean })[];
    availableLocales: CmsLocale[];
    updatedAt: string;
};

// filters, sorting and pages of GET /pictures (one value per filter; the price only together with a currency)
export type PictureQuery = {
    availability?: "available" | "sold";
    orientation?: "vertical" | "horizontal" | "square";
    size?: "small" | "middle" | "large";
    currency?: Currency;
    priceMin?: number;
    priceMax?: number;
    sort?: "newest" | "oldest" | "price_asc" | "price_desc";
    page?: number;
    pageSize?: number;
};

export async function fetchPictures(
    locale: string,
    query: PictureQuery = {}
): Promise<{ pictures: Picture[]; pagination: CmsPagination }> {
    // read before the first await: after it the Nuxt instance (useRuntimeConfig) is not available during SSR
    const mediaBase = cmsMediaBase();
    const res = await cmsFetch<CmsList<CmsPictureItem>>("pictures", { locale, ...query });
    return { pictures: res.data.map((raw) => mapPicture(raw, mediaBase)), pagination: res.meta.pagination };
}

// the whole catalog (all pages); request errors are rethrown
export async function fetchAllPictures(locale: string, query: Omit<PictureQuery, "page" | "pageSize"> = {}): Promise<Picture[]> {
    const mediaBase = cmsMediaBase();
    const items = await fetchAllPages<CmsPictureItem>("pictures", { locale, ...query });
    return items.map((raw) => mapPicture(raw, mediaBase));
}

// the newest pictures (home page); an API error leaves the section empty
export async function fetchLimitedPictures(locale: string, limit: number): Promise<Picture[]> {
    try {
        return (await fetchPictures(locale, { sort: "newest", pageSize: limit })).pictures;
    } catch (e) {
        console.error("Ошибка при получении лимитированных картин:", e);
        return [];
    }
}

export type PictureResult =
    | { status: "ok"; picture: Picture }
    | { status: "other_locales"; slugs: Record<string, string> }
    | { status: "not_found" };

// One picture with the slug of every language it is visible in. "not_found" = 404,
// "other_locales" = not translated to this language; request errors are rethrown (not reported as 404).
export async function fetchPictureByDocumentId(documentId: string, locale: string): Promise<PictureResult> {
    // read before the first await: after it the Nuxt instance (useRuntimeConfig) is not available during SSR
    const mediaBase = cmsMediaBase();
    const result = await fetchLocalizedDetail<CmsPictureDetail>("pictures", documentId, locale);
    if (result.status !== "ok") return result;

    const picture = mapPicture(result.data, mediaBase);
    picture.description = result.data.description;
    picture.localizedSlugs = result.slugs;
    return { status: "ok", picture };
}

// same orientation or size (both first), then newer; an API error leaves the section empty
export async function fetchRelatedPictures(documentId: string, locale: string, limit = 3): Promise<Picture[]> {
    // read before the first await: after it the Nuxt instance (useRuntimeConfig) is not available during SSR
    const mediaBase = cmsMediaBase();
    try {
        const res = await cmsFetch<{ data: CmsPictureItem[] }>(`pictures/${documentId}/related`, { locale, limit });
        return res.data.map((raw) => mapPicture(raw, mediaBase));
    } catch (e) {
        console.error("Ошибка при получении похожих картин", e);
        return [];
    }
}

function mapPicture(raw: CmsPictureItem, mediaBase: string): Picture {
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
