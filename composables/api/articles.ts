import qs from "qs";
import type { Article, TextBlock, HeadingH2, HeadingH3, HeadingH4, BlogBlock, ImageWithMeta } from "@/types/article";


type StrapiArticleRaw = {
    id: string | number;
    slug: string;
    title: string;
    createdAt: string;
    publishedAt?: string;
    theme: "aboutPictures" | "interview" | "exhibitions" | "inspiration";
    documentId: string
    imageWithMeta: rawImageWithMeta,
    previewText: string,
    body?: rawBlogBlock[];
};

type rawBlogBlock =
    | TextBlock
    | HeadingH2
    | HeadingH3
    | HeadingH4
    | rawPictureGalleryBlock;

interface rawPictureGalleryBlock {
    __component: "blog.picture-gallery-block";
    imageWithMeta: rawImageWithMeta[];
}

interface rawImageWithMeta {
    id: number;
    alt: string;
    caption: string;
    image: {
        url: string;
    };
}




export async function fetchArticlesByDocumentId(
    documentId: string,
    locale: string
): Promise<Article | null> {
    const config = useRuntimeConfig();
    const strapiUrl = config.public.STRAPI_URL;
    const query = qs.stringify(
        {
            filters: { documentId: { $eq: documentId } },
            locale,
            fields: [
                "title",
                "slug",
                "theme",
                "previewText",
                "createdAt",
                "publishedAt",
                "documentId",
            ],
            populate: {
                imageWithMeta: {
                    populate: {
                        image: true,
                    },
                },
                body: {
                    on: {
                        "blog.text-block": true,
                        "blog.heading-h2": true,
                        "blog.heading-h3": true,
                        "blog.heading-h4": true,
                        "blog.picture-gallery-block": {
                            populate: {
                                imageWithMeta: {
                                    populate: {
                                        image: true,
                                    },
                                },
                            },
                        },
                    },
                },
            }
        },
        {
            encodeValuesOnly: true,
        }
    );


    try {
        const res: { data: StrapiArticleRaw[] } = await $fetch(
            `${config.public.STRAPI_URL}/api/blogs?${query}`
        );

        const raw = res.data?.[0];
        if (!raw) return null;
        console.log(raw);

        const mappedPicture = mapStrapiArticle(raw, strapiUrl);
        return mappedPicture ?? null;
    } catch (e) {
        console.error("Ошибка при запросе картины по slug:", e);
        return null;
    }
}

export async function fetchAllArticles(locale: string): Promise<Article[]> {
    const config = useRuntimeConfig();
    const strapiUrl = config.public.STRAPI_URL;
    const query = qs.stringify(
        {
            locale,
            fields: [
                "title",
                "slug",
                "theme",
                "previewText",
                "createdAt",
                "publishedAt",
                "documentId",
            ],
            populate: {
                imageWithMeta: {
                    populate: "*",
                },
            },
        },
        {
            encodeValuesOnly: true,
        }
    );

    try {
        const res: { data: StrapiArticleRaw[] } = await $fetch(
            `${config.public.STRAPI_URL}/api/blogs?${query}`
        );
        const mappedData = res.data.map((raw: StrapiArticleRaw) =>
            mapStrapiArticle(raw, strapiUrl)
        );
        return mappedData

    } catch (e) {
        console.error("Ошибка при получении всех картин:", e);
    }
    return [];
}

export async function fetchRelatedArticles(article: Article, locale: string, limit = 3): Promise<Article[]> {
    const config = useRuntimeConfig();
    const strapiUrl = config.public.STRAPI_URL;
    const query = qs.stringify(
        {
            locale,
            filters: {
                documentId: {
                    $ne: article.documentId,
                },
            },
            sort: ["publishedAt:desc"],
            pagination: {
                limit,
            },
            fields: [
                "title",
                "slug",
                "theme",
                "previewText",
                "createdAt",
                "publishedAt",
                "documentId",
            ],
            populate: {
                imageWithMeta: {
                    populate: "*",
                },
            },
        },
        {
            encodeValuesOnly: true,
        }
    );


    try {
        const res: { data: StrapiArticleRaw[] } = await $fetch(
            `${config.public.STRAPI_URL}/api/blogs?${query}`
        );
        const mappedData = res.data.map((raw: StrapiArticleRaw) =>
            mapStrapiArticle(raw, strapiUrl)
        );
        return mappedData

    } catch (e) {
        console.error("Ошибка при получении похожих картин", e);
        return [];
    }
}

export async function fetchLimitedArticles(locale: string, limit: number): Promise<Article[]> {
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
                "theme",
                "previewText",
                "createdAt",
                "publishedAt",
                "documentId",
            ],
            populate: {
                imageWithMeta: {
                    populate: "*",
                },
            },
        },
        {
            encodeValuesOnly: true,
        }
    );

    try {
        const res: { data: StrapiArticleRaw[] } = await $fetch(
            `${config.public.STRAPI_URL}/api/blogs?${query}`
        );

        const mappedData = res.data.map((raw: StrapiArticleRaw) =>
            mapStrapiArticle(raw, strapiUrl)
        );
        return mappedData
    } catch (e) {
        console.error("Ошибка при получении лимитированных статей:", e);
    }

    return [];
}

function mapBodyImages(body: rawBlogBlock[] | undefined, strapiUrl: string): BlogBlock[] {
    if (!body) return [];

    return body
        .map((block): BlogBlock | null => {
            switch (block.__component) {
                case "blog.text-block":
                case "blog.heading-h2":
                case "blog.heading-h3":
                case "blog.heading-h4":
                    return block;

                case "blog.picture-gallery-block":
                    return {
                        __component: block.__component,
                        images: block.imageWithMeta.map((img): ImageWithMeta => ({
                            src: strapiUrl + (img.image?.url || ""),
                            alt: img.alt || "",
                            caption: img.caption || "",
                        })),
                    };

                default:
                    console.warn("Неизвестный блок в статье:", block);
                    return null;
            }
        })
        .filter((b): b is BlogBlock => b !== null); // фильтруем null и уточняем тип
}

function mapStrapiArticle(raw: StrapiArticleRaw, strapiUrl: string): Article {
    return {
        id: raw.id,
        slug: raw.slug,
        title: raw.title,
        image: {
            src: strapiUrl + raw.imageWithMeta.image?.url || "",
            alt: raw.imageWithMeta?.alt || "",
            caption: raw.imageWithMeta?.caption || "",
        },
        documentId: raw.documentId,
        theme: raw.theme,
        createdAt: raw.createdAt,
        publishedAt: raw.publishedAt || "",
        previewText: raw.previewText,
        body: mapBodyImages(raw.body, strapiUrl),
    };
}

