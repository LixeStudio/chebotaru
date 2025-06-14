import qs from 'qs';
import type { Picture } from '@/types/picture'

type StrapiPictureRaw = {
    id: string | number;
    slug: string;
    title: string;
    description?: string;
    createdAt: string;
    publishedAt?: string;
    orientation: 'vertical' | 'horizontal' | 'square';
    availability: 'available' | 'sold';
    price: number;

    imageWithMeta: {
        id: number;
        alt: string;
        caption: string;
        image: {
            url: string;
            alternativeText: string | null;
            caption: string | null;
        };
    };


    details: {
        year: string;
        size: string;
        material: string;
        style: string;
    };
};


interface StrapiPictureResponse {
    data: Array<{
        id: number | string;
        attributes: {
            title: string;
            slug: string;
            createdAt: string;
            publishedAt?: string;
            description: string;
            price: number;
            availability: 'available' | 'sold';
            orientation?: 'vertical' | 'horizontal' | 'square';
            year: string;
            size: string;
            material?: string;
            style: string;
            image: {
                url: string;
                alternativeText: string;
                caption: string;
            };
        };
    }>;
}

export async function fetchPictureBySlug(
    slug: string,
    locale: string
): Promise<Picture | null> {
    const config = useRuntimeConfig();

    try {
        const res = await $fetch<StrapiPictureResponse>(`${config.public.STRAPI_URL}/pictures`, {
            params: {
                filters: { slug: { $eq: slug } },
                locale,
                populate: '*',
            },
        });

        const raw = res.data?.[0];
        if (!raw) return null;

        return {
            id: raw.id,
            slug: raw.attributes.slug,
            title: raw.attributes.title,
            description: raw.attributes.description,
            createdAt: raw.attributes.createdAt,
            publishedAt: raw.attributes.publishedAt,
            image: {
                src: raw.attributes.image?.url ?? '',
                alt: raw.attributes.image?.alternativeText ?? '',
                caption: raw.attributes.image?.caption,
            },
            details: {
                year: raw.attributes.year,
                size: raw.attributes.size,
                material: raw.attributes.material,
                style: raw.attributes.style,
            },
            price: raw.attributes.price,
            availability: raw.attributes.availability,
            orientation: raw.attributes.orientation,
        };
    } catch (e) {
        console.error('Ошибка при запросе картины по slug:', e);
        return null;
    }
}



export async function fetchAllPictures(locale: string): Promise<Picture[]> {
    const config = useRuntimeConfig();
    const strapiUrl = config.public.STRAPI_URL;
    const query = qs.stringify({
        locale,
        fields: ['title', 'slug', 'price', 'orientation', 'availability', "createdAt", "publishedAt"],
        populate: {
            imageWithMeta: {
                populate: "*",
            },
            details: true,
        },
    }, {
        encodeValuesOnly: true,
    });

    try {
        const res: { data: StrapiPictureRaw[] } = await $fetch(`${config.public.STRAPI_URL}/api/pictures?${query}`);
        return res.data.map((raw: StrapiPictureRaw) => mapStrapiPicture(raw, strapiUrl))
    } catch (e) {
        console.error('Ошибка при получении всех картин:', e);
    }
    return [];
}






function mapStrapiPicture(raw: StrapiPictureRaw, strapiUrl: string): Picture {
    return {
        id: raw.id,
        slug: raw.slug,
        title: raw.title,
        description: raw.description,
        createdAt: raw.createdAt,
        publishedAt: raw.publishedAt,

        image: {
            src: strapiUrl + raw.imageWithMeta?.image.url, // из вложенного image
            alt: raw.imageWithMeta?.alt || '', // отдельное поле
            caption: raw.imageWithMeta?.caption || '',
        },

        details: {
            year: raw.details?.year || '',
            size: raw.details?.size || '',
            material: raw.details?.material || '',
            style: raw.details?.style || '',
        },

        price: raw.price,
        availability: raw.availability,
        orientation: raw.orientation,
    };
}