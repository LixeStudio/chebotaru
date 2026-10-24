// Responsive image data from a CMS media object.
// Strapi stores resized copies (small 500w, medium 750w, large 1000w) next to the original;
// the original stays the `src` (used by the lightbox) and the largest `srcset` candidate,
// so the browser only downloads a smaller copy where it looks identical.

type StrapiFormat = { url: string; width: number; height: number };

export type StrapiMedia = {
    url: string;
    width?: number;
    height?: number;
    formats?: Record<string, StrapiFormat | undefined> | null;
};

export type ResponsiveMedia = {
    src: string;
    srcset?: string;
    width?: number;
    height?: number;
};

const RESPONSIVE_FORMATS = ["small", "medium", "large"];

export function mapStrapiMedia(media: StrapiMedia | null | undefined, strapiUrl: string): ResponsiveMedia {
    if (!media?.url) return { src: "" };

    const candidates = RESPONSIVE_FORMATS
        .map((name) => media.formats?.[name])
        .filter((f): f is StrapiFormat => !!f?.url && !!f.width && (!media.width || f.width < media.width))
        .map((f) => `${strapiUrl}${f.url} ${f.width}w`);
    if (candidates.length && media.width) candidates.push(`${strapiUrl}${media.url} ${media.width}w`);

    return {
        src: strapiUrl + media.url,
        srcset: candidates.length > 1 ? candidates.join(", ") : undefined,
        width: media.width,
        height: media.height,
    };
}
