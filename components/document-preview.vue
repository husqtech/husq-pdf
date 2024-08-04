<template>
  <div class="h-full bg-primary-foreground">
    <scroll-area class="h-full">
      <div
          v-if="status === 'pending'"
          class="absolute left-1/2 z-10 mt-6 -translate-x-1/2"
      >
        <div
            class="flex items-center gap-2 rounded-full border bg-background p-2 px-4 animate-in slide-in-from-top-3"
        >
          <Loader2 class="size-3 animate-spin text-primary" />
          <span class="text-sm">Refreshing document...</span>
        </div>
      </div>

      <div>
        <div v-if="status === 'pending' && !document" class="space-y-4 p-8">
          <skeleton class="mx-auto h-[842px] w-[595px]"/>
          <skeleton class="mx-auto h-[842px] w-[595px]"/>
        </div>
        <div v-else class="py-8 drop-shadow-md">
          <div v-for="(_, index) in document.pages" :key="index" class="mb-4">
            <VuePDF
                :pdf="document.pdf"
                :page="index + 1"
                class="!flex justify-center"
            />
          </div>
        </div>
      </div>
    </scroll-area>
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import {usePDF, VuePDF} from "@tato30/vue-pdf";
import {ScrollArea} from "~/components/ui/scroll-area";
const {props} = usePropOptions()
async function getPdfFile(): Promise<any> {
  const response = await fetch(`/api/render/${useCurrentDocument()}`, {
    method: "POST",
    body: JSON.stringify(props),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const arrayBuf = await response.arrayBuffer();
  const uint8 = new Uint8Array(arrayBuf);
  return usePDF(uint8);
}

const {status, data: document} = useAsyncData("document-preview", getPdfFile);
</script>

<style scoped>

</style>