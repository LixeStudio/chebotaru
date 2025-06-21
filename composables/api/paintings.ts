import qs from "qs";
import type { Picture } from "@/types/picture";
import { LazyPagesContactsHeroSection } from "#components";

type StrapiPictureRaw = {
  id: string | number;
  attributes: {
    slug: string;
    title: string;
    description?: string;
    createdAt: string;
    publishedAt?: string;
    orientation: "vertical" | "horizontal" | "square";
    availability: "available" | "sold";
    price: number;

    imageWithMeta: {
      id: number;
      alt: string;
      caption: string;
      image: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
    };

    details: {
      year: string;
      size: string;
      material: string;
      style: string;
    };
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
      availability: "available" | "sold";
      orientation?: "vertical" | "horizontal" | "square";
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
  const strapiUrl = config.public.STRAPI_URL;
  const queryObj = {
    filters: { slug: { $eq: slug } },
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
    locale: locale || "uk", // Явно
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

    return mappedPicture;
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

    return res.data.map((raw: StrapiPictureRaw) =>
      mapStrapiPicture(raw, strapiUrl)
    );
  } catch (e) {
    console.error("Ошибка при получении всех картин:", e);
  }
  return [];
}

function mapStrapiPicture(raw: StrapiPictureRaw, strapiUrl: string): Picture {
  const { id, attributes } = raw;
  return {
    id: id,
    slug: attributes.slug,
    title: attributes.title,
    description: attributes.description,
    createdAt: attributes.createdAt,
    publishedAt: attributes.publishedAt,

    image: {
      src: strapiUrl + attributes.imageWithMeta?.image.data.attributes.url, // из вложенного image
      alt: attributes.imageWithMeta?.alt || "", // отдельное поле
      caption: attributes.imageWithMeta?.caption || "",
    },

    details: {
      year: attributes.details?.year || "",
      size: attributes.details?.size || "",
      material: attributes.details?.material || "",
      style: attributes.details?.style || "",
    },

    price: attributes.price,
    availability: attributes.availability,
    orientation: attributes.orientation,
  };
}
