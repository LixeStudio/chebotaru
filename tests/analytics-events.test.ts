// Unit tests (npm test): which links count as a contact click (utils/analytics-events.ts).
import { test } from "node:test";
import assert from "node:assert/strict";
import { contactEvent } from "../utils/analytics-events.ts";

test("the four contact links of the site get their own event", () => {
    assert.equal(contactEvent("https://t.me/andriichebotaru"), "contact_telegram");
    assert.equal(contactEvent("https://wa.me/380679884402"), "contact_whatsapp");
    assert.equal(contactEvent("mailto:hello@example.com"), "contact_email");
    assert.equal(contactEvent("https://www.instagram.com/andriichebotaru/"), "contact_instagram");
});

test("the scheme, the case and a missing www do not matter", () => {
    assert.equal(contactEvent("HTTPS://T.ME/someone"), "contact_telegram");
    assert.equal(contactEvent("MAILTO:a@b.c"), "contact_email");
    assert.equal(contactEvent("https://instagram.com/someone"), "contact_instagram");
    assert.equal(contactEvent("  https://wa.me/1  "), "contact_whatsapp");
});

test("other links, look-alike hosts and empty values are not contact clicks", () => {
    for (const href of [
        "",
        "/ru/contacts",
        "#top",
        "https://example.com/",
        "https://t.me.evil.example/x",
        "https://evilt.me/x",
        "https://wa.me",
        "https://www.facebook.com/someone",
        "tel:+380000000",
    ]) {
        assert.equal(contactEvent(href), null, href);
    }
});
