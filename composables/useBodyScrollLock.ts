import { onMounted, onBeforeUnmount, watch, type Ref } from 'vue';

export function useBodyScrollLock(shouldLock: Ref<boolean> | boolean) {

    const lockScroll = () => {
        const scrollbarWidth = getScrollbarWidth();
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.body.classList.add('scroll-locked');

    };

    const unlockScroll = () => {
        document.body.style.paddingRight = '';
        document.body.classList.remove('scroll-locked');

    };

    const getScrollbarWidth = () => {
        return window.innerWidth - document.documentElement.clientWidth;
    };

    onMounted(() => {


        const lock = typeof shouldLock === 'boolean' ? shouldLock : shouldLock.value;
        if (lock) lockScroll();

        if (typeof shouldLock !== 'boolean') {
            watch(shouldLock, (newVal) => {
                if (newVal) {
                    lockScroll()
                } else {
                    unlockScroll()
                }
            });
        }
    });

    onBeforeUnmount(() => {
        unlockScroll();
    });
}
