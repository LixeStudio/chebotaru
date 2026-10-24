// Page titles and meta descriptions built automatically from the CMS texts, so the client never has to think about SEO.
// Search engines show about 60 characters of a title and 70-160 of a description.

export const TITLE_MAX = 60;
export const DESCRIPTION_MIN = 70;
export const DESCRIPTION_MAX = 160;

const clean = (text: string) => text.replace(/\s+/g, " ").trim();
// letters and digits only: "Title." and "title" are the same line
const comparable = (text: string) => text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const endsSentence = (text: string) => /[.!?…]$/.test(text);

/** Cuts at a word boundary to at most `max` characters, with "…" when something was cut. */
export function truncate(text: string, max: number): string {
    const value = clean(text);
    if (value.length <= max) return value;
    const cut = value.slice(0, max - 1);
    const space = cut.lastIndexOf(" ");
    const head = space > max * 0.6 ? cut.slice(0, space) : cut;
    return head.replace(/[\s,.;:—–-]+$/u, "") + "…";
}

/** The name with the site suffix (" — blog by …") when both fit in 60 characters, otherwise the name alone. */
export function seoTitle(name: string, suffix: string, max = TITLE_MAX): string {
    const base = clean(name);
    if ((base + suffix).length <= max) return base + suffix;
    return truncate(base, max);
}

/**
 * A description of 70-160 characters from the given texts in order (lines of each are separate sentences): lines that
 * repeat the title or an earlier line are skipped; when the texts are too short, the fallback sentence is added.
 */
export function seoDescription(
    parts: unknown[],
    { exclude = [], fallback = "", min = DESCRIPTION_MIN, max = DESCRIPTION_MAX }: { exclude?: string[]; fallback?: string; min?: number; max?: number } = {}
): string {
    const seen = new Set(exclude.map(comparable));
    let text = "";
    const add = (line: string) => {
        text = text ? `${text}${endsSentence(text) ? "" : "."} ${line}` : line;
    };
    outer: for (const part of parts) {
        // anything that is not text (an unexpected field from the CMS) is skipped, never breaks the page
        if (typeof part !== "string") continue;
        for (const raw of part.split("\n")) {
            const line = clean(raw.replace(/^(•|\d+\.)\s+/, ""));
            const key = comparable(line);
            if (!key || seen.has(key)) continue;
            seen.add(key);
            add(line);
            if (text.length >= max) break outer;
        }
    }
    if (text.length < min && fallback && !seen.has(comparable(fallback))) add(clean(fallback));
    return truncate(text, max);
}
