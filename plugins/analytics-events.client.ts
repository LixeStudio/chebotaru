/**
 * Contact clicks: one listener on the whole page, so the templates with the links stay as they are.
 * A click on a Telegram, WhatsApp, e-mail or Instagram link sends the matching contact_* event, and request_contact
 * as well when the link is inside the contacts popup (.contacts-popup). Links inside the text of an article do not count.
 */
import { contactEvent } from "~/utils/analytics-events";

export default defineNuxtPlugin(() => {
  const { track } = useAnalyticsEvent();

  document.addEventListener(
    "click",
    (event) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link || link.closest(".body__text-block")) return;
      const name = contactEvent(link.getAttribute("href") ?? "");
      if (!name) return;
      track(name);
      if (link.closest(".contacts-popup")) track("request_contact");
    },
    true,
  );
});
