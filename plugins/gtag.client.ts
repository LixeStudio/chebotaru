/**
 * Load GA4 only after the visitor interacts, or after a short idle delay.
 * That keeps googletagmanager.com off the critical path (LCP / TBT / PageSpeed).
 * Requires NUXT_PUBLIC_GTAG_ID and gtag.initMode: 'manual' in nuxt.config.
 */
export default defineNuxtPlugin(() => {
  const id = useRuntimeConfig().public.gtag?.id
  if (!id) return

  const { initialize } = useGtag()
  const interactionEvents = [
    "pointerdown",
    "keydown",
    "scroll",
    "touchstart",
  ] as const

  let done = false
  let fallbackTimer = 0

  const load = () => {
    if (done) return
    done = true
    clearTimeout(fallbackTimer)
    for (const type of interactionEvents) {
      window.removeEventListener(type, load)
    }
    // after the current frame so the click/scroll handler finishes first
    const start = () => initialize()
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => start(), { timeout: 2000 })
    } else {
      setTimeout(start, 0)
    }
  }

  for (const type of interactionEvents) {
    window.addEventListener(type, load, { once: true, passive: true })
  }

  // visitors who never interact: still count them, but after Lighthouse's quiet window
  const scheduleFallback = () => {
    fallbackTimer = window.setTimeout(load, 3500)
  }
  if (document.readyState === "complete") scheduleFallback()
  else window.addEventListener("load", scheduleFallback, { once: true })
})
