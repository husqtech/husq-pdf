<template>
  <div class="flex flex-col gap-1 mt-1">
    <div v-for="(value, key) in schema" :key="key">
      <collapsible class="w-full" v-model:open="openStates[key]">
        <div class="w-full flex items-center gap-1.5 cursor-pointer
        hover:bg-accent px-2 py-1 rounded" :class="selectedProp?.key == key ? 'bg-accent' : ''"
                             v-on:click="selectProp(getFullKey(key), value)" v-on:dblclick="openStates[key] = !openStates[key]">
          <div class="ml-5" v-for="i in indentLevel" :key="i"/>
          <collapsible-trigger class="size-5 mr-1">
            <div v-if="isTypeObject(value)" class="size-4">
              <ChevronRight v-if="!openStates[key]" class="size-full text-primary"/>
              <ChevronDown v-else class="size-full text-primary"/>
            </div>
          </collapsible-trigger>

          <div>
            <Folder v-if="isTypeObject(value)" class="size-4 text-primary"/>
            <Brackets v-else-if="isTypeArray(value)" class="size-4 text-primary"/>
            <Code v-else class="size-4 text-primary"/>
          </div>

          <div class="flex flex-1 justify-between select-none">
            <div>{{ key }}</div>
            <div>
              <span class="truncate ml-5">
                {{ value.type }}
                {{ value.format ? ` (${value.format})` : '' }}
                {{ value?.items?.type ? ` (${value.items.type})` : '' }}
              </span>
            </div>
          </div>
        </div>

        <collapsible-content>
          <template v-if="value.type === 'object'">
            <props-tree-entry :schema="value.properties" :root-key-path="getFullKey(key)"
                              :indent-level="indentLevel + 1"/>
          </template>
        </collapsible-content>
      </collapsible>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ChevronDown, ChevronRight, Code, Folder, Brackets} from "lucide-vue-next";
import {Collapsible, CollapsibleTrigger, CollapsibleContent} from "~/components/ui/collapsible";
import {ref} from 'vue';

interface Schema {
  [key: string]: any;
}

const props = defineProps<{ schema: Schema, indentLevel: number, rootKeyPath: string }>();

const openStates = ref<{ [key: string]: boolean }>({});

for (const key in props.schema) {
  openStates.value[key] = false;
}

const isTypeObject = (value: any) => {
  return value.type === 'object';
};
const isTypeArray = (value: any) => {
  return value.type === 'array';
};

const {selectedProp, selectProp} = usePropOptions()

const getFullKey = (key: string | number): string => {
  if (props.rootKeyPath == "") {
    return key.toString()
  }

  return `${props.rootKeyPath}.${key}`
}
</script>
