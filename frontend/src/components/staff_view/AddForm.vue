<script setup>
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
</script>

<template>
  <div class="flex flex-col h-full">
    <div>
      <div>
        <h3 class="font-medium u-txt-pcolor text-lg">General Information</h3>
      </div>
    </div>

    <div class="h-[0.035rem] u-bg-active mt-3"></div>

    <div class="flex grow font-medium pt-10">
      <div class="basis-1/2 pr-16 pl-2">
        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Last Name</span>
          </div>
          <InputText class="grow h-10" type="text" v-model="value" />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>First Name</span>
          </div>
          <InputText class="grow h-10" type="text" v-model="value" />
        </div>

        <div class="flex gap-10 mb-14 items-center">
          <div class="basis-32 text-right">
            <span>Middle Name</span>
          </div>
          <InputText class="grow h-10" type="text" v-model="value" />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Contact Number</span>
          </div>
          <InputText class="grow h-10" type="text" v-model="value" />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Email Address</span>
          </div>
          <InputText class="grow h-10" type="text" v-model="value" />
        </div>
      </div>

      <div class="basis-1/2 pr-16 pl-2">
        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Year Graduated</span>
          </div>
          <Dropdown
            v-model="selectedCity"
            editable
            :options="cities"
            optionLabel="name"
            class="grow h-10"
          />
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Course</span>
          </div>
          <Dropdown
            v-model="selectedCity"
            editable
            :options="cities"
            optionLabel="name"
            class="grow h-10"
          />
        </div>
      </div>
    </div>
  </div>
</template>
