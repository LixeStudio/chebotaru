export async function subscribe(email: string) {
  try {
    const config = useRuntimeConfig();
    await $fetch(`${config.public.STRAPI_URL}/api/subscribers`, {
      method: "POST",
      body: {
        data: { email },
      },
    });
    return true;
  } catch (error) {
    console.error("Ошибка подписки:", error);
    return false;
  }
}
