import {computed} from "vue";
import {useRoute} from "vue-router";

export enum Mode {
    DEVELOP = "develop",
    RENDER = "default",
}

export function useLayoutMode(): Ref<Mode> {
    const route = useRoute();

    const hash = computed(() => route.hash);

    return computed(() => {
        switch (hash.value) {
            case "#develop":
                return Mode.DEVELOP;
            default:
                return Mode.RENDER;
        }
    });
};