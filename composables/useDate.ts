export const formatDate = (dateStr: string, locale: string): string => {
    const date = new Date(dateStr);
    const localesMap = {
        uk: "uk-UA",
        ru: "ru-RU",
        en: "en-GB",
    };

    const userLocale = localesMap[locale as keyof typeof localesMap] || "en-GB";
    return new Intl.DateTimeFormat(userLocale, {
        day: "numeric",
        month: "long",
    }).format(date);
};
