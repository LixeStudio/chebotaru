import qs from "qs";
import type { Picture } from "@/types/picture";

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

  try {
    const res = await $fetch<StrapiPictureResponse>(
      `${config.public.STRAPI_URL}/pictures`,
      {
        params: {
          filters: { slug: { $eq: slug } },
          locale,
          populate: "*",
        },
      }
    );

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
        src: raw.attributes.image?.url ?? "",
        alt: raw.attributes.image?.alternativeText ?? "",
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
