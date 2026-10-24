// Unit tests (npm test): what the catalog / blog list shows, and how long article galleries are split.
import { test } from "node:test";
import assert from "node:assert/strict";
import { listState } from "../composables/listState.ts";
import { splitGallery } from "../composables/splitGallery.ts";

test("a failed CMS request is 'unavailable', not an empty catalog", () => {
    assert.equal(listState({ count: 0, failed: true, hasFilters: false }), "unavailable");
    // filters do not turn an outage into "nothing matches the filters"
    assert.equal(listState({ count: 0, failed: true, hasFilters: true }), "unavailable");
});

test("an empty CMS answer stays the empty state, filters give their own message", () => {
    assert.equal(listState({ count: 0, failed: false, hasFilters: false }), "empty");
    assert.equal(listState({ count: 0, failed: false, hasFilters: true }), "noFilteredResults");
});

test("received items are always shown", () => {
    assert.equal(listState({ count: 34, failed: false, hasFilters: false }), "list");
    assert.equal(listState({ count: 2, failed: false, hasFilters: true }), "list");
});

test("galleries are split into even rows of up to four images", () => {
    const sizes = (n: number) => splitGallery(Array.from({ length: n }, (_, i) => i)).map((group) => group.length);
    assert.deepEqual(sizes(0), []);
    assert.deepEqual(sizes(1), [1]);
    assert.deepEqual(sizes(4), [4]);
    assert.deepEqual(sizes(5), [3, 2]);
    assert.deepEqual(sizes(7), [4, 3]);
    assert.deepEqual(sizes(9), [3, 3, 3]);
    assert.deepEqual(sizes(12), [4, 4, 4]);
    // order is kept
    assert.deepEqual(splitGallery([1, 2, 3, 4, 5]).flat(), [1, 2, 3, 4, 5]);
});
