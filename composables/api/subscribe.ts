// Newsletter sign-up through the site's server route (server/api/subscribe.post.ts -> Chebotaru CMS).
// "accepted" is the same for a new and an already subscribed address: the site does not tell who is subscribed.
// `website` is the honeypot field of the form (empty for people). `locale` is the language of the page: the CMS sends
// the letters in it. `consentVersion` is the version of the consent text under the button.
import { CONSENT_VERSION } from "~/utils/newsletter";

export type SubscribeResult =
  | { success: true }
  | { success: false; type: "invalid" | "rate_limited" | "general" };

export async function subscribe(email: string, locale: string, website = ""): Promise<SubscribeResult> {
  try {
    const result = await $fetch<{ status: "accepted" | "invalid" | "rate_limited" }>("/api/subscribe", {
      method: "POST",
      body: { email, locale, consentVersion: CONSENT_VERSION, ...(website ? { website } : {}) },
    });
    if (result.status === "accepted") return { success: true };
    return { success: false, type: result.status };
  } catch (error) {
    console.error("Ошибка подписки:", (error as { statusCode?: number })?.statusCode);
    return { success: false, type: "general" };
  }
}
