import { ref, reactive } from 'vue';
import type { Ref } from 'vue';
import { useCurrentDocument } from '~/composables/useCurrentDocument';
import {useRefreshDocument} from "~/composables/useRefreshDocument";

const selectedProp: Ref<{key: string, subSchema: any} | null> = ref<{key: string, subSchema: any} | null>(null);
const props = reactive<Record<string, any>>({});

const updatePropValue = (fullKey: string, value: any) => {
    const keys = fullKey.split('.');
    let obj = props;
    for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    useRefreshDocument()
};

const selectProp = (fullKey: string, subSchema: any) => {
    selectedProp.value = {key: fullKey, subSchema: subSchema}
};

async function fetchSchema() {
    const schemaName = useCurrentDocument();
    const res = await fetch(`${schemaName}.json`);
    return await res.json();
}

export function usePropOptions() {
    return {
        fetchSchema,
        selectedProp,
        updatePropValue,
        selectProp,
        props
    };
}
