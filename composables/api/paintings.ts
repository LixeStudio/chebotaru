import qs from "qs";
import type { Picture } from "@/types/picture";


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
        image: {
            url: string;
        };
    },

    details: {
        year: string;
        size: string;
        material: string;
        style: string;
        sizeInSm: string;
    };

};


export async function fetchPictureByDocumentId(
    documentId: string,
    locale: string
): Promise<Picture | null> {
    const config = useRuntimeConfig();
    const strapiUrl = config.public.STRAPI_URL;
    const queryObj = {
        filters: { documentId: { $eq: documentId } },
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
        },
        locale: locale || "en",
    };

    const query = qs.stringify(queryObj, {
        encodeValuesOnly: true,
    });


    try {
        const res: { data: StrapiPictureRaw[] } = await $fetch(
            `${config.public.STRAPI_URL}/api/pictures?${query}`
        );

        const raw = res.data?.[0];

        if (!raw) return null;
        const mappedPicture = mapStrapiPicture(raw, strapiUrl);
        console.log(mappedPicture);

        return mappedPicture ?? null;
    } catch (e) {
        console.error("Ошибка при запросе картины по slug:", e);
        return null;
    }
}

export async function fetchAllPictures(locale: string): Promise<Picture[]> {
    const config = useRuntimeConfig();
    const strapiUrl = config.public.STRAPI_URL;
    const query = qs.stringify(
        {
            locale,
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
            `${config.public.STRAPI_URL}/api/pictures?${query}`
        );

        const mappedData = res.data.map((raw: StrapiPictureRaw) =>
            mapStrapiPicture(raw, strapiUrl)
        );

        return mappedData

    } catch (e) {
        console.error("Ошибка при получении всех картин:", e);
    }
    return [];
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
            src: strapiUrl + raw.imageWithMeta.image?.url || "", // из вложенного image
            alt: raw.imageWithMeta?.alt || "", // отдельное поле
            caption: raw.imageWithMeta?.caption || "",
        },
        details: {
            year: raw.details?.year || "",
            size: raw.details?.size || "",
            material: raw.details?.material || "",
            style: raw.details?.style || "",
            sizeInSm: raw.details.sizeInSm || "",
        },

        price: raw.price,
        availability: raw.availability,
        orientation: raw.orientation,
    };
}
