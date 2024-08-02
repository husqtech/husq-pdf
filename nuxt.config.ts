// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"],
    ssr: false,
    vite: {
        optimizeDeps: {
            esbuildOptions: {
                target: "esnext",
            },
        },
    },

    imports: {
        dirs: [
            'props'
        ]
    }
})