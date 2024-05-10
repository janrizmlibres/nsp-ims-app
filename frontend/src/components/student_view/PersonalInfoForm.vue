<script setup>
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'

import { ref, computed, watch, onMounted } from 'vue'
import { getDaysInMonth, format, getYear } from 'date-fns'

const selectedSex = ref()
const selectedBloodType = ref()
const selectedCivilStat = ref()

const selectedMonth = ref(null)
const selectedDay = ref(null)
const selectedYear = ref(null)

const selectedReligion = ref()

const sex = ['M', 'F']
const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const civilStatus = ['Married', 'Widowed', 'Separated', 'Divorced', 'Single']

const months = ref([])
const days = computed(() => {
  const dayCount = () => {
    const year = selectedYear.value === null ? 1970 : getYear(new Date(selectedYear.value, 0))
    return selectedMonth.value !== null ? getDaysInMonth(new Date(year, selectedMonth.value)) : 31
  }

  return Array.from({ length: dayCount() }, (_, i) => (i + 1).toString())
})
// const years = ref([])

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

watch([selectedMonth, selectedYear], ([newMonth, newYear]) => {
  const year = newYear === null ? 1970 : getYear(new Date(newYear, 0))
  const newDayCount = getDaysInMonth(new Date(year, newMonth))

  if (newDayCount < Number(selectedDay.value)) {
    selectedDay.value = null
  }
})

onMounted(() => {
  for (let i = 0; i < 12; i++) {
    months.value.push({ name: format(new Date(1970, i), 'LLLL'), code: i })
  }

  // const currentYear = getYear(new Date())

  // for (let i = currentYear - 120; i <= currentYear; i++) {
  //   years.value.push(i.toString())
  // }
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
        <div class="col-span-3 grid grid-cols-12 gap-3">
          <Dropdown
            class="h-10 col-span-5"
            v-model="selectedMonth"
            :options="months"
            optionLabel="name"
            optionValue="code"
            placeholder="Month"
          />
          <Dropdown
            class="h-10 col-span-3"
            v-model="selectedDay"
            :options="days"
            placeholder="Day"
          />
          <Calendar
            class="h-10 col-span-4"
            v-model="selectedYear"
            view="year"
            dateFormat="yy"
            placeholder="Year"
          />
        </div>

        <div class="flex items-center justify-end pr-6">
          <span>Place of Birth</span>
        </div>
        <InputText class="h-10 col-span-3" type="text" v-model="value" placeholder="Barangay" />
        <InputText
          class="h-10 col-span-3 col-start-2"
          type="text"
          v-model="value"
          placeholder="City"
        />
        <InputText
          class="h-10 col-span-3 col-start-2"
          type="text"
          v-model="value"
          placeholder="Province"
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
        />

        <div class="flex items-center justify-end pr-6">
          <span>Address</span>
        </div>
        <InputText class="h-10 col-span-3" type="text" v-model="value" placeholder="Blk/Lt/St" />
        <InputText
          class="h-10 col-span-3 col-start-2"
          type="text"
          v-model="value"
          placeholder="Barangay"
        />
        <InputText
          class="h-10 col-span-3 col-start-2"
          type="text"
          v-model="value"
          placeholder="City"
        />
        <InputText
          class="h-10 col-span-3 col-start-2"
          type="text"
          v-model="value"
          placeholder="Province"
        />
      </div>
    </div>
  </div>
</template>
