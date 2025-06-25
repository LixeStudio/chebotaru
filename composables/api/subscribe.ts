import type { FetchError } from 'ofetch';
export async function subscribe(email: string) {
  try {
    const config = useRuntimeConfig();
    await $fetch(`${config.public.STRAPI_URL}/api/subscribers`, {
      method: "POST",
      body: {
        data: { email },
      },
    });
    return { success: true };

  } catch (error) {
    const err = error as FetchError;
    console.error("Ошибка подписки:", error);
    const statusCode = err?.response?.status || err?.status;

    if (statusCode === 400) {
      return { success: false, type: "duplicate" };
    }

    return { success: false, type: "general" };
  }
}
