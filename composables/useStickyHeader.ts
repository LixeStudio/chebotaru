
import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'

export function useStickyHeader(headerRef: Ref<Element | null>) {
    const isSticky = ref(false)

    const handleScroll = () => {
        if (!headerRef.value) return

        const scrollY = window.scrollY || window.pageYOffset
        const headerHeight = headerRef.value.getBoundingClientRect().height

        isSticky.value = scrollY > headerHeight
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll)
    })

    return { isSticky }
}
