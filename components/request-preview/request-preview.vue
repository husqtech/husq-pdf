<template>
  <div class="h-full w-full flex flex-col">
    <div class="p-3 pb-0">
      <p class="text-sm font-semibold">Request Preview</p>
      <separator class="my-2"/>
    </div>
    <scroll-area class="flex-1">
      <div class="p-3 pt-0">
        <div class="border rounded p-2 font-mono relative select-auto bg-primary-foreground">
          <span class="absolute left-2 text-primary">curl</span>
          <div class="ml-11 whitespace-pre-wrap break-all text-opacity-70 dark:text-opacity-70 text-black dark:text-white">
            <span>-X POST {{ currentURL }}/api/render/{{ useCurrentDocument() }} \</span>
            <br>
            <span>-H "Content-Type: application/json" \</span>
            <br>
            <span>-d </span>
            <span class="text-black dark:text-white">'{{ JSON.stringify(props, null, 2) }}'</span>
          </div>
        </div>
      </div>
    </scroll-area>
  </div>
</template>

<script setup lang="ts">
const {props} = usePropOptions()
const currentURL = ref('')

onMounted(() => {
  currentURL.value = window.location.origin
})
</script>

<style scoped>

</style>