import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import type { LocationQuery } from 'vue-router'
type FilterValue = string | string[]

export function useFilters<T extends Record<string, FilterValue>>(initialFilters: T) {
    const route = useRoute()
    const router = useRouter()

    const filters = ref<T>(structuredClone(initialFilters)) // безопасная инициализация

    const parseQueryToFilters = (query: LocationQuery): T => {
        const parsedFilters = {} as T

        for (const key in initialFilters) {
            const defaultValue = initialFilters[key]
            const queryValue = query[key]

            if (Array.isArray(defaultValue)) {
                parsedFilters[key] = (queryValue?.toString().split(',') || []) as T[typeof key]
            } else {
                parsedFilters[key] = (queryValue?.toString() || '') as T[typeof key]
            }
        }

        return parsedFilters
    }

    const stringifyFiltersToQuery = (currentFilters: T): Record<string, string | undefined> => {
        const query: Record<string, string | undefined> = {}

        for (const key in currentFilters) {
            const value = currentFilters[key]
            if (Array.isArray(value)) {
                query[key] = value.length ? value.join(',') : undefined
            } else {
                query[key] = value || undefined
            }
        }

        return query
    }

    // ✅ Синхронизация query → filters
    watch(
        () => route.query,
        (query) => {
            filters.value = parseQueryToFilters(query)
        },
        { immediate: true }
    )

    // ✅ Синхронизация filters → query
    watch(
        filters,
        (newFilters) => {
            const query = stringifyFiltersToQuery(newFilters)
            router.replace({ query })
        },
        { deep: true }
    )

    return {
        filters,
    }
}
