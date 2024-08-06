<template>
  <div class="h-full">
    <scroll-area class="h-full p-3">
      <p class="sticky text-sm">Document Props</p>
      <separator class="my-2"/>
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