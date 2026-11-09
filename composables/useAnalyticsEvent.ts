// Sends a Google Analytics event: only in the browser, only when the site has a GA ID, and only after the visitor
// pressed "Accept" in the cookie banner. nuxt-gtag's own useTrackEvent does not look at the consent, so it is not used.
// Before the GA script is loaded the event waits in window.dataLayer and goes out with it.
import type { AnalyticsEventName } from "~/utils/analytics-events";

export function useAnalyticsEvent() {
    const id = useRuntimeConfig().public.gtag?.id;
    const { choice } = useCookieConsent();
    const { gtag } = useGtag();

    return {
        track(name: AnalyticsEventName) {
            if (!import.meta.client || !id || choice.value !== "granted") return;
            gtag("event", name);
        },
    };
}
