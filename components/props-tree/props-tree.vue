<template>
  <div class="h-full w-full flex flex-col">
    <div class="p-3 pb-0">
      <p class="text-sm font-semibold">Document Props</p>
      <separator class="my-2"/>
    </div>
    <scroll-area class="flex-1 p-3 pt-0 -mt-1">
      <props-tree-entry :schema="schema.properties" :indent-level="0" root-key-path=""/>
    </scroll-area>
  </div>
</template>

<script setup lang="ts">
import type {Ref} from "vue";
import {Separator} from "~/components/ui/separator";
const {fetchSchema} = usePropOptions()
const schema: Ref<any> = ref(await fetchSchema())
</script>

<style scoped>

</style>