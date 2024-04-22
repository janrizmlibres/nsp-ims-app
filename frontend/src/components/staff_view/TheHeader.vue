<script setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import TopHeader from '../UI/TopHeader.vue'
</script>

<template>
  <div class="flex h-1/4">
    <TopHeader class="grow" header="Staff Management" />

    <div class="mb-2">
      <div class="float-right">
        <span class="relative">
          <font-awesome-icon
            icon="fa-solid fa-magnifying-glass"
            class="absolute top-2/4 -mt-2 left-3"
          />
          <InputText v-model="value1" placeholder="Search Staff" size="small" class="pl-10" />
        </span>
        <Button icon="fa-solid fa-user-plus" aria-label="Submit" class="ml-2 h-10" />
        <Button label="Export Data" icon="fa-solid fa-file-export" class="ml-2 h-10" />
      </div>
    </div>
  </div>
</template>
