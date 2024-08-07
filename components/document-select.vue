<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-[250px] justify-between"
      >
        {{ currentDocument }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[250px] p-0">
      <Command>
        <CommandInput class="h-9" placeholder="Search document..." />
        <CommandEmpty>No documents found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
                v-for="pdf in documentRoutes"
                :key="pdf.label"
                :value="pdf.value"
                @select="(ev) => selectDocument(ev)"
            >
              {{ pdf.label }}
              <Check
                  :class="
                           cn(
                              'ml-auto h-4 w-4',
                              currentDocument === pdf.label
                                 ? 'opacity-100'
                                 : 'opacity-0',
                           )
                        "
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { Check, ChevronsUpDown } from "lucide-vue-next";
import {cn} from "~/lib/utils";

const documentRoutes: Ref<{ value: string; label: string }[]> = ref([]);

const open = ref(false);
const currentDocument: Ref<string | undefined> = ref("");

onMounted(() => {
  documentRoutes.value = useRouter()
      .getRoutes()
      .map((route) => {
        return {
          value: route.path,
          label: route.path.split("/").filter(Boolean).pop()!,
        };
      });

  currentDocument.value = useCurrentDocument();
});

const selectDocument = (ev: any) => {
  navigateTo(`${ev.detail.value}#develop`, {external: true});
  open.value = false;
};
</script>