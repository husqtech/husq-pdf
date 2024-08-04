<template>
  <div class="h-full">
    <scroll-area class="h-full p-2">
      <p class="sticky text-sm">Document Props</p>
      <props-tree-entry :schema="schema.properties" :indent-level="0"/>
    </scroll-area>
  </div>
</template>

<script setup lang="ts">
const {schema} = await useDocumentPropsOptions()
</script>

<style scoped>

</style>