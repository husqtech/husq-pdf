// plugins/hmr-refresh.ts
export default defineNuxtPlugin((nuxtApp) => {
    if (process.client && import.meta.hot) {
        import.meta.hot.on("vite:beforeUpdate", (data) => {
            console.log(data)
        });
    }
});
