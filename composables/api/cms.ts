import { FetchError } from "ofetch";

// Client of the Chebotaru CMS Public API v1 (Chebotaru-Admin docs/public-api-contract.md).
// Requests go through the site's own server route /api/cms/** (server/api/cms/[...path].get.ts).

// locales of the site (nuxt.config.ts i18n.locales); the CMS has no fallback between languages
export const SITE_LOCALES = ["en", "ru", "uk"] as const;
export const DEFAULT_LOCALE = "en";

// a documentId of the CMS (24 characters a-z0-9); anything else does not exist for the site
export const DOCUMENT_ID = /^[a-z0-9]{24}$/;

export type CmsLocale = { code: string; cmsCode: string; name?: string };

export type CmsPagination = { page: number; pageSize: number; total: number; totalPages: number };

export type CmsList<T> = {
    data: T[];
    meta: { locale: CmsLocale; pagination: CmsPagination };
};

export type CmsQuery = Record<string, string | number | undefined>;

export function cmsFetch<T>(route: string, query: CmsQuery = {}): Promise<T> {
    const params = Object.fromEntries(
        Object.entries(query).filter(([, value]) => value !== undefined && value !== "")
    );
    return $fetch(`/api/cms/${route}`, { query: params }) as Promise<T>;
}

// HTTP status and machine-readable CMS code of a failed request ({ code, availableLocales, ... } in `data`)
export function cmsError(error: unknown): { status?: number; code?: string; availableLocales?: CmsLocale[] } {
    if (!(error instanceof FetchError)) return {};
    const body = (error.data?.data ?? {}) as { code?: string; availableLocales?: CmsLocale[] };
    return { status: error.response?.status ?? error.statusCode, code: body.code, availableLocales: body.availableLocales };
}

// Every page of a list (pageSize 100 is the CMS maximum): the first page, then the rest in parallel.
export async function fetchAllPages<T>(route: string, query: CmsQuery): Promise<T[]> {
    const first = await cmsFetch<CmsList<T>>(route, { ...query, page: 1, pageSize: 100 });
    const rest = await Promise.all(
        Array.from({ length: first.meta.pagination.totalPages - 1 }, (_, i) =>
            cmsFetch<CmsList<T>>(route, { ...query, page: i + 2, pageSize: 100 })
        )
    );
    return [first, ...rest].flatMap((page) => page.data);
}

// the language to send a visitor to when a record is not translated to the requested one: the default
// language if the record is published in it, otherwise the first one in the order of the site
export function availableLocale(slugs: Record<string, string>): string {
    return [DEFAULT_LOCALE, ...SITE_LOCALES].find((l) => slugs[l]) || DEFAULT_LOCALE;
}

type LocalizedDetail ={ slug: string; availableLocales: CmsLocale[] };

export type DetailResult<T> =
    | { status: "ok"; data: T; slugs: Record<string, string> }
    // visible on other languages of the site, not on the requested one
    | { status: "other_locales"; slugs: Record<string, string> }
    | { status: "not_found" };

// One picture or article in the requested language, plus its slug in the other languages of the site
// (the API has no translations in the response, and every language has its own slug). All languages are
// requested at once, so the extra slugs do not add a round trip.
// Request failures other than "not found" are rethrown, so that an outage is not reported as 404.
export async function fetchLocalizedDetail<T extends LocalizedDetail>(
    collection: "pictures" | "articles",
    documentId: string,
    locale: string
): Promise<DetailResult<T>> {
    if (!DOCUMENT_ID.test(documentId)) return { status: "not_found" };

    const locales = [locale, ...SITE_LOCALES.filter((l) => l !== locale)];
    const results = await Promise.allSettled(
        locales.map((l) => cmsFetch<{ data: T }>(`${collection}/${documentId}`, { locale: l }))
    );
    const slugs: Record<string, string> = {};
    results.forEach((result, i) => {
        if (result.status === "fulfilled") slugs[locales[i]] = result.value.data.slug;
    });

    const [current] = results;
    if (current.status === "fulfilled") return { status: "ok", data: current.value.data, slugs };

    const { status, code } = cmsError(current.reason);
    if (code?.endsWith("_not_available_in_locale")) {
        if (Object.keys(slugs).length) return { status: "other_locales", slugs };
        const outage = results.find(
            (r) => r.status === "rejected" && ![400, 404].includes(cmsError(r.reason).status ?? 0)
        ) as PromiseRejectedResult | undefined;
        if (outage) throw outage.reason;
        return { status: "not_found" };
    }
    if (status === 404 || status === 400) return { status: "not_found" };
    throw current.reason;
}
