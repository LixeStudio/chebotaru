// Unit tests of the CMS client (npm test): detail lookups across languages and the params of a missing translation.
// $fetch (a Nuxt global) is replaced by a fake that answers like server/api/cms does.
import { test } from "node:test";
import assert from "node:assert/strict";
import { FetchError } from "ofetch";
import { availableLocale, fetchLocalizedDetail, localizedRouteParams } from "../composables/api/cms.ts";

const ID = "zfqk4hccs9lj8bletxpeybjl";

type Answer = { slug: string } | { status: number; code?: string };

// a failed request as $fetch reports it: HTTP status + the H3 error body with the CMS body in `data`
function httpError(status: number, code?: string): FetchError {
    const error = new FetchError(`${status}`);
    Object.assign(error, { response: { status }, statusCode: status, data: { statusCode: status, data: code ? { code } : undefined } });
    return error;
}

// answers per language: a record ({ slug }) or an error ({ status, code })
function fakeCms(answers: Record<string, Answer>) {
    const calls: string[] = [];
    (globalThis as Record<string, unknown>).$fetch = async (url: string, options: { query: { locale: string } }) => {
        const { locale } = options.query;
        calls.push(`${url}?locale=${locale}`);
        const answer = answers[locale];
        if ("slug" in answer) return { data: { slug: answer.slug, availableLocales: [] } };
        throw httpError(answer.status, answer.code);
    };
    return calls;
}

const notInLocale = { status: 404, code: "picture_not_available_in_locale" };

test("a record visible in the requested language comes with the slug of every language", async () => {
    const calls = fakeCms({ en: { slug: "bay" }, ru: { slug: "zaliv" }, uk: notInLocale });
    const result = await fetchLocalizedDetail("pictures", ID, "en");
    assert.equal(result.status, "ok");
    assert.deepEqual(result.status === "ok" && result.slugs, { en: "bay", ru: "zaliv" });
    // all languages are requested at once (one round trip), each with its own locale
    assert.deepEqual(calls.sort(), [`/api/cms/pictures/${ID}?locale=en`, `/api/cms/pictures/${ID}?locale=ru`, `/api/cms/pictures/${ID}?locale=uk`]);
});

test("a missing translation is not a 404: it lists the languages the record exists in", async () => {
    fakeCms({ en: { slug: "bay" }, ru: { slug: "zaliv" }, uk: notInLocale });
    const result = await fetchLocalizedDetail("pictures", ID, "uk");
    assert.deepEqual(result, { status: "other_locales", slugs: { en: "bay", ru: "zaliv" } });
    assert.equal(availableLocale(result.status === "other_locales" ? result.slugs : {}), "en");
});

test("the redirect target prefers the default language, then the order of the site", () => {
    assert.equal(availableLocale({ ru: "a", uk: "b" }), "ru");
    assert.equal(availableLocale({ uk: "b" }), "uk");
    assert.equal(availableLocale({ uk: "b", en: "c" }), "en");
});

test("an unknown record and a malformed documentId are 404 (no request for a malformed id)", async () => {
    fakeCms({ en: { status: 404, code: "picture_not_found" }, ru: { status: 404, code: "picture_not_found" }, uk: { status: 404, code: "picture_not_found" } });
    assert.deepEqual(await fetchLocalizedDetail("pictures", ID, "en"), { status: "not_found" });

    const calls = fakeCms({ en: { slug: "x" }, ru: { slug: "x" }, uk: { slug: "x" } });
    assert.deepEqual(await fetchLocalizedDetail("articles", "not-a-document-id", "en"), { status: "not_found" });
    assert.equal(calls.length, 0);
});

test("a CMS outage is rethrown, never reported as not found", async () => {
    fakeCms({ en: { status: 503, code: "cms_unavailable" }, ru: { status: 503 }, uk: { status: 503 } });
    await assert.rejects(fetchLocalizedDetail("articles", ID, "en"), (error: FetchError) => error.statusCode === 503);

    // the requested language says "other languages", but none of them could be read: still an outage
    fakeCms({ en: { status: 503 }, ru: { status: 503 }, uk: { status: 404, code: "article_not_available_in_locale" } });
    await assert.rejects(fetchLocalizedDetail("articles", ID, "uk"), (error: FetchError) => error.statusCode === 503);
});

test("route params of a missing record are empty instead of a TypeError (redirect in progress)", () => {
    assert.deepEqual(localizedRouteParams(ID, null), {});
    assert.deepEqual(localizedRouteParams(ID, undefined), {});
    assert.deepEqual(localizedRouteParams(ID, { en: "bay", ru: "zaliv" }), {
        en: { documentId: `${ID}-bay` },
        ru: { documentId: `${ID}-zaliv` },
    });
});
