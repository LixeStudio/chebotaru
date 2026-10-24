/**
 * Splits gallery images into groups of up to four whose sizes differ by at most one
 * (5 -> [3, 2], 7 -> [4, 3], 9 -> [3, 3, 3], 12 -> [4, 4, 4]), as recommended by the CMS contract:
 * the article layout has rules for 1-4 images only.
 */
export function splitGallery<T>(images: T[], maxPerGroup = 4): T[][] {
    const groups = Math.ceil(images.length / maxPerGroup);
    if (groups === 0) return [];
    const base = Math.floor(images.length / groups);
    const extra = images.length % groups; // the first `extra` groups get one image more
    const result: T[][] = [];
    let start = 0;
    for (let index = 0; index < groups; index++) {
        const size = base + (index < extra ? 1 : 0);
        result.push(images.slice(start, start + size));
        start += size;
    }
    return result;
}
