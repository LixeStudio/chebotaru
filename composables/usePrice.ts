// Price as stored in the CMS, with the sign of its currency in front ("$1800", "€450", "₴12000").
// The CMS does not convert currencies, so the currency always comes with the price.
const CURRENCY_SIGNS: Record<string, string> = { USD: "$", EUR: "€", UAH: "₴" };

export const formatPrice = (price: number | null | undefined, currency: string | undefined): string => {
    if (price === null || price === undefined) return "";
    return `${CURRENCY_SIGNS[currency || "USD"] ?? `${currency} `}${price}`;
};
