// Unit tests (npm test): the catalog page by page (server/utils/catalog-page.ts) and the card files of CMS images.
import { test } from "node:test";
import assert from "node:assert/strict";
import { CATALOG_MAX_PAGE, CATALOG_PAGE_SIZE, catalogPage, parseCatalogQuery } from "../server/utils/catalog-page.ts";
import { mapCmsImage } from "../composables/api/media.ts";

const item = (n: number, extra: Partial<{ availability: string; size: string | null; orientation: string | null; price: number | null; publishedAt: string }> = {}) => ({
    id: n,
    availability: "available",
    size: "middle",
    orientation: "vertical",
    price: 100 * n,
    publishedAt: new Date(Date.UTC(2026, 0, n)).toISOString(),
    ...extra,
});

test("the catalog sends one page of 24, and ?page=N shows everything up to it", () => {
    const items = Array.from({ length: 60 }, (_, i) => item(i + 1));
    const first = catalogPage(items, parseCatalogQuery({}));
    assert.equal(first.items.length, CATALOG_PAGE_SIZE);
    assert.deepEqual([first.total, first.page, first.hasMore], [60, 1, true]);
    const second = catalogPage(items, parseCatalogQuery({ page: "2" }));
    assert.equal(second.items.length, 48);
    const last = catalogPage(items, parseCatalogQuery({ page: "3" }));
    assert.deepEqual([last.items.length, last.hasMore], [60, false]);
});

test("filters and sorting work as before, on the server", () => {
    const items = [
        item(1, { availability: "sold", price: 250 }),
        item(2, { size: "large", price: 500 }),
        item(3, { orientation: "square", price: 900 }),
        item(4, { price: null }),
    ];
    const ids = (query: Record<string, string>) => catalogPage(items, parseCatalogQuery(query)).items.map((entry) => entry.id);
    assert.deepEqual(ids({ availability: "sold" }), [1]);
    assert.deepEqual(ids({ pictureSize: "large,middle" }), [4, 3, 2, 1]); // relevant: available first, newest first, sold last
    assert.deepEqual(ids({ pictureOrientation: "square" }), [3]);
    assert.deepEqual(ids({ price: "less-300,more-700" }), [3, 1]);
    assert.deepEqual(ids({ sortBy: "cheapPictures" }), [1, 2, 3, 4]); // no price goes last
    assert.deepEqual(ids({ sortBy: "expensivePictures" }), [3, 2, 1, 4]);
    assert.deepEqual(ids({ sortBy: "newPictures" }), [4, 3, 2, 1]);
});

test("the default order is relevant: available works first, sold ones after, each group newest first", () => {
    const items = [
        item(1, { availability: "sold" }),
        item(2),
        item(3, { availability: "sold" }),
        item(4),
        item(5),
    ];
    const ids = (query: Record<string, string>) => catalogPage(items, parseCatalogQuery(query)).items.map((entry) => entry.id);
    assert.deepEqual(ids({}), [5, 4, 2, 3, 1]);
    // the explicit "newest" sort ignores availability
    assert.deepEqual(ids({ sortBy: "newPictures" }), [5, 4, 3, 2, 1]);
});

test("when every work is sold, relevant is simply the newest first", () => {
    const items = [1, 3, 2, 4].map((n) => item(n, { availability: "sold" }));
    assert.deepEqual(catalogPage(items, parseCatalogQuery({})).items.map((entry) => entry.id), [4, 3, 2, 1]);
});

test("the relevant order is kept with a filter and on the second page", () => {
    // n = 1..40: odd ones are available, even ones sold; n 1..30 are large
    const items = Array.from({ length: 40 }, (_, i) => item(i + 1, { availability: i % 2 ? "sold" : "available", size: i < 30 ? "large" : "small" }));
    const ids = (query: Record<string, string>) => catalogPage(items, parseCatalogQuery(query)).items.map((entry) => entry.id);
    const available = Array.from({ length: 20 }, (_, i) => 39 - 2 * i);
    const sold = Array.from({ length: 20 }, (_, i) => 40 - 2 * i);
    assert.deepEqual(ids({}), [...available, ...sold].slice(0, CATALOG_PAGE_SIZE));
    assert.deepEqual(ids({ page: "2" }), [...available, ...sold]); // page 2 continues the same order
    // a filter keeps the rule: large works are n = 1..30, 15 available and 15 sold
    const largeAvailable = Array.from({ length: 15 }, (_, i) => 29 - 2 * i);
    const largeSold = Array.from({ length: 15 }, (_, i) => 30 - 2 * i);
    assert.deepEqual(ids({ pictureSize: "large" }), [...largeAvailable, ...largeSold].slice(0, CATALOG_PAGE_SIZE));
    assert.deepEqual(ids({ pictureSize: "large", page: "2" }), [...largeAvailable, ...largeSold]);
});

test("an address cannot ask for odd work: unknown values are ignored and the page is clamped", () => {
    const query = parseCatalogQuery({ availability: "sold,<script>,sold", sortBy: "drop", page: "9999", price: "free" });
    assert.deepEqual(query, { availability: ["sold"], pictureSize: [], pictureOrientation: [], price: [], sortBy: "", page: CATALOG_MAX_PAGE });
    assert.equal(parseCatalogQuery({ page: "abc" }).page, 1);
    assert.equal(parseCatalogQuery({ page: "-3" }).page, 1);
});

test("a card offers the 480, the 1200 and the large file, smallest first, each width once", () => {
    const image = {
        url: "/l?v=1",
        width: 2560,
        height: 1920,
        thumbnail: { url: "/t?v=1", width: 480, height: 360 },
        medium: { url: "/m?v=1", width: 1200, height: 900 },
    };
    assert.equal(mapCmsImage(image, "https://cms").srcset, "https://cms/t?v=1 480w, https://cms/m?v=1 1200w, https://cms/l?v=1 2560w");
    // an image smaller than 1200: the medium copy is the large file itself, listed once
    const small = { url: "/l?v=2", width: 800, height: 600, thumbnail: { url: "/t?v=2", width: 480, height: 360 }, medium: { url: "/m?v=2", width: 800, height: 600 } };
    assert.equal(mapCmsImage(small, "https://cms").srcset, "https://cms/t?v=2 480w, https://cms/m?v=2 800w");
    // an older CMS without medium: as before
    assert.equal(mapCmsImage({ ...image, medium: undefined }, "https://cms").srcset, "https://cms/t?v=1 480w, https://cms/l?v=1 2560w");
});
