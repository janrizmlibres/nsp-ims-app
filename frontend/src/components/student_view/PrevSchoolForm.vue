<script setup>
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'

import { computed, ref } from 'vue'

const schoolName = ref()
const discontinuationReason = ref()

const address = ref({
  blk: '',
  barangay: '',
  city: '',
  province: ''
})

const selectedType = ref()
const selectedEduc = ref()
const selectedLevel = ref()

const selectedYearL = ref()
const selectedYearR = ref()

// eslint-disable-next-line no-unused-vars
const lastYrAttended = computed(() => `${selectedYearL.value} - ${selectedYearR.value}`)

const types = [
  'Public Sectarian',
  'Public Non-Sectarian',
  'Private Sectarian',
  'Private Non-Sectarian'
]
const educAttainment = [
  'No formal education',
  'Primary education',
  'Secondary education',
  'GED',
  'Vocational qualification'
]
const levels = [
  'Kindergarten',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10'
]
</script>

<template>
  <div class="grid grid-cols-2">
    <div class="px-8">
      <div class="grid grid-cols-2 gap-3">
        <div class="flex items-center justify-end pr-6">
          <span>School Name</span>
        </div>
        <InputText class="h-10" type="text" v-model="schoolName" />

        <div class="flex items-center justify-end pr-6">
          <span>Type</span>
        </div>
        <Dropdown class="h-10" v-model="selectedType" :options="types" />

        <div class="flex items-center justify-end pr-6">
          <span>Last School Year Attended</span>
        </div>

        <div class="grid grid-cols-5 gap-3">
          <Calendar
            class="h-10 col-span-2"
            v-model="selectedYearL"
            view="year"
            dateFormat="yy"
            placeholder="Year"
          />
          <span class="flex items-center justify-center">-</span>
          <Calendar
            class="h-10 col-span-2"
            v-model="selectedYearR"
            view="year"
            dateFormat="yy"
            placeholder="Year"
          />
        </div>

        <div class="flex items-center justify-end pr-6">
          <span>Highest Educational Attainment</span>
        </div>
        <Dropdown class="h-10" v-model="selectedEduc" :options="educAttainment" />

        <div class="flex items-center justify-end pr-6">
          <span>Grade Year/Level Stopped</span>
        </div>
        <Dropdown class="h-10" v-model="selectedLevel" :options="levels" />
      </div>
    </div>

    <div class="px-8">
      <div class="grid grid-cols-4 gap-3">
        <div class="flex justify-end pr-6">
          <span>Reason for Discontinuation</span>
        </div>
        <Textarea class="col-span-3" v-model="discontinuationReason" rows="5" cols="30" />

        <div class="flex items-center justify-end pr-6">
          <span>Address</span>
        </div>
        <InputText
          class="h-10 col-span-3"
          type="text"
          v-model="address.blk"
          placeholder="Blk/Lt/St"
        />
        <InputText
          class="h-10 col-span-3 col-start-2"
          type="text"
          v-model="address.barangay"
          placeholder="Barangay"
        />
        <InputText
          class="h-10 col-span-3 col-start-2"
          type="text"
          v-model="address.city"
          placeholder="City"
        />
        <InputText
          class="h-10 col-span-3 col-start-2"
          type="text"
          v-model="address.province"
          placeholder="Province"
        />
      </div>
    </div>
  </div>
</template>
