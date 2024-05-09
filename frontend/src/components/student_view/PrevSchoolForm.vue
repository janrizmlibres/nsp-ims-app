<script setup>
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
</script>

<template>
  <div class="grid grid-cols-2">
    <div class="px-8">
      <div class="grid grid-cols-2 gap-3">
        <div class="flex items-center justify-end pr-6">
          <span>School Name</span>
        </div>
        <InputText class="h-10" type="text" v-model="value" />

        <div class="flex items-center justify-end pr-6">
          <span>Type</span>
        </div>
        <Dropdown class="h-10" v-model="value" :options="value" />

        <div class="flex items-center justify-end pr-6">
          <span>Last School Year Attended</span>
        </div>

        <div class="grid grid-cols-5 gap-3">
          <Dropdown class="h-10 col-span-2" v-model="value" :options="value" />
          <span class="flex items-center justify-center">-</span>
          <Dropdown class="h-10 col-span-2" v-model="value" :options="value" />
        </div>

        <div class="flex items-center justify-end pr-6">
          <span>Highest Educational Attainment</span>
        </div>
        <Dropdown class="h-10" v-model="value" :options="value" />

        <div class="flex items-center justify-end pr-6">
          <span>Grade Year/Level Stopped</span>
        </div>
        <Dropdown class="h-10" v-model="value" :options="value" />
      </div>
    </div>

    <div class="px-8">
      <div class="grid grid-cols-4 gap-3">
        <div class="flex justify-end pr-6">
          <span>Reason for Discontinuation</span>
        </div>
        <Textarea class="col-span-3" v-model="value" rows="5" cols="30" />

        <div class="flex items-center justify-end pr-6">
          <span>Address</span>
        </div>
        <InputText class="h-10 col-span-3" type="text" v-model="value" />
        <Dropdown class="h-10 col-span-3 col-start-2" v-model="value" :options="value" />
        <Dropdown class="h-10 col-span-3 col-start-2" v-model="value" :options="value" />
        <Dropdown class="h-10 col-span-3 col-start-2" v-model="value" :options="value" />
      </div>
    </div>
  </div>
</template>
