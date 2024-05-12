<script setup>
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'

import { computed, ref, onMounted, watch } from 'vue'
import { getYear } from 'date-fns'

import { objectMap } from '@/util/helpers'
import FormParts from '@/util/student_form_parts'

const emit = defineEmits(['dataChanged'])

const schoolName = ref()
const discontinuationReason = ref()

const address = ref({
  street: { label: 'Blk/Lt/St', data: '' },
  barangay: { label: 'Barangay', data: '' },
  city: { label: 'City', data: '' },
  province: { label: 'Province', data: '' }
})

const selectedType = ref()
const selectedAffiliation = ref()

const selectedEduc = ref()
const selectedLevel = ref()

const selectedYearL = ref()
const selectedYearR = ref()

// eslint-disable-next-line no-unused-vars
const lastYrAttended = computed(() => `${selectedYearL.value} - ${selectedYearR.value}`)

const years = ref([])

const types = ['Public', 'Private']
const affiliations = ['Sectarian', 'Non-Sectarian']

const educAttainment = [
  'No formal education',
  'Primary education',
  'Secondary education',
  'GED',
  'Vocational qualification'
]

const levels = ref(['Kindergarten'])

watch(selectedYearL, (value) => {
  selectedYearR.value = (Number(value) + 1).toString
})

watch(selectedYearR, (value) => {
  selectedYearL.value = (Number(value) - 1).toString
})

function handleUpdate() {
  const data = {
    name: schoolName.value,
    schoolType: selectedType,
    schoolAffiliation: null,
    lastSyAttended: lastYrAttended.value,
    highestEducation: selectedEduc.value,
    gradeStopped: selectedLevel.value,
    reason: discontinuationReason.value,
    ...objectMap(address.value, (field) => field.data)
  }

  emit('dataChanged', FormParts.PrevSchool, data)
}

onMounted(() => {
  const currentYear = getYear(new Date())

  for (let i = currentYear - 120; i <= currentYear + 1; i++) {
    years.value.push(i.toString())
  }

  for (let i = 1; i <= 10; i++) {
    levels.value.push(`Grade ${i}`)
  }
})
</script>

<template>
  <div class="grid grid-cols-2">
    <div class="px-8">
      <div class="grid grid-cols-2 gap-3">
        <div class="flex items-center justify-end pr-6">
          <span>School Name</span>
        </div>
        <InputText
          class="h-10"
          type="text"
          v-model="schoolName"
          @update:model-value="handleUpdate"
        />

        <div class="flex items-center justify-end pr-6">
          <span>Type</span>
        </div>
        <Dropdown class="h-10" v-model="selectedType" :options="types" @change="handleUpdate" />

        <div class="flex items-center justify-end pr-6">
          <span>Affiliation</span>
        </div>
        <Dropdown
          class="h-10"
          v-model="selectedAffiliation"
          :options="affiliations"
          @change="handleUpdate"
        />

        <div class="flex items-center justify-end pr-6">
          <span>Last School Year Attended</span>
        </div>

        <div class="grid grid-cols-5 gap-3">
          <Dropdown
            class="h-10 col-span-2"
            v-model="selectedYearL"
            :options="years.pop()"
            filter
            @change="handleUpdate"
          />
          <span class="flex items-center justify-center">-</span>
          <Dropdown
            class="h-10 col-span-2"
            v-model="selectedYearR"
            :options="years"
            filter
            @change="handleUpdate"
          />
        </div>

        <div class="flex items-center justify-end pr-6">
          <span>Highest Educational Attainment</span>
        </div>
        <Dropdown
          class="h-10"
          v-model="selectedEduc"
          :options="educAttainment"
          @change="handleUpdate"
        />

        <div class="flex items-center justify-end pr-6">
          <span>Grade Year/Level Stopped</span>
        </div>
        <Dropdown class="h-10" v-model="selectedLevel" :options="levels" @change="handleUpdate" />
      </div>
    </div>

    <div class="px-8">
      <div class="grid grid-cols-4 gap-3">
        <div class="flex justify-end pr-6">
          <span>Reason for Discontinuation</span>
        </div>
        <Textarea
          class="col-span-3"
          v-model="discontinuationReason"
          rows="5"
          cols="30"
          @update:model-value="handleUpdate"
        />

        <div class="flex items-center justify-end pr-6">
          <span>Address</span>
        </div>
        <InputText
          v-for="(value, key) of address"
          :key="key"
          class="h-10 col-span-3"
          :class="{ 'col-start-2': value.data !== 'Blk/Lt/St' }"
          type="text"
          v-model="value.data"
          :placeholder="value.label"
          @update:model-value="handleUpdate"
        />
      </div>
    </div>
  </div>
</template>
