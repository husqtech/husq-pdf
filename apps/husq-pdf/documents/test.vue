<template>
  <div class="p-5">
    <p class="text-3xl">This is a test Document</p>
    <p class="text-2xl">{{props.name}}</p>
    <p class="text-2xl">{{props.metadata?.author?.name}}</p>
    <br>
    <h1 class="text-3xl break-after-page">Tag List:</h1>
    <p v-for="tag in props.tags">
      <p>{{tag}}</p>
    </p>
  </div>
</template>

<script setup lang="ts">
  import type {TestProps} from "~/.types/test";

  const props = useDocumentProps<TestProps>()
</script>

<style scoped>
</style>