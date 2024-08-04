<template>
  <div class="h-full">
    <scroll-area class="h-full p-2">
      <p class="sticky text-sm">Document Props</p>
      {{propOptionFields}}
    </scroll-area>
  </div>
</template>

<script setup lang="ts">
 const {propOptionFields} = useDocumentPropsOptions()
</script>

<style scoped>

</style>