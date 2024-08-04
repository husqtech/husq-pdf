<template>
  <div class="h-full">
    <scroll-area class="h-full p-2">
      <p class="sticky text-sm">Document Props</p>
      <props-tree-entry :schema="schema.properties" :indent-level="0" root-key-path=""/>
    </scroll-area>
  </div>
</template>

<script setup lang="ts">
import type {Ref} from "vue";
const {fetchSchema} = useDocumentPropsOptions()
const schema: Ref<any> = ref(await fetchSchema())
</script>

<style scoped>

</style>