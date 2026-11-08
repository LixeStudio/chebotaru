<script setup>
// Formatted text of an article block: the TipTap document from the CMS rendered as elements
// (never as an HTML string). Nodes: paragraph, bulletList, orderedList, listItem, hardBreak, text;
// marks: bold, italic, link. Anything else is skipped. Paragraphs keep the classes of the plain-text block.
import { h } from "vue";

const props = defineProps({
  doc: {
    type: Object,
    required: true,
  },
});

// the CMS only lets https, http and mailto links through; checked again here as the page renders them
const SAFE_LINK = /^(https?:\/\/|mailto:)/i;

const renderText = (node) => {
  let vnode = node.text;
  for (const mark of node.marks || []) {
    if (mark.type === "bold") vnode = h("strong", vnode);
    else if (mark.type === "italic") vnode = h("em", vnode);
    else if (mark.type === "link" && SAFE_LINK.test(mark.attrs?.href || "")) {
      vnode = h("a", { href: mark.attrs.href, class: "body__link" }, vnode);
    }
  }
  return vnode;
};

const renderInline = (nodes = []) =>
  nodes.map((node) => {
    if (node.type === "hardBreak") return h("br");
    if (node.type === "text") return renderText(node);
    return null;
  });

const isEmptyParagraph = (node) =>
  !(node.content || []).some((child) => child.type === "text" && child.text.trim());

const renderBlock = (node) => {
  if (node.type === "paragraph") {
    return isEmptyParagraph(node)
      ? null
      : h("p", { class: "body__text" }, renderInline(node.content));
  }
  if (node.type === "bulletList" || node.type === "orderedList") {
    return h(
      node.type === "bulletList" ? "ul" : "ol",
      { class: ["body__list", `body__list--${node.type}`] },
      (node.content || []).map((item) =>
        h("li", { class: "body__list-item" }, (item.content || []).map(renderBlock))
      )
    );
  }
  return null;
};

const render = () =>
  h("div", { class: "body__rich-text" }, (props.doc.content || []).map(renderBlock));
</script>

<template>
  <render />
</template>
