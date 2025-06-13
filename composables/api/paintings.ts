import type { Picture } from '@/types/picture'

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

export async function fetchAllPictures(locale: string): Promise<void> {
    const config = useRuntimeConfig();

    try {
        const res = await $fetch<StrapiPictureResponse>(`${config.public.STRAPI_URL}/pictures`, {
            params: {
                locale,
                populate: '*',
            },
        });

        console.log('All pictures:', res.data);
    } catch (e) {
        console.error('Ошибка при получении всех картин:', e);
    }
}
