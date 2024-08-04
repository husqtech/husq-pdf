<template>
  <div class="p-5">
    <p class="text-3xl">This is a test Document</p>
    <p class="text-3xl">This is a test Document</p>
    <p class="text-2xl">{{props.name}}</p>
    <p class="text-2xl">{{props.car}}</p>
  </div>
</template>

<script setup lang="ts">
  import type {TestProps} from "~/.types/test";

  const props = useDocumentProps<TestProps>()
</script>

<style scoped>
</style>