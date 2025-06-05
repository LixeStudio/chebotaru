import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useHeaderLogoVisibility(selector = '.preview__title') {
    const isLogoVisible = ref(false)
    let observer: IntersectionObserver | null = null

    onMounted(() => {
        const target = document.querySelector(selector)
        if (!target) return

        observer = new IntersectionObserver(
            ([entry]) => {
                isLogoVisible.value = !entry.isIntersecting // логотип появляется, когда H1 **вышел** из зоны
            },
            {
                root: null,
                threshold: 0.1, // 10% заголовка видно — считаем, что он ещё на экране
            }
        )

        observer.observe(target)
    })

    onBeforeUnmount(() => {
        if (observer) observer.disconnect()
    })

    return { isLogoVisible }
}
