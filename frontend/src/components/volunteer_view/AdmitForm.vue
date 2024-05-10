<script setup>
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar';
import { ref } from 'vue'

const date = ref();

let formData = ref({
  firstName: '',
  address: {
    housing: '',
    city: '',
    barangay: '',
    province: ''
  }
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div>
      <div>
        <h3 class="font-medium u-txt-pcolor text-lg">Personal Information</h3>
      </div>
    </div>

    <div class="h-[0.035rem] u-bg-active mt-3"></div>

    <div class="flex grow font-medium pt-10">
      <div class="basis-1/2 pr-16 pl-2">
        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>First Name</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="formData.firstName"
          />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Middle Name</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="formData.middleName"
          />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Last Name</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="formData.lastName"
          />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Nickname</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="formData.nickName"
          />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Date of Birth</span>
          </div>
          <Calendar
            class="grow h-10"
            v-model="date"
          />
        </div>

        <div class="flex gap-10 mb-12 items-center">
          <div class="basis-32 text-right">
            <span>Suffix</span>
          </div>
          <InputText
            class="w-20 h-10"
            type="text"
            v-model="formData.suffixName"
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
            v-model="formData.course"
          />
        </div>

        <div class="flex gap-3 mb-2 items-center">
          <div class="basis-32 text-right whitespace-nowrap">
            <span>Year Level (if student)</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="formData.yearLevel"
          />
        </div>

        <div class="flex gap-3 mb-2 items-center">
          <div class="basis-32 text-right whitespace-nowrap">
            <span>Work (if professional)</span>
          </div>
          <InputText
            class="grow h-10"
            type="text"
            v-model="formData.work"
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
              v-model="formData.address.housing"
              placeholder="Housing Blk/Lt St."
            />
            <InputText
              class="grow h-10 w-full mb-2"
              type="text"
              v-model="formData.address.city"
              placeholder="City/Municipality"
            />
            <InputText
      class="grow h-10 w-full mb-2"
      type="text"
      v-model="formData.address.barangay"
      placeholder="Barangay"
    />
    <InputText
      class="grow h-10 w-full mb-2"
      type="text"
      v-model="formData.address.province"
      placeholder="Province"
    />
  </div>
</div>

      </div>
    </div>
  </div>
</template>
