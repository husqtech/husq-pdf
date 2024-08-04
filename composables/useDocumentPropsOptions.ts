import type { Ref } from 'vue';
import {useCurrentDocument} from "~/composables/useCurrentDocument";
export async function useDocumentPropsOptions() {
    const key = 'document_props';
    const schemaName = useCurrentDocument()
    const res = await fetch(`${schemaName}.json`);
    const schema = await res.json()

    return {schema}
}