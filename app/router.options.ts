import { START_LOCATION } from 'vue-router'
import type { RouterScrollBehavior } from 'vue-router'

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
    const stripLocale = (path: string) => path.replace(/^\/(ru|uk|en)(?=\/|$|\?)/, '') || '/'

    const toPath = stripLocale(to.fullPath)
    const fromPath = stripLocale(from.fullPath)

    // Если только язык изменился (путь остался прежним) — НЕ скроллим
    if (toPath === fromPath) {
        return false
    }

    // The same page with another query (catalog filters, sorting, "show more" ?page=N): stay where the visitor is
    if (!savedPosition && stripLocale(to.path) === stripLocale(from.path)) {
        return false
    }

    const position = savedPosition ?? { top: 0 }

    // First page load: nothing to wait for
    if (from === START_LOCATION) {
        return position
    }

    // Normal and back/forward navigation: scroll when the new page is on screen, not before (the old page would be
    // shown at the top for a moment) and not a frame later (the new page would be painted at the old scroll position:
    // the cover of an article then shows its bottom part and jumps to the top).
    const nuxtApp = useNuxtApp()
    const router = useRouter()

    return new Promise((resolve) => {
        let finished = false
        const oldMain = document.querySelector('main')

        const finish = () => {
            if (finished) return
            finished = true
            swapObserver.disconnect()
            // the visitor has already gone somewhere else
            resolve(router.currentRoute.value.fullPath === to.fullPath ? position : false)
        }

        // Best moment: right when the new page replaces the old one in the DOM. The observer runs as a microtask of
        // the change, before the browser paints, so the new page is never painted at the old scroll position.
        const swapObserver = new MutationObserver(() => {
            const main = document.querySelector('main')
            if (main && main !== oldMain) finish()
        })
        swapObserver.observe(document.getElementById('__nuxt') ?? document.body, { childList: true, subtree: true })

        // Otherwise (the page has no own <main>, or it stayed in place): after the page is loaded, as Nuxt does
        const doScroll = () => requestAnimationFrame(finish)
        nuxtApp.hooks.hookOnce('page:loading:end', () => {
            const transitionPromise = (nuxtApp as { '~transitionPromise'?: Promise<void> | null })['~transitionPromise']
            if (transitionPromise) {
                transitionPromise.then(doScroll)
            } else {
                doScroll()
            }
        })
    })
}

export default {
    scrollBehavior
}
