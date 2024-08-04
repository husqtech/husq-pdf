// plugins/hmr-refresh.ts
export default defineNuxtPlugin((nuxtApp) => {
    if (import.meta.client && import.meta.hot) {
        import.meta.hot.on("vite:beforeUpdate", (data) => {
            useRefreshDocument()
        });
    }
});
