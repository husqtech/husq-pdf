<template>
  <div class="p-5">
    <h1>Invoice</h1>
    <p>Id: {{props.id}}</p>
    <p>Name: {{props.name?.firstname}} {{props.name?.lastname}}</p>
  </div>
</template>

<script setup lang="ts">
  import type {InvoiceProps} from "~/.types/invoice";

  const props = useDocumentProps<InvoiceProps>()
</script>

<style scoped>
</style>