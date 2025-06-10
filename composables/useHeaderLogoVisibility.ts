import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute } from 'vue-router'

export function useHeaderLogoVisibility(selector = '.preview__title', headerSelector = 'header') {
    const isLogoVisible = ref(false)
    const route = useRoute()
    let observer: IntersectionObserver | null = null

    const fallbackPages = ['/about-artist']
    const isFallbackPage = computed(() =>
        fallbackPages.some(slug => route.path.endsWith(slug) || route.path.endsWith(`/${slug}`))
    )

    const handleScroll = () => {
        const headerEl = document.querySelector(headerSelector)
        if (!headerEl) return

        const headerHeight = headerEl.getBoundingClientRect().height
        isLogoVisible.value = window.scrollY > headerHeight
    }

    onMounted(() => {
        if (isFallbackPage.value) {
            // На fallback-страницах — логика по scroll > headerHeight
            handleScroll()
            window.addEventListener('scroll', handleScroll)
            return
        }

        // На остальных — через IntersectionObserver
        const target = document.querySelector(selector)
        if (!target) return

        observer = new IntersectionObserver(
            ([entry]) => {
                isLogoVisible.value = !entry.isIntersecting
            },
            {
                root: null,
                threshold: 0.1,
            }
        )

        observer.observe(target)
    })

    onBeforeUnmount(() => {
        if (observer) observer.disconnect()
        if (isFallbackPage.value) {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    return { isLogoVisible }
}
