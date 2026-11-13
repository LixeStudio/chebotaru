// Unit tests (npm test): the new blocks of an article (composables/api/articleBlocks.ts) and the address of a page link.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mapBlocks, pageLinkPath, PAGE_LINKS, type CmsBlock } from "../composables/api/articleBlocks.ts";

const image = { url: "/l?v=1", width: 1200, height: 900, thumbnail: { url: "/t?v=1", width: 480, height: 360 }, alt: "alt", caption: "" };
const picture = {
    documentId: "pic0000000000000000000001",
    slug: "morning",
    title: "Morning",
    price: 900,
    currency: "USD" as const,
    availability: "sold" as const,
    orientation: "horizontal" as const,
    size: "middle" as const,
    widthCm: 50,
    heightCm: 70,
    year: 2024,
    material: "Oil on canvas",
    style: "",
    publishedAt: "2025-03-15T10:00:00.000Z",
    image,
};
const article = {
    documentId: "art0000000000000000000001",
    slug: "how-a-picture-is-born",
    title: "How a picture is born",
    theme: "interview" as const,
    previewText: "About the work",
    publishedAt: "2025-03-15T10:00:00.000Z",
    cover: image,
};
const doc = { type: "doc" as const, content: [{ type: "paragraph" as const, content: [{ type: "text" as const, text: "Hello" }] }] };
const media = "https://cms";

test("a picture link and an article link become the picture and the article as the site shows them", () => {
    const blocks = mapBlocks(
        [
            { key: "a", type: "picture_link", picture },
            { key: "b", type: "article_link", article },
        ],
        media
    );
    assert.equal(blocks.length, 2);
    const [first, second] = blocks;
    assert.equal(first.type === "picture_link" && first.picture.title, "Morning");
    assert.equal(first.type === "picture_link" && first.picture.availability, "sold");
    assert.equal(first.type === "picture_link" && first.picture.details.year, "2024");
    assert.equal(first.type === "picture_link" && first.picture.image.src, "https://cms/l?v=1");
    assert.equal(second.type === "article_link" && second.article.slug, "how-a-picture-is-born");
    assert.equal(second.type === "article_link" && second.article.image.alt, "alt");
});

test("a page link keeps the page and the filters; an empty label means no label; an unknown page is dropped", () => {
    const blocks = mapBlocks(
        [
            { key: "a", type: "page_link", pageKey: "catalog", filters: { availability: ["available"] }, label: "  " },
            { key: "b", type: "page_link", pageKey: "contacts", filters: null, label: " Write to me " },
            { key: "c", type: "page_link", pageKey: "shop" as never, filters: null, label: null },
        ],
        media
    );
    assert.equal(blocks.length, 2);
    assert.deepEqual(blocks[0], { key: "a", type: "page_link", pageKey: "catalog", filters: { availability: ["available"] }, label: null });
    assert.equal(blocks[1].type === "page_link" && blocks[1].label, "Write to me");
});

test("two columns keep the side, the heading, the text and the target; a block without a target is dropped", () => {
    const blocks = mapBlocks(
        [
            { key: "a", type: "two_columns", mediaSide: "right", target: { kind: "picture", picture }, heading: "Heading", doc, text: "Heading\nHello" },
            { key: "b", type: "two_columns", mediaSide: "left", target: { kind: "article", article }, heading: null, doc, text: "Hello" },
            { key: "c", type: "two_columns", mediaSide: "left", target: undefined as never, heading: null, doc, text: "Hello" },
        ],
        media
    );
    assert.equal(blocks.length, 2);
    const [first, second] = blocks;
    assert.ok(first.type === "two_columns");
    assert.deepEqual([first.mediaSide, first.heading, first.target.kind], ["right", "Heading", "picture"]);
    assert.ok(second.type === "two_columns");
    assert.deepEqual([second.mediaSide, second.heading, second.target.kind], ["left", null, "article"]);
});

test("the blocks of before are kept as they were and an unknown block is skipped", () => {
    const blocks = mapBlocks(
        [
            { key: "h", type: "heading", level: 2, text: "Title" },
            { key: "t", type: "text", doc, text: "Hello" },
            { key: "g", type: "gallery", images: [image] },
            { key: "x", type: "video" } as unknown as CmsBlock,
        ],
        media
    );
    assert.deepEqual(
        blocks.map((block) => block.type),
        ["heading", "text", "gallery"]
    );
    assert.deepEqual(mapBlocks(undefined, media), []);
});

test("the address of a page link: the route of the page, the catalog filters in the order of the catalog", () => {
    assert.equal(pageLinkPath("home", null), "/");
    assert.equal(pageLinkPath("blog", null), "/blog");
    assert.equal(pageLinkPath("about_oleksii_and_wife", null), "/about-oleksii-and-wife");
    assert.equal(pageLinkPath("catalog", null), "/catalog");
    assert.equal(pageLinkPath("catalog", {}), "/catalog");
    assert.equal(pageLinkPath("catalog", { availability: ["available"] }), "/catalog?availability=available");
    assert.equal(
        pageLinkPath("catalog", { availability: ["available", "sold"], price: ["less-300", "300-700"], pictureOrientation: ["square"], pictureSize: ["small"] }),
        "/catalog?price=less-300,300-700&pictureSize=small&pictureOrientation=square&availability=available,sold"
    );
    // filters belong to the catalog only; an unknown page or a strange value gives nothing odd
    assert.equal(pageLinkPath("blog", { availability: ["sold"] }), "/blog");
    assert.equal(pageLinkPath("shop", null), null);
    assert.equal(pageLinkPath("catalog", { price: ["a&b=c"] }), "/catalog");
    assert.deepEqual(Object.keys(PAGE_LINKS).sort(), ["about_artist", "about_father", "about_mother", "about_oleksii_and_wife", "blog", "catalog", "contacts", "home"]);
});
