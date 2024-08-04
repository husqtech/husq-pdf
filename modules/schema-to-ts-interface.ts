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
            const fileName = path.basename(file, '.json');
            const outputDTSPath = path.resolve(typesDir, `${fileName}.d.ts`);
            const outputTSPath = path.resolve(typesDir, `${fileName}.ts`);

            try {
                const ts = await compileFromFile(filePath, {
                    bannerComment: '',
                    declareExternallyReferenced: true,
                });

                fs.writeFileSync(outputDTSPath, ts);
                console.log(`Converted ${file} to ${outputDTSPath}`);

                const interfaceNameMatch = ts.match(/export interface (\w+)/);
                if (interfaceNameMatch) {
                    const interfaceName = interfaceNameMatch[1];
                    const tsContent = `import type { ${interfaceName} } from './${fileName}.d';\nexport type { ${interfaceName} as ${fileName.charAt(0).toUpperCase() + fileName.slice(1)}Props };`;
                    fs.writeFileSync(outputTSPath, tsContent);
                    console.log(`Created ${outputTSPath}`);
                } else {
                    console.error(`Could not find interface name in generated .d.ts for ${file}`);
                }
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
