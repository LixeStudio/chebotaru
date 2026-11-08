// Unit tests (npm test): which CMS requests the Nuxt server caches, and that keys never mix records, languages or pages.
import { test } from "node:test";
import assert from "node:assert/strict";
import { cmsCacheClass, cmsCacheKey } from "../server/utils/cms-cache-policy.ts";

const ID = "zfqk4hccs9lj8bletxpeybjl";

test("the site's own requests are cached: lists for 15 s, details and related for 30 s", () => {
    assert.equal(cmsCacheClass("pictures", { locale: "en", page: "1", pageSize: "100" }), "list");
    assert.equal(cmsCacheClass("articles", { locale: "uk", page: "2", pageSize: "100" }), "list");
    assert.equal(cmsCacheClass("pictures", { locale: "ru", sort: "newest", pageSize: "6" }), "list");
    assert.equal(cmsCacheClass(`pictures/${ID}`, { locale: "en" }), "detail");
    assert.equal(cmsCacheClass(`articles/${ID}/related`, { locale: "en", limit: "3" }), "detail");
});

test("other shapes are forwarded without cache (no arbitrary keys in memory)", () => {
    const uncached: [string, Record<string, string>][] = [
        ["pictures", { locale: "en", availability: "sold", page: "1", pageSize: "100" }], // filters
        ["pictures", { locale: "en", currency: "USD", sort: "price_asc", pageSize: "6" }], // price sort
        ["pictures", { locale: "en", page: "51", pageSize: "100" }], // beyond the pages cached
        ["pictures", { locale: "en", page: "1", pageSize: "24" }], // another page size
        ["pictures", { locale: "en", sort: "newest", pageSize: "50" }],
        ["pictures", { locale: "de", page: "1", pageSize: "100" }], // not a site language
        ["pictures", { page: "1", pageSize: "100" }], // no language
        [`pictures/${ID}`, { locale: "en", extra: "x" }],
        [`articles/${ID}/related`, { locale: "en", limit: "50" }],
        ["locales", { locale: "en" }],
    ];
    for (const [route, query] of uncached) assert.equal(cmsCacheClass(route, query), null, `${route} ${JSON.stringify(query)}`);
});

test("every parameter is in the key: languages, records, pages and sorts never share an entry", () => {
    const keys = [
        cmsCacheKey("pictures", { locale: "en", page: "1", pageSize: "100" }),
        cmsCacheKey("pictures", { locale: "ru", page: "1", pageSize: "100" }),
        cmsCacheKey("pictures", { locale: "en", page: "2", pageSize: "100" }),
        cmsCacheKey("articles", { locale: "en", page: "1", pageSize: "100" }),
        cmsCacheKey("pictures", { locale: "en", sort: "newest", pageSize: "6" }),
        cmsCacheKey("pictures", { locale: "en", sort: "oldest", pageSize: "6" }),
        cmsCacheKey(`pictures/${ID}`, { locale: "en" }),
        cmsCacheKey(`pictures/${ID}`, { locale: "uk" }),
        cmsCacheKey(`pictures/${ID.replace("z", "a")}`, { locale: "en" }),
        cmsCacheKey(`pictures/${ID}/related`, { locale: "en", limit: "3" }),
    ];
    assert.equal(new Set(keys).size, keys.length);
});

// unstorage normalizeKey (node_modules/unstorage/dist/shared): what Nitro's storage really keeps of a key
const storedAs = (key: string) =>
    key.split("?")[0]!.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");

test("keys stay distinct after the storage normalizes them (regression: unstorage cuts a key at '?')", () => {
    const queries: [string, Record<string, string>][] = [
        ["pictures", { locale: "en", page: "1", pageSize: "100" }],
        ["pictures", { locale: "ru", page: "1", pageSize: "100" }],
        ["pictures", { locale: "en", sort: "newest", pageSize: "6" }],
        [`pictures/${ID}`, { locale: "en" }],
        [`pictures/${ID}`, { locale: "ru" }],
        [`pictures/${ID}`, { locale: "uk" }],
        [`pictures/${ID}/related`, { locale: "en", limit: "3" }],
        [`articles/${ID}`, { locale: "en" }],
    ];
    const stored = queries.map(([route, query]) => storedAs(cmsCacheKey(route, query)));
    assert.equal(new Set(stored).size, stored.length, stored.join("\n"));
    for (const key of stored) assert.doesNotMatch(key, /[?/\\]/);
});

test("the key does not depend on the order of the parameters", () => {
    assert.equal(
        cmsCacheKey("pictures", { pageSize: "100", locale: "en", page: "1" }),
        cmsCacheKey("pictures", { locale: "en", page: "1", pageSize: "100" })
    );
});
