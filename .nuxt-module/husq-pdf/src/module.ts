import {
  addComponent,
  addImports,
  addImportsDir,
  addLayout,
  addPlugin,
  addServerHandler,
  createResolver,
  defineNuxtModule, installModule
} from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: '@husq/pdf',
    configKey: 'husq',
  },
  defaults: {},
  async setup(_options, nuxt) {
    const {resolve} = createResolver(import.meta.url);

    // Configure pages and public dir
    nuxt.options.dir.pages = 'documents';
    nuxt.options.dir.public = 'schemas';
    nuxt.options.ssr = false;

    // Configure top level await compatibility in Vite
    nuxt.options.vite.optimizeDeps ||= {};
    nuxt.options.vite.optimizeDeps.esbuildOptions ||= {};
    nuxt.options.vite.optimizeDeps.esbuildOptions.target = 'esnext';

    nuxt.options.nitro.esbuild ||= {};
    nuxt.options.nitro.esbuild.options ||= {};
    nuxt.options.nitro.esbuild.options.target = 'esnext';

    nuxt.options.css.push(resolve('./runtime/assets/css/tailwind.css'));

    addLayout({
      src: resolve('./runtime/layouts/develop.vue'),
      name: 'develop',
    });

    addComponent({
      name: 'HusqPdfApp',
      filePath: resolve('./runtime/components/husq-pdf-app.vue'),
    });

    addImportsDir(
      resolve('runtime/composables'),
    );

    addServerHandler({
      route: '/api/render/:document',
      handler: resolve('./runtime/server/api/render/[document].post'),
    });

    /*
    addPlugin({
      src: resolve('./runtime/modules/schema-to-ts-interface'),
      mode: 'all',
    });*/

    addPlugin({
      src: resolve('./runtime/plugins/hmr-refresh-document'),
      mode: 'client',
    });
    await installModule('@nuxtjs/tailwindcss');
    await installModule('shadcn-nuxt');
    await installModule('@vueuse/nuxt');
  },
});
