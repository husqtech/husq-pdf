import { ref } from 'vue';
import type { Ref } from 'vue';

enum InputType {
    TEXT = 'TEXT',
    NUMBER = 'NUMBER',
    CHECKBOX = 'CHECKBOX',
    FIELDSET = 'FIELDSET',
}

interface FormField {
    name: string;
    type: InputType;
    fields?: FormField[];
}

export function useDocumentPropsOptions() {
    const propOptionFields: Ref<FormField[]> = ref([]);

    function getKeys<T>(): Array<keyof T> {
        return [] as Array<keyof T>;
    }

    function updatePropOptions<T>() {
        const keys = getKeys<T>();
        console.log("keys", keys);
    }

    return {
        propOptionFields,
        updatePropOptions,
    };
}
