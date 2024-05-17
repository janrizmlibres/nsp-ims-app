<script setup>
import { ref, watch } from 'vue'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar';

const emit = defineEmits(['dataChanged', 'update'])

const firstName = ref(null)
const middleName = ref(null)
const lastName = ref(null)
const nickname = ref(null)
const birthday = ref(null)
const suffix = ref(null)
const program = ref(null)
const year = ref(null)
const work = ref(null)
const housing = ref(null)
const city = ref(null)
const barangay = ref(null)
const province = ref(null)

const handleDataChange = (newData) => {
  emit('dataChanged', newData);
};

watch([firstName, middleName, lastName, nickname, birthday, suffix, program, year, work, housing, city, barangay, province], () => {
  handleDataChange({
    firstName: firstName.value,
    middleName: middleName.value,
    lastName: lastName.value,
    nickname: nickname.value,
    birthday: birthday.value,
    suffix: suffix.value,
    program: program.value,
    year: year.value,
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
            v-model="birthday"
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
            <span>Program</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="program"
          />
        </div>

        <div class="flex gap-3 mb-2 items-center">
          <div class="basis-32 text-right whitespace-nowrap">
            <span>Year Level (if student)</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="year"
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
