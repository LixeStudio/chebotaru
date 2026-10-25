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

    // Навигация назад/вперёд
    if (savedPosition) {
        return savedPosition
    }

    // Обычная навигация — скроллим вверх
    return { top: 0 }
}

export default {
    scrollBehavior
}
