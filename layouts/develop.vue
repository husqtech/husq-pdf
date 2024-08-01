<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col h-screen">
    <app-header class="flex-none"/>

    <div class="flex-grow">
      <resizable-panel-group direction="horizontal" class="h-full">
        <resizable-panel>One</resizable-panel>
        <resizable-handle />
        <resizable-panel>
          <document-preview>
            <slot/>
          </document-preview>
        </resizable-panel>
        <resizable-handle />
        <resizable-panel>Three</resizable-panel>
      </resizable-panel-group>
    </div>
  </div>
</template>
