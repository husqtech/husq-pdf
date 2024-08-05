import {compileFromFile} from 'json-schema-to-typescript';
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import {defineNuxtModule, createResolver} from '@nuxt/kit';
import type {ViteDevServer} from "vite";


export default defineNuxtModule({
    meta: {
        name: 'schema-to-ts-interface',
    },
    defaults: {},
    setup(_, nuxt) {
        const resolver = createResolver(import.meta.url);
        const schemaDir = resolver.resolve(nuxt.options.rootDir, 'schema');
        const typesDir = resolver.resolve(nuxt.options.rootDir, '.types');

        if (!fs.existsSync(typesDir)) {
            fs.mkdirSync(typesDir);
        }

        convertAllSchemas(schemaDir, typesDir);

        nuxt.hook('vite:serverCreated', (viteServer: ViteDevServer) => {
            // Function to trigger HMR
            const triggerHMR = () => {
                viteServer.ws.send({
                    type: 'update',
                    updates: [
                        {
                            type: 'js-update',
                            timestamp: Date.now(),
                            path: '/layouts/develop.vue',
                            acceptedPath: '/layouts/develop.vue'
                        }
                    ]
                });
            }

            if (nuxt.options.dev) {
                chokidar.watch(schemaDir).on('change', (filePath: string) => {
                    const file = path.basename(filePath);
                    if (file.endsWith('.json')) {
                        convertSchema(file, schemaDir, typesDir);
                        triggerHMR()
                    }
                });
            }
        })
    },
});

async function convertSchema(file: string, schemaDir: string, typesDir: string): Promise<void> {
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

        const interfaceName = extractInterfaceName(ts);
        if (interfaceName) {
            const tsContent = generateTSContent(fileName, interfaceName);
            fs.writeFileSync(outputTSPath, tsContent);
            console.log(`Created ${outputTSPath}`);
        } else {
            console.error(`Could not find interface name in generated .d.ts for ${file}`);
        }
    } catch (error) {
        console.error(`Error converting ${file}:`, error);
    }
}

function convertAllSchemas(schemaDir: string, typesDir: string): void {
    fs.readdirSync(schemaDir).forEach((file: string) => {
        if (file.endsWith('.json')) {
            convertSchema(file, schemaDir, typesDir);
        }
    });
}

function extractInterfaceName(tsContent: string): string | null {
    const match = tsContent.match(/export interface (\w+)/);
    return match ? match[1] : null;
}

function generateTSContent(fileName: string, interfaceName: string): string {
    const propsName = `${fileName.charAt(0).toUpperCase() + fileName.slice(1)}Props`;

    return `
import type { ${interfaceName} } from './${fileName}.d';
export type { ${interfaceName} as ${propsName} };
    `.trim();
}
