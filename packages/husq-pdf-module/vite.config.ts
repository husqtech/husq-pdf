import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import {viteStaticCopy} from "vite-plugin-static-copy";

export default defineConfig({
    plugins: [
        vue(),
        resolve(),
        commonjs(),
        viteStaticCopy({
            targets: [
                {
                    src: 'src/runtime/**/*',
                    dest: 'runtime'
                }
            ]
        })
    ],
    build: {
        lib: {
            entry: './src/module.ts',
            name: 'HusqPdfModule',
            fileName: (format) => `husq-pdf-module.${format}.js`,
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['vue', '@nuxt/kit'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
})
