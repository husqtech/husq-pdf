<template>
  <div class="h-full">
    <scroll-area class="h-full">
      <div class="p-3">
        <p class="sticky text-sm">Prop Options</p>
        <div v-if="selectedProp?.key">
          <div v-if="selectedProp.subSchema.type == 'object'">
            <div v-for="(value, key) in selectedProp.subSchema.properties" :key="key">
              <Label :for="key">{{ key }}</Label>
              <Input :id="key" placeholder="null"
                     v-on:update:modelValue="(val: string) => updatePropValue(key.toString(), val)"/>
            </div>
          </div>

          <div v-else>
            <Label for="input">{{ selectedProp!.key }}</Label>
            <Input id="input" placeholder="null"
                   v-on:update:modelValue="(val: string) => updatePropValue(selectedProp!.key, val)"/>
          </div>
        </div>
      </div>
    </scroll-area>
  </div>
</template>

<script setup lang="ts">
import type {Ref} from "vue";

const {props, selectedProp, updatePropValue} = usePropOptions()


const {fetchSchema} = usePropOptions()
const schema: Ref<any> = ref(await fetchSchema())
</script>

<style scoped>

</style>