import { onMounted, onBeforeUnmount, watch, type Ref } from 'vue'

export function useBodyScrollLock(shouldLock: Ref<boolean> | boolean) {
    const lockScroll = () => {
        document.body.classList.add('scroll-locked')
    }

    const unlockScroll = () => {
        document.body.classList.remove('scroll-locked')
    }

    let stopWatcher: (() => void) | null = null

    onMounted(() => {
        if (typeof shouldLock === 'boolean') {
            if (shouldLock) lockScroll()
        } else {
            // начальное состояние
            if (shouldLock.value) lockScroll()

            // слежение за изменениями
            stopWatcher = watch(shouldLock, (newVal) => {
                if (newVal) {
                    lockScroll()
                } else {
                    unlockScroll()
                }
            })
        }
    })

    onBeforeUnmount(() => {
        unlockScroll()
        if (stopWatcher) stopWatcher()
    })
}
