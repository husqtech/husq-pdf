<template>
  <div class="h-full bg-primary-foreground w-full">
    <scroll-area class="h-full w-full">
      <div
          v-if="status === 'pending'"
          class="absolute left-1/2 z-10 mt-6 -translate-x-1/2"
      >
        <div
            class="flex items-center gap-2 rounded-full border bg-background p-2 px-4 animate-in slide-in-from-top-3"
        >
          <Loader2 class="size-3 animate-spin text-primary"/>
          <span class="text-sm">Refreshing document...</span>
        </div>
      </div>


      <div
          class="absolute bottom-4 right-4 z-10 flex w-fit flex-col gap-0.5"
      >
        <Button
            variant="outline"
            class="h-fit p-2"
            @click="modifyPreviewScale(0.1)"
        >
          <Plus class="size-4"/>
        </Button>
        <Button
            variant="outline"
            class="h-fit p-2"
            @click="modifyPreviewScale(-0.1)"
        >
          <Minus class="size-4"/>
        </Button>
      </div>

      <div>
        <div v-if="status === 'pending' && !document" class="space-y-4 p-8">
          <skeleton class="mx-auto h-[842px] w-[595px]"/>
          <skeleton class="mx-auto h-[842px] w-[595px]"/>
        </div>
        <div v-else class="py-8 drop-shadow-md mx-4">
          <div v-for="(_, index) in document.pages" :key="index" class="mb-4">
            <VuePDF
                :scale="previewScale"
                :pdf="document.pdf"
                :page="index + 1"
                class="!flex justify-center"
            />
          </div>
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </scroll-area>
  </div>
</template>

<script setup lang="ts">
import {Loader2, Minus, Plus} from "lucide-vue-next";
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

const previewScale: Ref<number> = ref(1);
const modifyPreviewScale = (mod: number) => {
  const newScale = previewScale.value + mod;
  if (newScale >= 0.2 && newScale <= 2) {
    previewScale.value = newScale;
  }
};

const {status, data: document} = useAsyncData("document-preview", getPdfFile);
</script>

<style scoped>

</style>