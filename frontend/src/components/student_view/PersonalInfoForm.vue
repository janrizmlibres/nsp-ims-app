<script setup>
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'

import { ref } from 'vue'

const selectedSex = ref()
const selectedBloodType = ref()
const selectedCivilStat = ref()

const sex = ref(['M', 'F'])
const bloodTypes = ref(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
const civilStatus = ref(['Married', 'Widowed', 'Separated', 'Divorced', 'Single'])
</script>

<template>
  <div class="grid grid-cols-2">
    <div class="px-8">
      <div class="grid grid-cols-4 gap-3">
        <div class="flex items-center justify-end pr-6">
          <span>Sex</span>
        </div>

        <div class="col-span-3 grid grid-cols-3 gap-6">
          <Dropdown class="h-10" v-model="selectedSex" :options="sex" />

          <div class="flex items-center justify-end">
            <span>Blood Type</span>
          </div>
          <Dropdown class="h-10" v-model="selectedBloodType" :options="bloodTypes" />
        </div>

        <div class="flex items-center justify-end pr-6">
          <span>Civil Status</span>
        </div>
        <Dropdown class="h-10 col-span-3" v-model="selectedCivilStat" :options="civilStatus" />

        <div class="flex items-center justify-end pr-6">
          <span>Date of Birth</span>
        </div>
        <div class="col-span-3 grid grid-cols-3 gap-6">
          <Dropdown class="h-10" v-model="value" :options="value" />
          <Dropdown class="h-10" v-model="value" :options="value" />
          <Dropdown class="h-10" v-model="value" :options="value" />
        </div>

        <div class="flex items-center justify-end pr-6">
          <span>Place of Birth</span>
        </div>
        <Dropdown class="h-10 col-span-3" v-model="value" :options="value" />
        <Dropdown class="h-10 col-span-3 col-start-2" v-model="value" :options="value" />
        <Dropdown class="h-10 col-span-3 col-start-2" v-model="value" :options="value" />
      </div>
    </div>

    <div class="px-8">
      <div class="grid grid-cols-4 gap-3">
        <div class="flex items-center justify-end pr-6">
          <span>Religion</span>
        </div>
        <Dropdown class="h-10 col-span-3" v-model="value" :options="value" />

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
