<script setup>
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'

import { ref, onMounted, watch, computed, inject } from 'vue'
import { getYear } from 'date-fns'

import { objectMap } from '@/util/helpers'
import FormParts from '@/util/student_form_parts'

const emit = defineEmits(['dataChanged'])

const prevSchoolData = inject('prevSchoolData')
const isViewMode = inject('isViewMode')

const schoolName = ref(prevSchoolData.value.name)
const discontinuationReason = ref(prevSchoolData.value.reason)

const address = ref({
  street: { label: 'Blk/Lt/St', data: prevSchoolData.value.street },
  barangay: { label: 'Barangay', data: prevSchoolData.value.barangay },
  city: { label: 'City', data: prevSchoolData.value.city },
  province: { label: 'Province', data: prevSchoolData.value.province }
})

const selectedType = ref(prevSchoolData.value.schoolType)
const selectedAffiliation = ref(prevSchoolData.value.schoolAffiliation)

const selectedEduc = ref(prevSchoolData.value.highestEducation)
const selectedLevel = ref(null)

const selectedYearL = ref(null)
const selectedYearR = ref(null)
const lastYrAttended = ref(prevSchoolData.value.lastSyAttended)

const yearsR = ref([])
const yearsL = computed(() => {
  const yearList = [...yearsR.value]
  yearList.pop()
  return yearList
})

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

let isYearSet = false

watch([selectedYearL, selectedYearR], ([newYearL, newYearR], [oldYearL, oldYearR]) => {
  if (isYearSet) {
    isYearSet = false
    return
  }

  if (newYearL !== oldYearL) {
    selectedYearR.value = (Number(newYearL) + 1).toString()
  } else if (newYearR !== oldYearR) {
    selectedYearL.value = (Number(newYearR) - 1).toString()
  }

  lastYrAttended.value = `${selectedYearL.value} - ${selectedYearR.value}`
  isYearSet = true
  handleUpdate()
})

function handleUpdate() {
  const data = {
    name: schoolName.value,
    schoolType: selectedType.value,
    schoolAffiliation: selectedAffiliation.value,
    lastSyAttended: lastYrAttended.value,
    highestEducation: selectedEduc.value,
    gradeStopped: selectedLevel.value,
    reason: discontinuationReason.value,
    ...objectMap(address.value, (field) => field.data)
  }

  emit('dataChanged', FormParts.PrevSchool, data)
}

onMounted(() => {
  console.log(prevSchoolData.value)

  const currentYear = getYear(new Date())

  for (let i = currentYear - 120; i <= currentYear + 1; i++) {
    yearsR.value.push(i.toString())
  }

  for (let i = 1; i <= 10; i++) {
    levels.value.push(`Grade ${i}`)
  }

  const lastSyAttended = prevSchoolData.value.lastSyAttended

  if (lastSyAttended) {
    const [splitYrL, splitYrR] = lastSyAttended.split('-')
    selectedYearL.value = splitYrL.trim()
    selectedYearR.value = splitYrR.trim()
  }

  selectedLevel.value = prevSchoolData.value.gradeStopped
})
</script>

<template>
  <div class="grid grid-cols-2">
    <div class="px-8">
      <div class="grid grid-cols-5 gap-3">
        <div class="flex items-center justify-end pr-6 col-span-2">
          <span>School Name</span>
        </div>
        <InputText
          class="h-10 col-span-3"
          type="text"
          v-model="schoolName"
          @update:model-value="handleUpdate"
          :pt="{
            root: ({ context }) => {
              return { class: [{ '!opacity-100': context.disabled }] }
            }
          }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />

        <div class="flex items-center justify-end pr-6 col-span-2">
          <span>Type</span>
        </div>
        <Dropdown
          class="h-10 col-span-3"
          v-model="selectedType"
          :options="types"
          @change="handleUpdate"
          :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />

        <div class="flex items-center justify-end pr-6 col-span-2">
          <span>Affiliation</span>
        </div>
        <Dropdown
          class="h-10 col-span-3"
          v-model="selectedAffiliation"
          :options="affiliations"
          @change="handleUpdate"
          :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />

        <div class="flex items-center justify-end text-right pr-6 col-span-2">
          <span>Last School Year Attended</span>
        </div>

        <div class="grid grid-cols-5 gap-3 col-span-3">
          <Dropdown
            class="h-10 col-span-2"
            v-model="selectedYearL"
            :options="yearsL"
            filter
            :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
            :ptOptions="{ mergeProps: true }"
            :disabled="isViewMode"
          />
          <span class="flex items-center justify-center">-</span>
          <Dropdown
            class="h-10 col-span-2"
            v-model="selectedYearR"
            :options="yearsR"
            filter
            :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
            :ptOptions="{ mergeProps: true }"
            :disabled="isViewMode"
          />
        </div>

        <div class="flex items-center justify-end text-right pr-6 col-span-2">
          <span>Highest Educational Attainment</span>
        </div>
        <Dropdown
          class="h-10 col-span-3"
          v-model="selectedEduc"
          :options="educAttainment"
          @change="handleUpdate"
          :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />

        <div class="flex items-center justify-end text-right pr-6 col-span-2">
          <span>Grade Year/Level Stopped</span>
        </div>
        <Dropdown
          class="h-10 col-span-3"
          v-model="selectedLevel"
          :options="levels"
          @change="handleUpdate"
          :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />
      </div>
    </div>

    <div class="px-8">
      <div class="grid grid-cols-4 gap-3">
        <div class="flex justify-end text-right pr-6">
          <span>Reason for Discontinuation</span>
        </div>
        <Textarea
          class="col-span-3"
          v-model="discontinuationReason"
          rows="5"
          cols="30"
          @update:model-value="handleUpdate"
          :pt="{
            root: ({ context }) => {
              return { class: [{ '!opacity-100': context.disabled }] }
            }
          }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
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
          :pt="{
            root: ({ context }) => {
              return { class: [{ '!opacity-100': context.disabled }] }
            }
          }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />
      </div>
    </div>
  </div>
</template>
