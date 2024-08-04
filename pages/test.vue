<template>
  <p class="text-3xl">This is a test Document</p>
  <p class="text-2xl">{{props.name}}</p>
</template>

<script setup lang="ts">
  import type {TestProps} from "~/.types/test";

  const props = useDocumentProps<TestProps>()

</script>

<style scoped>
</style>