import qs from "qs";
import type { Picture } from "@/types/picture";
import { mapStrapiMedia, type StrapiMedia } from "./media";


type StrapiPictureRaw = {
    id: string | number;

    slug: string;
    title: string;
    description?: string;
    createdAt: string;
    publishedAt?: string;
    orientation: "vertical" | "horizontal" | "square";
    availability: "available" | "sold";
    price: number;
    documentId: string
    imageWithMeta: {
        id: number;
        alt: string;
        caption: string;
        image: StrapiMedia;
    },

    details: {
        year: string;
        size: string;
        material: string;
        style: string;
        sizeInSm: string;
    };

    localizations?: { slug: string; locale: string }[];
};


export async function fetchPictureByDocumentId(
    documentId: string,
    locale: string
): Promise<Picture | null> {
    const config = useRuntimeConfig();
    const strapiUrl = config.public.STRAPI_URL;
    const queryObj = {
        filters: { documentId: { $eq: documentId } },
        pagination: {
            pageSize: 150,
        },
        fields: [
            "title",
            "slug",
            "price",
            "orientation",
            "availability",
            "createdAt",
            "publishedAt",
        ],
        populate: {
            imageWithMeta: {
                populate: "*",
            },
            details: true,
            localizations: {
                fields: ["slug", "locale"],
            },
        },
        locale: locale || "en",
    };

    const query = qs.stringify(queryObj, {
        encodeValuesOnly: true,
    });


    // null = the picture does not exist in this locale (404);
    // request errors are rethrown so that an API outage is not reported as "not found"
    try {
        const res: { data: StrapiPictureRaw[] } = await $fetch(
            `${config.public.STRAPI_URL}/api/pictures?${query}`
        );

        const raw = res.data?.[0];

        if (!raw) return null;
        const mappedPicture = mapStrapiPicture(raw, strapiUrl);
        mappedPicture.localizedSlugs = {
            [locale]: raw.slug,
            ...Object.fromEntries((raw.localizations || []).map((l) => [l.locale, l.slug])),
        };

        return mappedPicture;
    } catch (e) {
        console.error("Ошибка при запросе картины по documentId:", e);
        throw e;
    }
}

// Strapi returns 25 entries per page by default and at most 100
const ALL_PICTURES_PAGE_SIZE = 100;

export async function fetchAllPictures(locale: string): Promise<Picture[]> {
    const config = useRuntimeConfig();
    const strapiUrl = config.public.STRAPI_URL;
    const pageQuery = (page: number) => qs.stringify(
        {
            locale,
            pagination: {
                page,
                pageSize: ALL_PICTURES_PAGE_SIZE,
            },
            fields: [
                "title",
                "slug",
                "price",
                "orientation",
                "availability",
                "createdAt",
                "publishedAt",
                "documentId"
            ],
            populate: {
                imageWithMeta: {
                    populate: "*",
                },
                details: true,
            },
        },
        {
            encodeValuesOnly: true,
        }
    );

    type PicturesPage = { data: StrapiPictureRaw[]; meta?: { pagination?: { pageCount?: number } } };
    const fetchPage = (page: number): Promise<PicturesPage> =>
        $fetch(`${config.public.STRAPI_URL}/api/pictures?${pageQuery(page)}`);

    // request errors are rethrown: the catalog must not pretend to be empty during an API outage
    try {
        const first = await fetchPage(1);
        const pageCount = first.meta?.pagination?.pageCount || 1;
        const rest = await Promise.all(
            Array.from({ length: pageCount - 1 }, (_, i) => fetchPage(i + 2))
        );

        return [first, ...rest]
            .flatMap((res) => res.data || [])
            .map((raw: StrapiPictureRaw) => mapStrapiPicture(raw, strapiUrl));
    } catch (e) {
        console.error("Ошибка при получении всех картин:", e);
        throw e;
    }
}

export async function fetchLimitedPictures(locale: string, limit: number): Promise<Picture[]> {
    const config = useRuntimeConfig();
    const strapiUrl = config.public.STRAPI_URL;

    const query = qs.stringify(
        {
            locale,
            pagination: {
                limit,
            },
            fields: [
                "title",
                "slug",
                "price",
                "orientation",
                "availability",
                "createdAt",
                "publishedAt",
                "documentId"
            ],
            populate: {
                imageWithMeta: {
                    populate: "*",
                },
                details: true,
            },
        },
        {
            encodeValuesOnly: true,
        }
    );

    try {
        const res: { data: StrapiPictureRaw[] } = await $fetch(
            `${strapiUrl}/api/pictures?${query}`
        );

        return res.data.map((raw: StrapiPictureRaw) =>
            mapStrapiPicture(raw, strapiUrl)
        );
    } catch (e) {
        console.error("Ошибка при получении лимитированных картин:", e);
    }

    return [];
}

export async function fetchRelatedPictures(picture: Picture, locale: string, limit = 3): Promise<Picture[]> {
    const config = useRuntimeConfig();
    const strapiUrl = config.public.STRAPI_URL;
    const query = qs.stringify(
        {
            locale,
            filters: {
                documentId: { $ne: picture.documentId },
                $or: [
                    { orientation: { $eq: picture.orientation } },
                    {
                        details: {
                            size: {
                                $eq: picture.details.size
                            }
                        }
                    }
                ],
            },
            populate: {
                imageWithMeta: {
                    populate: "*",
                },
                details: true,
            },
            pagination: {
                limit,
            },
        },
        { encodeValuesOnly: true }
    );


    try {
        const res: { data: StrapiPictureRaw[] } = await $fetch(
            `${config.public.STRAPI_URL}/api/pictures?${query}`
        );
        const mappedData = res.data.map((raw: StrapiPictureRaw) =>
            mapStrapiPicture(raw, strapiUrl)
        );
        return mappedData
    } catch (e) {
        console.error("Ошибка при получении похожих картин", e);
        return [];
    }
}



function mapStrapiPicture(raw: StrapiPictureRaw, strapiUrl: string): Picture {
    // const { id, attributes } = raw;
    return {
        id: raw.id,
        slug: raw.slug,
        title: raw.title,
        description: raw.description,
        createdAt: raw.createdAt,
        publishedAt: raw.publishedAt,
        documentId: raw.documentId,
        image: {
            ...mapStrapiMedia(raw.imageWithMeta?.image, strapiUrl), // src (оригинал), srcset, width, height
            alt: raw.imageWithMeta?.alt || "", // отдельное поле
            caption: raw.imageWithMeta?.caption || "",
        },
        details: {
            year: raw.details?.year || "",
            size: raw.details?.size || "",
            material: raw.details?.material || "",
            style: raw.details?.style || "",
            sizeInSm: raw.details?.sizeInSm || "",
        },

        price: raw.price,
        availability: raw.availability,
        orientation: raw.orientation,
    };
}
