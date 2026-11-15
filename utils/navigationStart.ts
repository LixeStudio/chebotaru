// The <main> that was on screen when the current navigation started (set by plugins/navigation-start.client.ts,
// read by app/router.options.ts to tell the old page from the new one).
let navigationStartMain: Element | null = null

export const setNavigationStartMain = (main: Element | null) => {
    navigationStartMain = main
}

export const getNavigationStartMain = () => navigationStartMain
