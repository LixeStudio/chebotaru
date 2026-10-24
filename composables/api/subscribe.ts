// Newsletter sign-up through the site's server route (server/api/subscribe.post.ts -> Chebotaru CMS).
// "accepted" is the same for a new and an already subscribed address: the site does not tell who is subscribed.
// `website` is the honeypot field of the form (empty for people).
export type SubscribeResult =
  | { success: true }
  | { success: false; type: "invalid" | "general" };

export async function subscribe(email: string, website = ""): Promise<SubscribeResult> {
  try {
    const result = await $fetch<{ status: "accepted" | "invalid" }>("/api/subscribe", {
      method: "POST",
      body: { email, ...(website ? { website } : {}) },
    });
    return result.status === "accepted" ? { success: true } : { success: false, type: "invalid" };
  } catch (error) {
    console.error("Ошибка подписки:", (error as { statusCode?: number })?.statusCode);
    return { success: false, type: "general" };
  }
}
