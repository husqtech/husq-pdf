import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addServerHandler,
  addComponent,
  addImports,
  addLayout
} from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@husq/pdf',
    configKey: 'husqPdf',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    _nuxt.options.ssr = false;
    _nuxt.options.dir.pages = "documents";
    _nuxt.options.dir.public = "schemas";

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
    addImports({name: "useDocumentProps", from: resolver.resolve("./runtime/composables/useDocumentProps")})
    addLayout(resolver.resolve('./runtime/layouts/develop.vue'), "develop")
    addComponent({name: "husq-pdf-root", filePath: resolver.resolve('./runtime/app.vue')})
    addServerHandler({
      route: "/api/render/:document",
      method: "POST",
      handler: resolver.resolve("./runtime/server/api/render/[document].post")
    })
  },
})
