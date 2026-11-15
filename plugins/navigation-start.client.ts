import { setNavigationStartMain } from '~/utils/navigationStart'

// Remember the page on screen when a navigation starts, before anything is rendered (see app/router.options.ts)
export default defineNuxtPlugin(() => {
    useRouter().beforeEach(() => {
        setNavigationStartMain(document.querySelector('main'))
    })
})
