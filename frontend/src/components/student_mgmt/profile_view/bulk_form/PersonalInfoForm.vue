<script setup>
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'

import { ref, computed, watch, onMounted, inject } from 'vue'
import { getDaysInMonth, format, getYear, getDay, getMonth } from 'date-fns'

import { objectMap } from '@/util/helpers'
import FormParts from '@/util/student_form_parts'

const emit = defineEmits(['dataChanged'])

const personalData = inject('personalData')
const isViewMode = inject('isViewMode')

const selectedSex = ref(personalData.value.sex)
const selectedBloodType = ref(personalData.value.bloodType)
const selectedCivilStat = ref(personalData.value.civilStatus)
const selectedReligion = ref(personalData.value.religion)

const birthday = ref({ month: null, day: null, year: null })
const computedBirthday = computed(() => {
  for (const key in birthday.value) {
    if (birthday.value[key] === null) return null
  }

  const { year, month, day } = birthday.value
  return new Date(year, month, day)
})

const birthPlace = ref({
  birthBarangay: personalData.value.birthBarangay,
  birthCity: personalData.value.birthCity,
  birthProvince: personalData.value.birthProvince
})
const address = ref({
  homeBlkLtSt: { label: 'Blk/Lt/St', data: personalData.value.homeBlkLtSt },
  homeBarangay: { label: 'Barangay', data: personalData.value.homeBarangay },
  homeCity: { label: 'City', data: personalData.value.homeCity },
  homeProvince: { label: 'Province', data: personalData.value.homeProvince }
})

const sex = ['M', 'F']
const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const civilStatus = ['Married', 'Widowed', 'Separated', 'Divorced', 'Single']

const months = ref([])
const days = computed(() => {
  const dayCount = () => {
    const year = birthday.value.year === null ? 1970 : getYear(new Date(birthday.value.year, 0))
    return birthday.value.month !== null ? getDaysInMonth(new Date(year, birthday.value.month)) : 31
  }

  return Array.from({ length: dayCount() }, (_, i) => (i + 1).toString())
})
const years = ref([])

const religions = ref([
  'Roman Catholic',
  'Islam',
  'Iglesia ni Cristo',
  'Seventh Day Adventist',
  'Aglipay',
  'Iglesia Filipina Independiente',
  'Bible Baptist Church',
  'United Church of Christ in the Philippines',
  "Jehovah's Witness",
  'Church of Christ'
])

watch([() => birthday.value.month, () => birthday.value.year], ([newMonth, newYear]) => {
  const year = newYear === null ? 1970 : getYear(new Date(newYear, 0))
  const newDayCount = getDaysInMonth(new Date(year, newMonth))

  if (newDayCount < Number(birthday.value.day)) {
    birthday.value.day = null
  }
})

function handleUpdate() {
  const data = {
    birthday: computedBirthday.value,
    bloodType: selectedBloodType.value,
    religion: selectedReligion.value,
    sex: selectedSex.value,
    civilStatus: selectedCivilStat.value,
    ...birthPlace.value,
    ...objectMap(address.value, (field) => field.data)
  }

  emit('dataChanged', FormParts.Personal, data)
}

onMounted(() => {
  for (let i = 0; i < 12; i++) {
    months.value.push({ name: format(new Date(1970, i), 'LLLL'), code: i })
  }

  const currentYear = getYear(new Date())

  for (let i = currentYear - 120; i <= currentYear; i++) {
    years.value.push(i.toString())
  }

  if (personalData.value.birthday) {
    birthday.value.month = getMonth(personalData.value.birthday)
    birthday.value.day = getDay(personalData.value.birthday).toString()
    birthday.value.year = getYear(personalData.value.birthday).toString()
  }
})
</script>

<template>
  <div class="grid grid-cols-2">
    <div class="px-8">
      <div class="grid grid-cols-4 gap-3">
        <div class="flex items-center justify-end pr-6">
          <span>Sex</span>
        </div>

        <div class="col-span-3 grid grid-cols-3 gap-6">
          <Dropdown
            class="h-10"
            v-model="selectedSex"
            :options="sex"
            @change="handleUpdate"
            :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
            :ptOptions="{ mergeProps: true }"
            :disabled="isViewMode"
          />

          <div class="flex items-center justify-end">
            <span>Blood Type</span>
          </div>
          <Dropdown
            class="h-10"
            v-model="selectedBloodType"
            :options="bloodTypes"
            @change="handleUpdate"
            :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
            :ptOptions="{ mergeProps: true }"
            :disabled="isViewMode"
          />
        </div>

        <div class="flex items-center justify-end pr-6">
          <span>Civil Status</span>
        </div>
        <Dropdown
          class="h-10 col-span-3"
          v-model="selectedCivilStat"
          :options="civilStatus"
          @change="handleUpdate"
          :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />

        <div class="flex items-center justify-end pr-6">
          <span>Date of Birth</span>
        </div>
        <div class="col-span-3 grid grid-cols-12 gap-3">
          <Dropdown
            class="h-10 col-span-5"
            v-model="birthday.month"
            :options="months"
            optionLabel="name"
            optionValue="code"
            placeholder="Month"
            @change="handleUpdate"
            :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
            :ptOptions="{ mergeProps: true }"
            :disabled="isViewMode"
          />
          <Dropdown
            class="h-10 col-span-3"
            v-model="birthday.day"
            :options="days"
            placeholder="Day"
            @change="handleUpdate"
            :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
            :ptOptions="{ mergeProps: true }"
            :disabled="isViewMode"
          />
          <Dropdown
            class="h-10 col-span-4"
            v-model="birthday.year"
            :options="years"
            filter
            placeholder="Year"
            @change="handleUpdate"
            :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
            :ptOptions="{ mergeProps: true }"
            :disabled="isViewMode"
          />
        </div>

        <div class="flex items-center justify-end pr-6">
          <span>Place of Birth</span>
        </div>
        <InputText
          class="h-10 col-span-3"
          type="text"
          v-model="birthPlace.birthBarangay"
          placeholder="Barangay"
          @update:modelValue="handleUpdate"
          :pt="{ root: ({ context }) => ({ class: [{ '!opacity-100': context.disabled }] }) }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />
        <InputText
          class="h-10 col-span-3 col-start-2"
          type="text"
          v-model="birthPlace.birthCity"
          placeholder="City"
          @update:modelValue="handleUpdate"
          :pt="{ root: ({ context }) => ({ class: [{ '!opacity-100': context.disabled }] }) }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />
        <InputText
          class="h-10 col-span-3 col-start-2"
          type="text"
          v-model="birthPlace.birthProvince"
          placeholder="Province"
          @update:modelValue="handleUpdate"
          :pt="{ root: ({ context }) => ({ class: [{ '!opacity-100': context.disabled }] }) }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />
      </div>
    </div>

    <div class="px-8">
      <div class="grid grid-cols-4 gap-3">
        <div class="flex items-center justify-end pr-6">
          <span>Religion</span>
        </div>
        <Dropdown
          class="h-10 col-span-3"
          editable
          v-model="selectedReligion"
          :options="religions"
          @change="handleUpdate"
          :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
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
          :class="{ 'col-start-2': value.label !== 'Blk/Lt/St' }"
          type="text"
          v-model="value.data"
          :placeholder="value.label"
          @update:modelValue="handleUpdate"
          :pt="{ root: ({ context }) => ({ class: [{ '!opacity-100': context.disabled }] }) }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />
      </div>
    </div>
  </div>
</template>
