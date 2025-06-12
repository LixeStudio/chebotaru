
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';

export function useFilters() {
    const route = useRoute();
    const router = useRouter();

    interface Filters {
        price: string[];
        pictureSize: string[];
        sortBy: string;
        pictureOrientation: string[];
        availability: string[];
    }
    const filters = ref<Filters>({
        price: [],
        pictureSize: [],
        sortBy: "",
        pictureOrientation: [],
        availability: [],
    });

    // Инициализация фильтров из query при загрузке страницы и изменении URL
    watch(
        () => route.query,
        (query) => {
            filters.value = {
                price: query.price?.toString().split(',') || [],
                pictureSize: query.pictureSize?.toString().split(',') || [],
                sortBy: query.sortBy?.toString() || '',
                pictureOrientation: query.pictureOrientation?.toString().split(',') || [],
                availability: query.availability?.toString().split(',') || [],
            };
        },
        { immediate: true }
    );

    // Синхронизация фильтров с URL при их изменении
    watch(
        filters,
        (newFilters) => {
            const query = {
                ...route.query,
                price: newFilters.price.join(',') || undefined,
                pictureSize: newFilters.pictureSize.join(',') || undefined,
                sortBy: newFilters.sortBy || undefined,
                pictureOrientation: newFilters.pictureOrientation.join(',') || undefined,
                availability: newFilters.availability.join(',') || undefined,
            };

            Object.keys(query).forEach((key) => {
                const typedKey = key as keyof typeof query;
                if (!query[typedKey])
                    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                    delete query[typedKey];;
            });

            router.replace({ query });
        },
        { deep: true }
    );

    return { filters };
}
