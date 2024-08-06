<script setup lang="ts">
import PropsTree from "~/components/props-tree/props-tree.vue";
</script>

<template>
  <div>
    <TooltipProvider>
      <div class="flex flex-col h-screen">
        <app-header/>

        <div class="flex-1">
          <div class="h-full relative">
            <div class="absolute top-0 bottom-0 w-screen">
              <resizable-panel-group direction="horizontal">
                <resizable-panel :min-size="10">
                  <props-tree/>
                  <div class="hidden">
                    <slot/> <!-- this is to run the props logic -->
                  </div>
                </resizable-panel>
                <resizable-handle/>
                <resizable-panel :min-size="10" :default-size="40">
                  <document-preview/>
                </resizable-panel>
                <resizable-handle/>
                <resizable-panel :min-size="10">
                  <resizable-panel-group direction="vertical">
                    <resizable-panel :min-size="10">
                      <prop-options/>
                    </resizable-panel>
                    <resizable-handle/>
                    <resizable-panel :min-size="10" :default-size="25">
                      <request-preview/>
                    </resizable-panel>
                  </resizable-panel-group>
                </resizable-panel>
              </resizable-panel-group>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  </div>
</template>
