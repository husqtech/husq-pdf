<template>
  <div class="h-full">
    <scroll-area class="h-full">
      <div class="p-3">
        <p class="sticky text-sm">Prop Options</p>
        <div v-if="selectedProp?.key">
          <div v-if="selectedProp.subSchema.type == 'object'">
            <div v-for="(value, key) in selectedProp.subSchema.properties" :key="key">
              <Label :for="key">{{ key }}</Label>
              <Input :id="key" placeholder="null" :default-value="getNestedValue(key)"
                     v-on:update:modelValue="(val: string) => updatePropValue(key.toString(), val)"/>
            </div>
          </div>

          <div v-else-if="selectedProp.subSchema.type == 'array'">
            <div v-for="(value, key) in selectedProp.subSchema" :key="key">
              <Label :for="key">{{ key }}</Label>
              <Input :id="key" placeholder="null" :default-value="getNestedValue(key)"
                     v-on:update:modelValue="(val: string) => updatePropValue(key.toString(), val)"/>
            </div>
          </div>

          <div v-else>
            <Label for="input">{{ selectedProp!.key }}</Label>
            <Input id="input" placeholder="null" :default-value="getNestedValue(selectedProp!.key)"
                   v-on:update:modelValue="(val: string) => updatePropValue(selectedProp!.key, val)"/>
          </div>

          {{ props }}
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

const getNestedValue = (key: string | number) => {
  const keyString = key.toString()
  if (keyString.includes('.')) {
    return keyString.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : null, props);
  } else {
    return props[keyString] !== undefined ? props[keyString] : null;
  }
}
</script>

<style scoped>

</style>