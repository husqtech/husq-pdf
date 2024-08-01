<script setup lang="ts">
import {usePDF, VuePDF} from "@tato30/vue-pdf";
import {ScrollArea} from "~/components/ui/scroll-area";

async function getPdfFile(): Promise<any> {
  const response = await fetch(`/api/render/${useCurrentDocument()}`, {
    method: "POST",
    body: "",
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


<template>
  <div class="h-full">
    <scroll-area class="h-full">
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

<style scoped>

</style>