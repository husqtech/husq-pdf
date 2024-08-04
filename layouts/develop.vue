<script setup lang="ts">

import DocumentPropsEditor from "~/components/document-props-editor.vue";
</script>

<template>
  <div>
    <div class="flex flex-col h-screen">
      <app-header/>

      <div class="flex-1">
        <div class="h-full relative">
          <div class="absolute top-0 bottom-0 w-screen">
            <resizable-panel-group direction="horizontal">
              <resizable-panel>
                <document-props-editor/>
                <div class="hidden">
                  <slot/> <!-- this is to run the props logic -->
                </div>
              </resizable-panel>
              <resizable-handle/>
              <resizable-panel>
                <document-preview/>
              </resizable-panel>
              <resizable-handle/>
              <resizable-panel>Three</resizable-panel>
            </resizable-panel-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
