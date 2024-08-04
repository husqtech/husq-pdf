import { ref, watch, onMounted } from 'vue';
import type { Ref } from 'vue';
export function useDocumentProps<T>(): Ref<T> {
    const key = 'document_props';

    const documentProps: Ref<T> = ref({} as T) as Ref<T>

    onMounted(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            documentProps.value = JSON.parse(storedValue) as T;
        }
    });

    return documentProps;
}