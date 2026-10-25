// Unit tests (npm test): the visitor's answer to the cookie banner (composables/useCookieConsent.ts).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readStoredConsent } from "../composables/useCookieConsent.ts";

const KEY = "chebotaru-cookie-consent";
const DAY = 24 * 60 * 60 * 1000;
type Storage = { getItem: (key: string) => string | null; setItem?: (key: string, value: string) => void };
const global = globalThis as unknown as { localStorage: Storage };
const store = new Map<string, string>();
global.localStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, value),
};

test("an answer is remembered for a year, then the banner asks again", () => {
    store.set(KEY, JSON.stringify({ analytics: "granted", at: Date.now() - 300 * DAY }));
    assert.equal(readStoredConsent(), "granted");
    store.set(KEY, JSON.stringify({ analytics: "denied", at: Date.now() }));
    assert.equal(readStoredConsent(), "denied");
    store.set(KEY, JSON.stringify({ analytics: "granted", at: Date.now() - 366 * DAY }));
    assert.equal(readStoredConsent(), null);
});

test("no answer, a broken one or blocked storage means no consent", () => {
    store.clear();
    assert.equal(readStoredConsent(), null);
    store.set(KEY, "{not json");
    assert.equal(readStoredConsent(), null);
    store.set(KEY, JSON.stringify({ analytics: "yes", at: Date.now() }));
    assert.equal(readStoredConsent(), null);
    const saved = global.localStorage;
    global.localStorage = { getItem: () => { throw new Error("blocked"); } };
    assert.equal(readStoredConsent(), null);
    global.localStorage = saved;
});
