// Unit tests of the newsletter helpers (npm test): what the settings page shows after "Save", the sign-up fields the
// server forwards to the CMS, and the page address that goes to Google Analytics.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
    CONSENT_VERSION,
    isConsentVersion,
    isNewsletterLocale,
    isNewsletterPath,
    pageViewWithoutQuery,
    saveOutcome,
} from "../utils/newsletter.ts";

test("saving without a change only confirms", () => {
    assert.deepEqual(saveOutcome({ blog: true, catalog: true }, { blog: true, catalog: true }), { kind: "saved" });
    assert.deepEqual(saveOutcome({ blog: true, catalog: false }, { blog: true, catalog: false }), { kind: "saved" });
});

test("both topics off is an unsubscribe, also for someone who was already off", () => {
    assert.deepEqual(saveOutcome({ blog: true, catalog: true }, { blog: false, catalog: false }), { kind: "unsubscribed" });
    assert.deepEqual(saveOutcome({ blog: false, catalog: false }, { blog: false, catalog: false }), { kind: "unsubscribed" });
});

test("one topic turned off: its line, then the other one keeps coming", () => {
    assert.deepEqual(saveOutcome({ blog: true, catalog: true }, { blog: true, catalog: false }), {
        kind: "updated",
        lines: [
            { topic: "catalog", change: "off" },
            { topic: "blog", change: "kept" },
        ],
    });
});

test("a subscriber who was off turns one topic on", () => {
    assert.deepEqual(saveOutcome({ blog: false, catalog: false }, { blog: true, catalog: false }), {
        kind: "updated",
        lines: [{ topic: "blog", change: "on" }],
    });
});

test("both topics changed: a line each, nothing 'kept'", () => {
    assert.deepEqual(saveOutcome({ blog: true, catalog: false }, { blog: false, catalog: true }), {
        kind: "updated",
        lines: [
            { topic: "catalog", change: "on" },
            { topic: "blog", change: "off" },
        ],
    });
});

test("a topic that is off and untouched gets no line", () => {
    const outcome = saveOutcome({ blog: false, catalog: true }, { blog: true, catalog: true });
    assert.deepEqual(outcome, { kind: "updated", lines: [{ topic: "blog", change: "on" }, { topic: "catalog", change: "kept" }] });
});

test("sign-up fields: only known languages and a consent version in the CMS format", () => {
    assert.ok(["en", "ru", "uk"].every(isNewsletterLocale));
    assert.equal(isNewsletterLocale("de"), false);
    assert.equal(isNewsletterLocale(undefined), false);
    assert.equal(isConsentVersion(CONSENT_VERSION), true);
    assert.equal(isConsentVersion("2026-11"), true);
    assert.equal(isConsentVersion("bad version"), false);
    assert.equal(isConsentVersion("x".repeat(33)), false);
    assert.equal(isConsentVersion(""), false);
});

test("the settings page is recognised in every language and its analytics address has no query", () => {
    for (const path of ["/newsletter/preferences", "/ru/newsletter/preferences", "/uk/newsletter/preferences"]) {
        assert.equal(isNewsletterPath(path), true, path);
    }
    for (const path of ["/", "/ru/blog", "/newsletters", "/catalog/newsletter"]) assert.equal(isNewsletterPath(path), false, path);
    assert.deepEqual(pageViewWithoutQuery("https://andriichebotaru.com", "/ru/newsletter/preferences"), {
        page_location: "https://andriichebotaru.com/ru/newsletter/preferences",
        page_path: "/ru/newsletter/preferences",
    });
});
