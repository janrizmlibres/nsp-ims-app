<template>
  <div>
    <div class="flex">
      <div class="grow text-4xl">
        <h1>Staff Management</h1>
      </div>

      <div class="flex gap-6">
        <div>
          <font-awesome-icon icon="fa-solid fa-gear" />
          <span class="ml-1.5">Settings</span>
        </div>

        <div>
          <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
          <span class="ml-1.5">Logout</span>
        </div>
      </div>
    </div>

    <div>
      <div>
        <span class="relative">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          <InputText v-model="temp" placeholder="Search" class="pl-10" />
        </span>
        <Button icon="pi pi-check" aria-label="Submit" />
        <Button label="Submit" icon="pi pi-check" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const temp = ref('')
</script>
