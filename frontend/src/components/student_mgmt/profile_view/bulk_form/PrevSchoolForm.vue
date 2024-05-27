<script setup>
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import FloatLabel from 'primevue/floatlabel'

import ValidateField from '../../ValidateField.vue'

import { ref, onMounted, watch, computed, inject } from 'vue'
import { getYear } from 'date-fns'

import { objectMap } from '@/util/helpers'
import { FormParts, floatLabelPt } from '@/util/student_utils'

const { formData, updateFormData } = inject('formData')

const prevSchoolInfo = formData.prevSchool

const schoolName = ref(prevSchoolInfo.name)
const discontinuationReason = ref(prevSchoolInfo.reason)

const address = ref({
  street: { label: 'Blk/Lt/St', data: prevSchoolInfo.street },
  city: { label: 'City', data: prevSchoolInfo.city },
  province: { label: 'Province', data: prevSchoolInfo.province }
})

const selectedType = ref(prevSchoolInfo.schoolType)
const selectedAffiliation = ref(prevSchoolInfo.schoolAffiliation)

const selectedEduc = ref(prevSchoolInfo.highestEducation)
const selectedLevel = ref(null)

const selectedYearL = ref(null)
const selectedYearR = ref(null)
const lastYrAttended = ref(prevSchoolInfo.lastSyAttended)

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

  lastYrAttended.value = `${selectedYearL.value}-${selectedYearR.value}`
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

  updateFormData(FormParts.PrevSchool, data)
}

onMounted(() => {
  const currentYear = getYear(new Date())

  for (let i = currentYear - 120; i <= currentYear + 1; i++) {
    yearsR.value.push(i.toString())
  }

  for (let i = 1; i <= 10; i++) {
    levels.value.push(`Grade ${i}`)
  }

  const lastSyAttended = prevSchoolInfo.lastSyAttended

  if (lastSyAttended) {
    const [splitYrL, splitYrR] = lastSyAttended.split('-')
    selectedYearL.value = splitYrL.trim()
    selectedYearR.value = splitYrR.trim()
  }

  selectedLevel.value = prevSchoolInfo.gradeStopped
})
</script>

<template>
  <div class="grid grid-cols-2">
    <div class="px-8">
      <div class="grid grid-cols-5 gap-3">
        <div class="flex gap-1 items-center justify-end pr-6 col-span-2">
          <div>School Name</div>
          <div class="text-red-500 text-xl">*</div>
        </div>

        <ValidateField v-slot="slotProps">
          <InputText
            class="col-span-3"
            type="text"
            v-model="schoolName"
            @update:modelValue="
              () => {
                handleUpdate()
                slotProps.inputEntered(schoolName)
              }
            "
            :pt="{
              root: ({ context }) => {
                return { class: [{ '!opacity-100': context.disabled }] }
              }
            }"
            :ptOptions="{ mergeProps: true }"
            :disabled="$route.meta.isViewMode"
            :invalid="slotProps.isInvalid"
          />
        </ValidateField>

        <div class="flex gap-1 items-center justify-end pr-6 col-span-2">
          <div>Type</div>
          <div class="text-red-500 text-xl">*</div>
        </div>
        <Dropdown
          class="col-span-3"
          v-model="selectedType"
          :options="types"
          @change="handleUpdate"
          :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
          :ptOptions="{ mergeProps: true }"
          :disabled="$route.meta.isViewMode"
        />

        <div class="flex gap-1 items-center justify-end pr-6 col-span-2">
          <div>Affiliation</div>
          <div class="text-red-500 text-xl">*</div>
        </div>
        <Dropdown
          class="col-span-3"
          v-model="selectedAffiliation"
          :options="affiliations"
          @change="handleUpdate"
          :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
          :ptOptions="{ mergeProps: true }"
          :disabled="$route.meta.isViewMode"
        />

        <div class="flex gap-1 items-center justify-end text-right pr-6 col-span-2">
          <div>Last School Year Attended</div>
          <div class="text-red-500 text-xl">*</div>
        </div>

        <div class="grid grid-cols-5 gap-3 col-span-3">
          <Dropdown
            class="col-span-2"
            v-model="selectedYearL"
            :options="yearsL"
            filter
            :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
            :ptOptions="{ mergeProps: true }"
            :disabled="$route.meta.isViewMode"
          />
          <span class="flex items-center justify-center">-</span>
          <Dropdown
            class="col-span-2"
            v-model="selectedYearR"
            :options="yearsR"
            filter
            :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
            :ptOptions="{ mergeProps: true }"
            :disabled="$route.meta.isViewMode"
          />
        </div>

        <div class="flex gap-1 items-center justify-end text-right pr-6 col-span-2">
          <div>Highest Educational Attainment</div>
          <div class="text-red-500 text-xl">*</div>
        </div>
        <Dropdown
          class="col-span-3"
          v-model="selectedEduc"
          :options="educAttainment"
          @change="handleUpdate"
          :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
          :ptOptions="{ mergeProps: true }"
          :disabled="$route.meta.isViewMode"
        />

        <div class="flex gap-1 items-center justify-end text-right pr-6 col-span-2">
          <div>Grade Year/Level Stopped</div>
          <div class="text-red-500 text-xl">*</div>
        </div>

        <Dropdown
          class="col-span-3"
          v-model="selectedLevel"
          :options="levels"
          @change="handleUpdate"
          :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
          :ptOptions="{ mergeProps: true }"
          :disabled="$route.meta.isViewMode"
        />
      </div>
    </div>

    <div class="px-8">
      <div class="grid grid-cols-4 gap-3">
        <div class="flex gap-1 justify-end text-right pr-6">
          <div>Reason for Discontinuation</div>
          <div class="text-red-500 text-xl">*</div>
        </div>

        <ValidateField v-slot="slotProps">
          <Textarea
            class="col-span-3"
            v-model="discontinuationReason"
            rows="5"
            cols="30"
            @update:modelValue="
              () => {
                handleUpdate()
                slotProps.inputEntered(discontinuationReason)
              }
            "
            :pt="{
              root: ({ context }) => {
                return { class: [{ '!opacity-100': context.disabled }] }
              }
            }"
            :ptOptions="{ mergeProps: true }"
            :disabled="$route.meta.isViewMode"
            :invalid="slotProps.isInvalid"
          />
        </ValidateField>

        <div class="flex gap-1 items-center justify-end pr-6">
          <div>Address</div>
          <div class="text-red-500 text-xl">*</div>
        </div>

        <FloatLabel
          v-for="(value, key) of address"
          :key="key"
          class="col-span-3"
          :class="{
            'flex items-center mt-8': value.label === 'Blk/Lt/St',
            'col-start-2 mt-4': value.label !== 'Blk/Lt/St'
          }"
          :pt="floatLabelPt"
        >
          <ValidateField v-slot="slotProps">
            <InputText
              class="w-full"
              type="text"
              v-model="value.data"
              @update:modelValue="
                () => {
                  handleUpdate()
                  slotProps.inputEntered(value.data)
                }
              "
              :pt="{
                root: ({ context }) => {
                  return { class: [{ '!opacity-100': context.disabled }] }
                }
              }"
              :ptOptions="{ mergeProps: true }"
              :disabled="$route.meta.isViewMode"
              :invalid="slotProps.isInvalid"
            />
          </ValidateField>

          <label :for="key">{{ value.label }}</label>
        </FloatLabel>
      </div>
    </div>
  </div>
</template>
