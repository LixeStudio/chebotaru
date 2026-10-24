// Unit tests (npm test): automatic page titles and meta descriptions.
import { test } from "node:test";
import assert from "node:assert/strict";
import { seoDescription, seoTitle, truncate } from "../composables/seoText.ts";

const SUFFIX = " — блог Андрея Чеботару";

test("the site suffix is added only when the whole title fits in 60 characters", () => {
    assert.equal(seoTitle("Крым — начало пути", SUFFIX), "Крым — начало пути — блог Андрея Чеботару");
    const long = "Национальная академия изобразительного искусства и архитектуры";
    const title = seoTitle(long, SUFFIX);
    assert.ok(title.length <= 60, title);
    assert.ok(!title.includes("блог"), title);
    assert.ok(title.endsWith("…"), title);
});

test("truncate cuts at a word and never leaves trailing punctuation", () => {
    assert.equal(truncate("short", 60), "short");
    const cut = truncate("Andrii Chebotaru “Where the sun Is born”, an oil painting about sunflowers in Kyiv", 40);
    assert.ok(cut.length <= 40, cut);
    assert.match(cut, /\S…$/);
    assert.doesNotMatch(cut, /[ ,.]…$/);
});

test("the description skips lines that repeat the title and stays within 70-160 characters", () => {
    const title = "Национальная академия изобразительного искусства и архитектуры, формирование стиля.";
    const preview = `${title}\nГоды учёбы в Киеве, первые выставки и учителя, которые повлияли на мой стиль.`;
    const body = "Я поступил в академию в 1998 году. Мастерская живописи стала для меня вторым домом, а преподаватели научили видеть цвет и свет.";
    const text = seoDescription([preview, body], { exclude: [title], fallback: "Читайте больше в блоге Андрея Чеботару." });
    assert.ok(text.length >= 70 && text.length <= 160, `${text.length}: ${text}`);
    assert.ok(text.startsWith("Годы учёбы"), text);
    assert.ok(!text.includes("формирование стиля"), text);
});

test("a too short text gets the fallback sentence; list markers are dropped", () => {
    const text = seoDescription(["• Выставка в Киеве"], { fallback: "Читайте больше в блоге Андрея Чеботару." });
    assert.equal(text, "Выставка в Киеве. Читайте больше в блоге Андрея Чеботару.");
    assert.equal(seoDescription([null, ""], { fallback: "Fallback only." }), "Fallback only.");
    // a value that is not text is ignored instead of breaking the page
    assert.equal(seoDescription([[{ type: "paragraph" }], 42, "Real text"], { fallback: "" }), "Real text");
});
