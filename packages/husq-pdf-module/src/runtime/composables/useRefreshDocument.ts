export const useRefreshDocument = useDebounceFn(() => {
    refreshNuxtData("document-preview").then(() => {});
}, 1000)