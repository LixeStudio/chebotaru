// The visitor's answer to the cookie banner: Google Analytics loads only after "Accept" (plugins/gtag.client.ts).
// The answer lives in localStorage, not in a cookie, so the server-rendered HTML stays the same for everyone
// and the banner (components/CookieConsent.vue) is only decided in the browser.

export type ConsentChoice = "granted" | "denied";

const STORAGE_KEY = "chebotaru-cookie-consent";
// ask again after a year, as EU regulators recommend
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export function readStoredConsent(): ConsentChoice | null {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
        if (!saved || (saved.analytics !== "granted" && saved.analytics !== "denied")) return null;
        if (typeof saved.at !== "number" || Date.now() - saved.at > MAX_AGE_MS) return null;
        return saved.analytics;
    } catch {
        // private mode or blocked storage: ask again on every visit, analytics stays off until "Accept"
        return null;
    }
}

function storeConsent(choice: ConsentChoice) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics: choice, at: Date.now() }));
    } catch {
        // the choice still applies for this visit
    }
}

export function useCookieConsent() {
    // null = not answered yet (or not read yet: the server never knows)
    const choice = useState<ConsentChoice | null>("cookie-consent", () => null);
    const bannerOpen = useState<boolean>("cookie-consent-banner", () => false);
    // the banner and the footer link exist only when the site has a Google Analytics ID
    const analyticsEnabled = !!useRuntimeConfig().public.gtag?.id;

    const decide = (value: ConsentChoice) => {
        storeConsent(value);
        choice.value = value;
        bannerOpen.value = false;
    };

    return {
        choice,
        bannerOpen,
        analyticsEnabled,
        accept: () => decide("granted"),
        decline: () => decide("denied"),
        openSettings: () => {
            bannerOpen.value = true;
        },
    };
}
