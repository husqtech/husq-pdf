import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@husq/pdf',
    configKey: 'husq',
  },
  defaults: {
    pdfOptions: {}
  },
  setup(_options: any, _nuxt: any) {
    const resolver = createResolver(import.meta.url)

    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
