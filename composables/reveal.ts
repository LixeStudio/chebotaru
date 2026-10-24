import { computed, ref, watch, type Directive, type WatchSource } from "vue";

// v-reveal: a card below the first screen fades in softly when it scrolls into view (class .reveal / .reveal--in in
// assets/scss/base/_common.scss). Cards already on screen when the page opens are left alone (no delay of the first
// screen / LCP), and so is everything without IntersectionObserver or with "reduce motion": they just stay visible.
// Only opacity and transform change, so the layout never shifts.

let observer: IntersectionObserver | null = null;

function sharedObserver(): IntersectionObserver {
    observer ??= new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                entry.target.classList.add("reveal--in");
                observer?.unobserve(entry.target);
            }
        },
        { rootMargin: "0px 0px -5% 0px" }
    );
    return observer;
}

export const vReveal: Directive<HTMLElement> = {
    mounted(el) {
        if (!("IntersectionObserver" in window)) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        el.classList.add("reveal");
        sharedObserver().observe(el);
    },
    beforeUnmount(el) {
        observer?.unobserve(el);
    },
    // nothing to render on the server: the card is visible in the HTML
    getSSRProps: () => ({}),
};

/**
 * A soft entrance for a list that changes in place (catalog / blog filters and sorting): bind `listKey` as the list's
 * `key` and `entering` to the class `list-entrance` (assets/scss/base/_common.scss). The first render (server HTML,
 * the first screen) is never animated; every later change of `source` re-creates the list, whose first cards rise in.
 */
export function useListEntrance(source: WatchSource<unknown>) {
    const listKey = ref(0);
    watch(source, () => {
        listKey.value += 1;
    });
    return { listKey, entering: computed(() => listKey.value > 0) };
}
