// Responsive image data from a CMS image.
// The CMS serves WebP files of every image with their exact pixel size: `large` (url), `medium` (up to 1200 px,
// for cards) and `thumb` (thumbnail.url, up to 480 px). All go into srcset, so the browser downloads the smallest
// that looks identical on its screen; `large` is the src (fallback). Pictures also have `full` (up to 2560 px), only for the
// full-screen view. URLs are relative to the CMS address and carry a version token (?v=), so they are used
// exactly as received.

export type CmsImageFile = { url: string; width: number; height: number };

export type CmsImage = CmsImageFile & {
    thumbnail?: CmsImageFile | null;
    // the card copy of lists (up to 1200 px): what a dense phone screen takes instead of the large file
    medium?: CmsImageFile | null;
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
    // every distinct width once, smallest first: thumb (480), medium (1200), large
    const widths = new Map<number, string>();
    for (const file of [image.thumbnail, image.medium, image]) {
        if (file?.url && file.width && file.width <= image.width && !widths.has(file.width)) widths.set(file.width, base + file.url);
    }
    const srcset =
        widths.size > 1
            ? [...widths].sort(([a], [b]) => a - b).map(([width, url]) => `${url} ${width}w`).join(", ")
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
