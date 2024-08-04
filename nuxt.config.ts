// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path";

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", '@vueuse/nuxt'],
    ssr: false,
    dir: {
        pages: "documents",
        static: "schema",
    },
    vite: {
        optimizeDeps: {
            esbuildOptions: {
                target: "esnext",
            },
        },
    }
})