<script setup>
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
</script>

<template>
  <div class="grid grid-cols-2">
    <div class="px-8">
      <div>
        <h2 class="font-bold text-center">Personal Contact Information</h2>

        <div class="grid grid-cols-5 gap-3 mt-4">
          <div class="flex items-center justify-end pr-6 col-span-2">
            <span>Contact Number</span>
          </div>
          <InputText class="h-10 col-span-3" type="text" v-model="value" />

          <div class="flex items-center justify-end pr-6 col-span-2">
            <span>Email Address</span>
          </div>
          <InputText class="h-10 col-span-3" type="text" v-model="value" />

          <div class="flex items-center justify-end pr-6 col-span-2">
            <span>Facebook</span>
          </div>
          <InputText class="h-10 col-span-3" type="text" v-model="value" />
        </div>
      </div>
    </div>

    <div class="px-8">
      <div>
        <h2 class="font-bold text-center">Emergency Contact Person</h2>

        <div class="grid grid-cols-5 gap-3 mt-4">
          <div class="flex items-center justify-end pr-6 col-span-2">
            <span>Last Name</span>
          </div>
          <InputText class="h-10 col-span-3" type="text" v-model="value" />

          <div class="flex items-center justify-end pr-6 col-span-2">
            <span>First Name</span>
          </div>
          <InputText class="h-10 col-span-3" type="text" v-model="value" />

          <div class="flex items-center justify-end pr-6 col-span-2">
            <span>Middle Name</span>
          </div>
          <InputText class="h-10 col-span-3" type="text" v-model="value" />

          <div class="flex items-center justify-end pr-6 col-span-2">
            <span>Suffix</span>
          </div>
          <InputText class="h-10 col-span-3" type="text" v-model="value" />

          <div class="flex items-center justify-end pr-6 col-span-2">
            <span>Contact Number</span>
          </div>
          <InputText class="h-10 col-span-3" type="text" v-model="value" />

          <div class="flex items-center justify-end pr-6 col-span-2">
            <span>Relationship</span>
          </div>
          <Dropdown class="h-10 col-span-3" v-model="value" :options="value" />
        </div>
      </div>
    </div>
  </div>
</template>
