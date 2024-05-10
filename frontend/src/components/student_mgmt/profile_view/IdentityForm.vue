<script setup>
import Avatar from 'primevue/avatar'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import BaseCard from '@/components/UI/BaseCard.vue'

import { ref } from 'vue'

const name = {
  firstName: '',
  middleName: '',
  lastName: ''
}

const lrn = ref()
const selectedSuffix = ref()
const selectedCat = ref()

const isAvatarHovered = ref(false)
const uploader = ref(null)

const suffixes = ref(['Jr.', 'Sr.', 'I', 'II', 'III', 'IV'])
const categories = ref([
  'Out-of-School Youth',
  'Teenage Pregnancy',
  'Orphan',
  'Drug-Related',
  'Disabled'
])

function setAvatarHover() {
  isAvatarHovered.value = !isAvatarHovered.value
}
</script>

<template>
  <BaseCard isNotPadded="true" class="p-2 pl-4">
    <div class="flex gap-4 items-center">
      <div class="h-20 relative flex items-center">
        <div
          class="relative flex items-center hover:cursor-pointer hover:scale-105 transition-transform ease-out duration-300"
          @mouseenter="setAvatarHover"
          @mouseleave="setAvatarHover"
          @click="uploader.click()"
        >
          <Avatar
            size="xlarge"
            :pt="{ root: 'bg-white shadow-md border-2 rounded dark:bg-surface-700' }"
            :ptOptions="{ mergeProps: true }"
          />

          <div
            class="absolute w-full h-full flex items-center justify-center transition-opacity ease-in duration-300"
            :class="{ 'opacity-0': isAvatarHovered }"
          >
            <font-awesome-icon icon="fa-solid fa-user" size="lg" />
          </div>

          <div
            class="absolute opacity-0 w-full h-full flex items-center justify-center transition-opacity ease-in duration-300"
            :class="{ 'opacity-100': isAvatarHovered }"
          >
            <font-awesome-icon icon="fa-solid fa-upload" size="lg" />
          </div>

          <input
            type="file"
            ref="uploader"
            accept="image/png, image/jpeg"
            name="avatar"
            class="hidden"
          />
        </div>
      </div>

      <div class="grid grid-cols-7 w-full gap-2">
        <InputText
          class="h-9 col-span-2"
          type="text"
          v-model="name.lastName"
          placeholder="Last Name"
        />
        <InputText
          class="h-9 col-span-2"
          type="text"
          v-model="name.firstName"
          placeholder="First Name"
        />
        <InputText
          class="h-9 col-span-2"
          type="text"
          v-model="name.middleName"
          placeholder="Middle Name"
        />
        <Dropdown
          class="h-9"
          v-model="selectedSuffix"
          showClear
          :options="suffixes"
          placeholder="Suffix"
        />

        <InputText class="h-9 col-span-2" type="text" v-model="lrn" placeholder="LRN" />
        <Dropdown
          class="h-9 col-span-2 content-center"
          v-model="selectedCat"
          :options="categories"
          placeholder="Category"
        />
      </div>
    </div>
  </BaseCard>
</template>
