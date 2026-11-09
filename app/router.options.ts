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

    // Normal and back/forward navigation: scroll only after the new page is on screen (as Nuxt's own
    // router.options does), otherwise the old page is shown at the top for a moment
    const nuxtApp = useNuxtApp()
    const router = useRouter()

    return new Promise((resolve) => {
        const doScroll = () => {
            requestAnimationFrame(() => {
                // the visitor has already gone somewhere else
                if (router.currentRoute.value.fullPath !== to.fullPath) {
                    resolve(false)
                    return
                }
                resolve(position)
            })
        }

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
