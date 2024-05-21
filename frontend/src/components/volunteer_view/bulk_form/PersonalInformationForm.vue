<script setup>
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'

import { ref, computed, watch, onMounted, inject } from 'vue'
import { getDaysInMonth, format, getYear, getDay, getMonth } from 'date-fns'

import { objectMap } from '@/util/helpers'
import FormParts from '@/util/volunteer_form_parts'

const { formData, updateFormData } = inject('formData')

const VolunteerPersonalInformation = formData.VolunteerPersonalInformation
const ProfessionalVolunteer = formData.ProfessionalVolunteer
const StudentVolunteer = formData.StudentVolunteer

const nickname = ref(VolunteerPersonalInformation.nickname)
const work = ref(ProfessionalVolunteer.work)
const selectedSex = ref(VolunteerPersonalInformation.sex)

const birthday = ref({ month: null, day: null, year: null })
const computedBirthday = computed(() => {
  for (const key in birthday.value) {
    if (birthday.value[key] === null) return null
  }

  const { year, month, day } = birthday.value
  return new Date(year, month, day)
})

const address = ref({
  housing: { label: 'Blk/Lt/St', data: VolunteerPersonalInformation.housing },
  barangay: { label: 'Barangay', data: VolunteerPersonalInformation.barangay },
  city: { label: 'City', data: VolunteerPersonalInformation.city },
  province: { label: 'Province', data: VolunteerPersonalInformation.province }
})

const studentFields = ref({
  program: { label: 'Program', data: StudentVolunteer.program },
  year: { label: 'Year Level', data: StudentVolunteer.year }
})

const sex = ['M', 'F']

const months = ref([])
const days = computed(() => {
  const dayCount = () => {
    const year = birthday.value.year === null ? 1970 : getYear(new Date(birthday.value.year, 0))
    return birthday.value.month !== null ? getDaysInMonth(new Date(year, birthday.value.month)) : 31
  }

  return Array.from({ length: dayCount() }, (_, i) => (i + 1).toString())
})
const years = ref([])

watch([() => birthday.value.month, () => birthday.value.year], ([newMonth, newYear]) => {
  const year = newYear === null ? 1970 : getYear(new Date(newYear, 0))
  const newDayCount = getDaysInMonth(new Date(year, newMonth))

  if (newDayCount < Number(birthday.value.day)) {
    birthday.value.day = null
  }
})

const handleUpdate = () => {
  const newData = {
    nickname: nickname.value,
    birthday: computedBirthday.value,
    sex: selectedSex.value,
    ...objectMap(address.value, (field) => field.data)
  }
  updateFormData(FormParts.VolunteerPersonalInformation, newData)
}

onMounted(() => {
  for (let i = 0; i < 12; i++) {
    months.value.push({ name: format(new Date(1970, i), 'LLLL'), code: i })
  }

  const currentYear = getYear(new Date())

  for (let i = currentYear - 120; i <= currentYear; i++) {
    years.value.push(i.toString())
  }

  if (VolunteerPersonalInformation.birthday) {
    birthday.value.month = getMonth(VolunteerPersonalInformation.birthday)
    birthday.value.day = getDay(VolunteerPersonalInformation.birthday).toString()
    birthday.value.year = getYear(VolunteerPersonalInformation.birthday).toString()
  }
})

function updateStudentVolunteer() {
  const data = objectMap(studentFields.value, (field) => field.data)
  updateFormData(FormParts.StudentVolunteer, data)
}

function updateProfessionalVolunteer() {
  const data = {
    work: work.value
  }
  updateFormData(FormParts.ProfessionalVolunteer, data)
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex grow font-medium pt-10">
      <div class="basis-1/2 pr-16 pl-2">
        

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Nickname</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="nickname"
            @update:modelValue="handleUpdate"
            :ptOptions="{ mergeProps: true }"
            :disabled="$route.meta.isViewMode"
          />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Sex</span>
          </div>
          <Dropdown 
          class="h-10" 
          v-model="selectedSex" 
          :options="sex" 
          @change="handleUpdate" 
          :ptOptions="{ mergeProps: true }"
          :disabled="$route.meta.isViewMode"
          />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Date of Birth</span>
          </div>
          <Dropdown
            class="h-10 col-span-5"
            v-model="birthday.month"
            :options="months"
            optionLabel="name"
            optionValue="code"
            placeholder="Month"
            @change="handleUpdate"
            :ptOptions="{ mergeProps: true }"
            :disabled="$route.meta.isViewMode"
          />
          <Dropdown
            class="h-10 col-span-3"
            v-model="birthday.day"
            :options="days"
            placeholder="Day"
            @change="handleUpdate"
            :ptOptions="{ mergeProps: true }"
            :disabled="$route.meta.isViewMode"
          />
          <Dropdown
            class="h-10 col-span-4"
            v-model="birthday.year"
            :options="years"
            filter
            placeholder="Year"
            @change="handleUpdate"
            :ptOptions="{ mergeProps: true }"
            :disabled="$route.meta.isViewMode"
          />
        </div>

        <div class="flex gap-3 mb-2 items-center">
          <template v-for="field of Object.values(studentFields)" :key="field.label">
            <div class="flex items-center justify-end pr-6 col-span-2">
              <span>{{ field.label }}</span>
            </div>
            <InputText
              class="h-10 col-span-3"
              type="text"
              v-model="field.data"
              @update:modelValue="updateStudentVolunteer"
              :ptOptions="{ mergeProps: true }"
              :disabled="$route.meta.isViewMode"
            />
          </template>
        </div>

        <div class="flex gap-3 mb-2 items-center">
          <div class="basis-32 text-right whitespace-nowrap">
            <span>Work (if professional)</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="work"
            @update:modelValue="updateProfessionalVolunteer"
            :ptOptions="{ mergeProps: true }"
            :disabled="$route.meta.isViewMode"
          />
        </div>
        
      </div>

      <div class="basis-1/2 pr-16 pl-2">

        <div class="flex mb-2 items-start" style="gap: 4.60rem;">
          <div class="basis-32 text-right whitespace-nowrap">
            <span>Address</span>
          </div>
          <div class="flex flex-col w-full">
            <InputText
              v-for="(value, key) of address"
              :key="key"
              class="h-10 col-span-3 mb-2"
              :class="{ 'col-start-2': value.label !== 'Blk/Lt/St' }"
              type="text"
              v-model="value.data"
              :placeholder="value.label"
              @update:modelValue="handleUpdate"
              :ptOptions="{ mergeProps: true }"
              :disabled="$route.meta.isViewMode"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
