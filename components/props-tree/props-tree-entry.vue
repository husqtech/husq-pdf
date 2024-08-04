<template>
  <div class="flex flex-col gap-1 mt-1">
    <div v-for="(value, key) in schema" :key="key">
      <collapsible class="w-full" v-model:open="openStates[key]">
        <collapsible-trigger class="w-full flex items-center gap-1.5 hover:bg-accent px-2 py-1 rounded"
                             v-on:click="selectProp(getFullKey(key), value)">
          <div class="ml-5" v-for="i in indentLevel" :key="i"/>

          <div class="size-4 mr-1">
            <div v-if="isCollapsible(value)">
              <ChevronRight v-if="!openStates[key]" class="size-full text-primary"/>
              <ChevronDown v-else class="size-full text-primary"/>
            </div>
          </div>

          <div>
            <Folder v-if="isCollapsible(value)" class="size-4 text-primary"/>
            <Code v-else class="size-4 text-primary"/>
          </div>

          <div class="flex flex-1 justify-between">
            <div>{{ key }}</div>
            <div>
              <span class="truncate ml-5">{{ value.type }}{{ value.format ? ` (${value.format})` : '' }}</span>
            </div>
          </div>
        </collapsible-trigger>

        <collapsible-content>
          <template v-if="value.type === 'object'">
            <props-tree-entry :schema="value.properties" :root-key-path="getFullKey(key)"
                              :indent-level="indentLevel + 1"/>
          </template>
          <template v-else-if="value.type === 'array'">
            <props-tree-entry :schema="value.items" :root-key-path="getFullKey(key)"
                              :indent-level="indentLevel + 1"/>
          </template>
        </collapsible-content>
      </collapsible>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ChevronDown, ChevronRight, Code, Folder} from "lucide-vue-next";
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

const isCollapsible = (value: any) => {
  return value.type === 'object' || value.type === 'array';
};

const {selectProp} =  usePropOptions()

const getFullKey = (key: string | number): string => {
  if(props.rootKeyPath == ""){
    return key.toString()
  }

  return `${props.rootKeyPath}.${key}`
}
</script>
