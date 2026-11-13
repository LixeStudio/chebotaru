import type { Currency, Picture } from "@/types/picture";
import { cmsMediaBase, type CmsImage } from "./media";
import { mapPicture, type CmsPictureItem } from "./pictureItem";
import {
    cmsFetch,
    fetchAllPages,
    fetchLocalizedDetail,
    type CmsList,
    type CmsLocale,
    type CmsPagination,
} from "./cms";

// Pictures of the Chebotaru CMS Public API: GET /pictures, /pictures/{documentId}, /pictures/{documentId}/related

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

export type CatalogPage = { pictures: Picture[]; total: number; page: number; pageSize: number; hasMore: boolean };

// One page of the catalog (pages 1..page together), filtered and sorted by the site's server (server/api/catalog.get.ts):
// only the works shown travel to the browser. Request errors are rethrown.
export async function fetchCatalogPage(locale: string, query: Record<string, string | undefined>): Promise<CatalogPage> {
    // read before the first await: after it the Nuxt instance (useRuntimeConfig) is not available during SSR
    const mediaBase = cmsMediaBase();
    const res = await $fetch<Omit<CatalogPage, "pictures"> & { items: CmsPictureItem[] }>("/api/catalog", { query: { ...query, locale } });
    return { pictures: res.items.map((raw) => mapPicture(raw, mediaBase)), total: res.total, page: res.page, pageSize: res.pageSize, hasMore: res.hasMore };
}

// the pictures of the home page: the newest available ones first, and if there are fewer than `limit`, the newest sold ones
// fill the rest. If the sold request fails, the available ones are still shown; an error of the first request leaves the section empty
export async function fetchLimitedPictures(locale: string, limit: number): Promise<Picture[]> {
    try {
        const available = (await fetchPictures(locale, { availability: "available", sort: "newest", pageSize: limit })).pictures;
        if (available.length >= limit) return available;
        try {
            const sold = (await fetchPictures(locale, { availability: "sold", sort: "newest", pageSize: limit - available.length })).pictures;
            return [...available, ...sold];
        } catch (e) {
            console.error("Ошибка при получении проданных картин для главной:", e);
            return available;
        }
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
    const photos = (result.data.images || []).map((image) => ({ ...mapCmsImage(image, mediaBase), alt: image.alt || "" }));
    picture.photos = photos.length ? photos : [picture.image];
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
