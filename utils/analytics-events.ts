// Names of the Google Analytics events the site sends, and which of them a link belongs to.
// Pure code with no Nuxt imports, so it runs in the unit tests (tests/analytics-events.test.ts).
// Events carry no parameters: the painting and the language are read from the page address in GA,
// and no e-mail address or other personal data is ever sent.

export type ContactEventName = "contact_telegram" | "contact_whatsapp" | "contact_email" | "contact_instagram";

export type AnalyticsEventName =
    | ContactEventName
    | "request_buy"
    | "request_similar"
    | "request_contact"
    | "photo_open"
    | "newsletter_subscribe";

const CONTACT_LINKS: readonly [RegExp, ContactEventName][] = [
    [/^https?:\/\/t\.me\//i, "contact_telegram"],
    [/^https?:\/\/wa\.me\//i, "contact_whatsapp"],
    [/^mailto:/i, "contact_email"],
    [/^https?:\/\/(www\.)?instagram\.com\//i, "contact_instagram"],
];

/** The contact event for a link address, or null for any other link. */
export function contactEvent(href: string): ContactEventName | null {
    const address = href.trim();
    for (const [pattern, name] of CONTACT_LINKS) {
        if (pattern.test(address)) return name;
    }
    return null;
}
