<template>
  <div class="h-full">
    <scroll-area class="h-full">
      <div class="p-3">
        <p class="sticky text-sm mb-2">Prop Options</p>
        <div v-if="selectedProp?.key">

          <!-- Object -->
          <div v-if="selectedProp.subSchema.type == 'object'">
            <div v-for="(value, key) in selectedProp.subSchema.properties" :key="key">
              <div v-if="value.type == 'object'">
                <Button class="w-full" variant="outline" v-on:click="selectProp(`${selectedProp!.key}.${key}`, value)">{{ `Open child "${key}"` }}</Button>
              </div>
              <div v-else>
                <Label>{{ `${selectedProp!.key}.${key}` }}</Label>
                <Input placeholder="null" :default-value="getNestedValue(`${selectedProp!.key}.${key}`)"
                       v-on:update:modelValue="(val: string) => updatePropValue(`${selectedProp!.key}.${key}`, val)"/>
              </div>
            </div>
          </div>

          <!-- Array -->
          <div v-else-if="selectedProp.subSchema.type == 'array'">
            <div v-for="(value, i) in getNestedValue(selectedProp.key, [])" :key="selectedProp!.key">
              <Label>{{ `${selectedProp?.key}[${i}]` }}</Label>
              <Input placeholder="null" :default-value="value"
                     v-on:update:modelValue="(val: string) => updatePropValue(`${selectedProp?.key}`, updateArray(getNestedValue(selectedProp!.key), i, val))"/>
            </div>
            <Button class="w-full" variant="outline"
                    v-on:click="updatePropValue(`${selectedProp.key}`,
                    (getNestedValue(`${selectedProp.key}`, []) as any[]).concat([null]))">
              {{ `Add Item` }}
            </Button>

          </div>

          <!-- Single Field -->
          <div v-else :key="selectedProp!.key">
            <Label>{{ selectedProp!.key }}</Label>
            <Input placeholder="null" :default-value="getNestedValue(selectedProp.key)"
                   v-on:update:modelValue="(val: string) => updatePropValue(selectedProp!.key, val)"/>
          </div>
        </div>
      </div>
    </scroll-area>
  </div>
</template>

<script setup lang="ts">

import {Button} from "~/components/ui/button";

const {props, selectedProp, updatePropValue, selectProp} = usePropOptions()

const getNestedValue = (key: string | number, defaultValue?: any) => {
  const keyString = key.toString()
  if (keyString.includes('.')) {
    return keyString.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : defaultValue, props);
  } else {
    return props[keyString] !== undefined ? props[keyString] : defaultValue;
  }
}

const updateArray = (arr: any[], i: number, val: any) => {
  arr[i] = val
  return arr
}
</script>

<style scoped>

</style>