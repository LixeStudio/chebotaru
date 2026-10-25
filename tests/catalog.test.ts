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
    assert.deepEqual(ids({ pictureSize: "large,middle" }), [1, 2, 3, 4]);
    assert.deepEqual(ids({ pictureOrientation: "square" }), [3]);
    assert.deepEqual(ids({ price: "less-300,more-700" }), [1, 3]);
    assert.deepEqual(ids({ sortBy: "cheapPictures" }), [1, 2, 3, 4]); // no price goes last
    assert.deepEqual(ids({ sortBy: "expensivePictures" }), [3, 2, 1, 4]);
    assert.deepEqual(ids({ sortBy: "newPictures" }), [4, 3, 2, 1]);
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
