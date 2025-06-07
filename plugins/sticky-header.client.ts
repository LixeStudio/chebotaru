import { useState } from '#app'

export default defineNuxtPlugin(() => {
    const isSticky = useState('header-is-sticky', () => false)

    const handleScroll = () => {
        const headerEl = document.querySelector('header')
        if (!headerEl) return

        const headerHeight = headerEl.getBoundingClientRect().height
        const scrollY = window.scrollY || window.pageYOffset

        isSticky.value = scrollY > headerHeight
    }

    window.addEventListener('scroll', handleScroll)

    // Для SSR/клиентского перехода корректно удаляем
    window.addEventListener('beforeunload', () =>
        window.removeEventListener('scroll', handleScroll)
    )
})
