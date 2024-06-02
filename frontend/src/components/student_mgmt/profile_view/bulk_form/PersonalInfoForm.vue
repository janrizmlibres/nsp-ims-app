<script setup>
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'

import ValidateField from '../../ValidateField.vue'

import { ref, computed, watch, onMounted, inject } from 'vue'
import { getDaysInMonth, format, getYear, getMonth, getDate } from 'date-fns'

import { objectMap } from '@/util/helpers'
import { FormParts, floatLabelPt } from '@/util/student_utils'

const { formData, updateFormData } = inject('formData')

const personalInfo = formData.personalInfo

const selectedSex = ref(personalInfo.sex)
const selectedBloodType = ref(personalInfo.bloodType)
const selectedCivilStat = ref(personalInfo.civilStatus)
const selectedReligion = ref(personalInfo.religion)

const birthday = ref({ month: null, day: null, year: null })
const computedBirthday = computed(() => {
  for (const key in birthday.value) {
    if (birthday.value[key] === null) return null
  }

  const { year, month, day } = birthday.value
  return new Date(year, month, day)
})

const birthPlace = ref({
  birthCity: personalInfo.birthCity,
  birthProvince: personalInfo.birthProvince
})
const address = ref({
  homeDistrict: { label: 'District', data: personalInfo.homeDistrict },
  homeBlkLtSt: { label: 'Blk/Lt/St', data: personalInfo.homeBlkLtSt },
  homeBarangay: { label: 'Barangay', data: personalInfo.homeBarangay },
  homeCity: { label: 'City', data: personalInfo.homeCity },
  homeProvince: { label: 'Province', data: personalInfo.homeProvince }
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

  updateFormData(FormParts.Personal, data)
}

onMounted(() => {
  for (let i = 0; i < 12; i++) {
    months.value.push({ name: format(new Date(1970, i), 'LLLL'), code: i })
  }

  const currentYear = getYear(new Date())

  for (let i = currentYear - 120; i <= currentYear; i++) {
    years.value.push(i.toString())
  }

  if (personalInfo.birthday) {
    birthday.value.month = getMonth(personalInfo.birthday)
    birthday.value.day = getDate(personalInfo.birthday).toString()
    birthday.value.year = getYear(personalInfo.birthday).toString()
  }
})
</script>

<template>
  <div class="grid grid-cols-2">
    <div class="px-8">
      <div class="grid grid-cols-4 gap-3">
        <div class="flex gap-1 items-center justify-end pr-6">
          <div>Sex</div>
          <div class="text-red-500 text-xl">*</div>
        </div>

        <div class="col-span-3 grid grid-cols-3 gap-6">
          <Dropdown
            v-model="selectedSex"
            :options="sex"
            @change="handleUpdate"
            :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
            :ptOptions="{ mergeProps: true }"
            :disabled="$route.meta.isViewMode"
          />

          <div class="flex items-center justify-end">
            <span>Blood Type</span>
          </div>
          <Dropdown
            v-model="selectedBloodType"
            :options="bloodTypes"
            @change="handleUpdate"
            :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
            :ptOptions="{ mergeProps: true }"
            :disabled="$route.meta.isViewMode"
          />
        </div>

        <div class="flex gap-1 items-center justify-end pr-6">
          <div>Civil Status</div>
          <div class="text-red-500 text-xl">*</div>
        </div>
        <Dropdown
          class="col-span-3"
          v-model="selectedCivilStat"
          :options="civilStatus"
          @change="handleUpdate"
          :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
          :ptOptions="{ mergeProps: true }"
          :disabled="$route.meta.isViewMode"
        />

        <div class="flex gap-1 items-center text-right justify-end pr-6">
          <div>Date of Birth</div>
          <div class="text-red-500 text-xl">*</div>
        </div>
        <div class="col-span-3 grid grid-cols-12 gap-3 items-center">
          <Dropdown
            class="col-span-5"
            v-model="birthday.month"
            :options="months"
            optionLabel="name"
            optionValue="code"
            placeholder="Month"
            @change="handleUpdate"
            :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
            :ptOptions="{ mergeProps: true }"
            :disabled="$route.meta.isViewMode"
          />
          <Dropdown
            class="col-span-3"
            v-model="birthday.day"
            :options="days"
            placeholder="Day"
            @change="handleUpdate"
            :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
            :ptOptions="{ mergeProps: true }"
            :disabled="$route.meta.isViewMode"
          />
          <Dropdown
            class="col-span-4"
            v-model="birthday.year"
            :options="years"
            filter
            placeholder="Year"
            @change="handleUpdate"
            :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
            :ptOptions="{ mergeProps: true }"
            :disabled="$route.meta.isViewMode"
          />
        </div>

        <div class="flex gap-1 items-center text-right justify-end pr-6 mt-5">
          <div>Place of Birth</div>
          <div class="text-red-500 text-xl">*</div>
        </div>

        <FloatLabel class="col-span-3 col-start-2 flex items-center mt-5" :pt="floatLabelPt">
          <ValidateField v-slot="slotProps">
            <InputText
              class="w-full"
              id="birth-city"
              type="text"
              v-model="birthPlace.birthCity"
              @update:modelValue="
                () => {
                  handleUpdate()
                  slotProps.inputEntered(birthPlace.birthCity)
                }
              "
              :pt="{ root: ({ context }) => ({ class: [{ '!opacity-100': context.disabled }] }) }"
              :ptOptions="{ mergeProps: true }"
              :disabled="$route.meta.isViewMode"
              :invalid="slotProps.isInvalid"
            />
          </ValidateField>

          <label for="birth-city">City</label>
        </FloatLabel>

        <FloatLabel class="col-span-3 col-start-2 flex items-center mt-4" :pt="floatLabelPt">
          <ValidateField v-slot="slotProps">
            <InputText
              class="w-full"
              id="birth-province"
              type="text"
              v-model="birthPlace.birthProvince"
              @update:modelValue="
                () => {
                  handleUpdate()
                  slotProps.inputEntered(birthPlace.birthProvince)
                }
              "
              :pt="{ root: ({ context }) => ({ class: [{ '!opacity-100': context.disabled }] }) }"
              :ptOptions="{ mergeProps: true }"
              :disabled="$route.meta.isViewMode"
              :invalid="slotProps.isInvalid"
            />
          </ValidateField>
          <label for="birth-province">Province</label>
        </FloatLabel>
      </div>
    </div>

    <div class="px-8">
      <div class="grid grid-cols-4 gap-3">
        <div class="flex items-center justify-end pr-6">
          <span>Religion</span>
        </div>
        <Dropdown
          class="col-span-3"
          editable
          v-model="selectedReligion"
          :options="religions"
          @change="handleUpdate"
          :pt="{ root: ({ props }) => ({ class: { '!opacity-100': props.disabled } }) }"
          :ptOptions="{ mergeProps: true }"
          :disabled="$route.meta.isViewMode"
        />

        <div class="flex gap-1 items-center justify-end pr-6 mt-5">
          <div>Address</div>
          <div class="text-red-500 text-xl">*</div>
        </div>

        <FloatLabel
          v-for="(value, key) of address"
          :key="key"
          class="col-span-3"
          :class="{
            'flex items-center mt-6': value.label === 'District',
            'col-start-2 mt-4': value.label !== 'District'
          }"
          :pt="floatLabelPt"
        >
          <ValidateField v-slot="slotProps">
            <InputText
              class="w-full"
              :id="key"
              type="text"
              v-model="value.data"
              @update:modelValue="
                () => {
                  handleUpdate()
                  slotProps.inputEntered(value.data)
                }
              "
              :pt="{ root: ({ context }) => ({ class: [{ '!opacity-100': context.disabled }] }) }"
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
