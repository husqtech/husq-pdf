<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout :name="layout" class="h-screen">
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  import {useLayoutMode} from "./composables/useLayoutMode";
  import {useTheme} from "./composables/useTheme";

  const layout = useLayoutMode()
  useTheme()
</script>
