/**
 * Load GA4 only with the visitor's consent (cookie banner, composables/useCookieConsent.ts), and even then only
 * after the visitor interacts, or after a short idle delay.
 * Until "Accept" nothing is requested from googletagmanager.com and no cookie is set (Consent Mode v2, basic mode:
 * the default state is "denied" in nuxt.config gtag.initCommands). That also keeps GA off the critical path
 * (LCP / TBT / PageSpeed).
 * Requires NUXT_PUBLIC_GTAG_ID and gtag.initMode: 'manual' in nuxt.config.
 */
import { readStoredConsent, useCookieConsent } from "~/composables/useCookieConsent"

export default defineNuxtPlugin((nuxtApp) => {
  const id = useRuntimeConfig().public.gtag?.id
  if (!id) return

  const { gtag, initialize, disableAnalytics, enableAnalytics } = useGtag()
  const { choice, bannerOpen } = useCookieConsent()
  const interactionEvents = [
    "pointerdown",
    "keydown",
    "scroll",
    "touchstart",
  ] as const

  let loaded = false
  let waiting = false
  let fallbackTimer = 0

  const start = () => {
    if (choice.value !== "granted") return
    enableAnalytics()
    // before the script: the queued page_view waits for this (wait_for_update) and goes out with consent
    gtag("consent", "update", { analytics_storage: "granted" })
    if (loaded) return
    loaded = true
    initialize()
  }

  const load = () => {
    clearTimeout(fallbackTimer)
    for (const type of interactionEvents) {
      window.removeEventListener(type, load)
    }
    // after the current frame so the click/scroll handler finishes first
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => start(), { timeout: 2000 })
    } else {
      setTimeout(start, 0)
    }
  }

  // a returning visitor who accepted earlier: load as before, after the first interaction or ~3.5 s
  const loadWhenIdle = () => {
    if (waiting) return
    waiting = true
    for (const type of interactionEvents) {
      window.addEventListener(type, load, { once: true, passive: true })
    }
    // visitors who never interact: still count them, but after Lighthouse's quiet window
    const scheduleFallback = () => {
      fallbackTimer = window.setTimeout(load, 3500)
    }
    if (document.readyState === "complete") scheduleFallback()
    else window.addEventListener("load", scheduleFallback, { once: true })
  }

  // consent withdrawn ("Cookie settings" → "Decline"): stop sending and remove the GA cookies
  const stop = () => {
    gtag("consent", "update", { analytics_storage: "denied" })
    disableAnalytics()
    removeAnalyticsCookies()
  }

  // after hydration: the server-rendered page never depends on the answer
  nuxtApp.hook("app:mounted", () => {
    choice.value = readStoredConsent()
    if (choice.value === "granted") loadWhenIdle()
    else bannerOpen.value = choice.value === null

    watch(choice, (value, previous) => {
      // "Accept" was a click, so no need to wait for another interaction
      if (value === "granted") load()
      else if (value === "denied" && previous === "granted") stop()
    })
  })
})

// _ga and _ga_<container>: set by gtag.js on this host or on its parent domain (".andriichebotaru.com")
function removeAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((part) => part.split("=")[0]?.trim() ?? "")
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid")
  const parts = location.hostname.split(".")
  const domains = [""]
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join(".")}`)
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`
    }
  }
}
