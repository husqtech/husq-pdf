<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout :name="layout" class="h-screen">
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  const layout = useLayoutMode()
</script>
