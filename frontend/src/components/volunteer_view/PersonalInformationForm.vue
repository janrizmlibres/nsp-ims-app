<script setup>
import { ref, watch } from 'vue'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar';

const emit = defineEmits(['dataChanged', 'update'])

const firstName = ref(null)
const middleName = ref(null)
const lastName = ref(null)
const nickname = ref(null)
const dateOfBirth = ref(null)
const suffix = ref(null)
const course = ref(null)
const yearLevel = ref(null)
const work = ref(null)
const housing = ref(null)
const city = ref(null)
const barangay = ref(null)
const province = ref(null)

watch([firstName, middleName, lastName, nickname, dateOfBirth, suffix, course, yearLevel, work, housing, city, barangay, province], () => {
  emit('update', {
    firstName: firstName.value,
    middleName: middleName.value,
    lastName: lastName.value,
    nickname: nickname.value,
    dateOfBirth: dateOfBirth.value,
    suffix: suffix.value,
    course: course.value,
    yearLevel: yearLevel.value,
    work: work.value,
    housing: housing.value,
    city: city.value,
    barangay: barangay.value,
    province: province.value
  });
});
</script>

<template>
  <div class="flex flex-col h-full">

    <div class="flex grow font-medium pt-10">
      <div class="basis-1/2 pr-16 pl-2">
        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>First Name</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="firstName"
          />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Middle Name</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="middleName"
          />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Last Name</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="lastName"
          />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Nickname</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="nickname"
          />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Date of Birth</span>
          </div>
          <Calendar
            class="grow h-10"
            v-model="dateOfBirth"
          />
        </div>

        <div class="flex gap-10 mb-12 items-center">
          <div class="basis-32 text-right">
            <span>Suffix</span>
          </div>
          <InputText
            class="w-20 h-10"
            type="text"
            v-model="suffix"
          />
        </div>
      </div>

      <div class="basis-1/2 pr-16 pl-2">
        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Course</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="course"
          />
        </div>

        <div class="flex gap-3 mb-2 items-center">
          <div class="basis-32 text-right whitespace-nowrap">
            <span>Year Level (if student)</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="yearLevel"
          />
        </div>

        <div class="flex gap-3 mb-2 items-center">
          <div class="basis-32 text-right whitespace-nowrap">
            <span>Work (if professional)</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="work"
          />
        </div>

        <div class="flex mb-2 items-start" style="gap: 4.60rem;">
          <div class="basis-32 text-right whitespace-nowrap">
            <span>Address</span>
          </div>
          <div class="flex flex-col w-full">
            <InputText
              class="grow h-10 w-full mb-2"
              type="text"
              v-model="housing"
              placeholder="Housing Blk/Lt St."
            />
            <InputText
              class="grow h-10 w-full mb-2"
              type="text"
              v-model="city"
              placeholder="City/Municipality"
            />
            <InputText
              class="grow h-10 w-full mb-2"
              type="text"
              v-model="barangay"
              placeholder="Barangay"
            />
            <InputText
              class="grow h-10 w-full mb-2"
              type="text"
              v-model="province"
              placeholder="Province"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
