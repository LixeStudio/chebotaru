// Responsive image data from a CMS image.
// The CMS serves two WebP files of every image with their exact pixel size: `large` (url) and `thumb`
// (thumbnail.url, up to 480 px). Both go into srcset, so the browser downloads the small one where it
// looks identical; `large` is the src (fallback). Pictures also have `full` (up to 2560 px), only for the
// full-screen view. URLs are relative to the CMS address and carry a version token (?v=), so they are used
// exactly as received.

export type CmsImageFile = { url: string; width: number; height: number };

export type CmsImage = CmsImageFile & {
    thumbnail?: CmsImageFile | null;
    full?: CmsImageFile | null;
    alt?: string;
    caption?: string | null;
};

export type ResponsiveMedia = {
    src: string;
    srcset?: string;
    // the sharpest file for the full-screen view (falls back to src)
    full?: string;
    width?: number;
    height?: number;
};

export function mapCmsImage(image: CmsImage | null | undefined, mediaBase: string): ResponsiveMedia {
    if (!image?.url) return { src: "" };

    const base = mediaBase.replace(/\/+$/, "");
    const thumb = image.thumbnail;
    const srcset =
        thumb?.url && thumb.width && image.width && thumb.width < image.width
            ? `${base}${thumb.url} ${thumb.width}w, ${base}${image.url} ${image.width}w`
            : undefined;

    return {
        src: base + image.url,
        srcset,
        full: base + (image.full?.url || image.url),
        width: image.width,
        height: image.height,
    };
}

export function cmsMediaBase(): string {
    return String(useRuntimeConfig().public.cmsMediaBase || "");
}
