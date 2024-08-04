import { compileFromFile } from 'json-schema-to-typescript';
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import { defineNuxtModule, createResolver } from '@nuxt/kit';

export default defineNuxtModule({
    meta: {
        name: 'schema-to-ts-interface',
    },
    defaults: {},
    setup(options, nuxt) {
        const resolver = createResolver(import.meta.url);
        const schemaDir = resolver.resolve(nuxt.options.rootDir, 'schema');
        const typesDir = resolver.resolve(nuxt.options.rootDir, '.types');

        if (!fs.existsSync(typesDir)) {
            fs.mkdirSync(typesDir);
        }

        async function convertSchema(file: string): Promise<void> {
            const filePath = path.resolve(schemaDir, file);
            const outputPath = path.resolve(typesDir, file.replace('.json', '.ts'));
            try {
                const ts = await compileFromFile(filePath);
                fs.writeFileSync(outputPath, ts);
                console.log(`Converted ${file} to ${outputPath}`);
            } catch (error) {
                console.error(`Error converting ${file}:`, error);
            }
        }

        function convertAllSchemas(): void {
            fs.readdirSync(schemaDir).forEach((file: string) => {
                if (file.endsWith('.json')) {
                    convertSchema(file);
                }
            });
        }

        convertAllSchemas();

        if (nuxt.options.dev) {
            chokidar.watch(schemaDir).on('change', (filePath: string) => {
                const file = path.basename(filePath);
                if (file.endsWith('.json')) {
                    convertSchema(file);
                }
            });
        }
    },
});