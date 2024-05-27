<script setup>
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown';
import BaseCard from '@/components/UI/BaseCard.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import FormParts from '@/util/volunteer_form_parts'

const emit = defineEmits(['dataChanged'])
const props = defineProps({ 
  Volunteer: Object, 
  isViewMode: Boolean,
})

const route = useRoute()

const op = ref()

const name = ref({
  lastName: props.Volunteer.lastName,
  firstName: props.Volunteer.firstName,
  middleName: props.Volunteer.middleName
})

const selectedSuffix = ref(props.Volunteer.suffix)
const selectedAffiliation = ref(props.Volunteer.affiliation)

const suffixes = ref(['Jr.', 'Sr.', 'I', 'II', 'III', 'IV'])
const affiliations = ref([
  'Student',
  'Professional'
])

function handleUpdate() {
  const data = {
    ...name.value,
    affiliation: selectedAffiliation.value,
    suffix:selectedSuffix.value,
  }
  
  emit('dataChanged', FormParts.Volunteer, data)
}
</script>


<template>
  <BaseCard>
  <div>
    <div class="flex gap-10 items-center">
      <div class="basis-32 text-right">
        <label for="last-name">Last Name<span class="text-red-500 text-xl">*</span></label>
      </div>
      <InputText
        class="grow"
        type="text"
        v-model="name.lastName"
        @update:modelValue="handleUpdate"
        :pt="{
              root: ({ context }) => {
                return { class: [{ '!opacity-100 !pointer-events-auto': context.disabled }] }
              }
            }"
        :ptOptions="{ mergeProps: true }"
        :disabled="isViewMode"
      />

      <div class="basis-32 text-right">
        <label for="first-name">First Name<span class="text-red-500 text-xl">*</span></label>
      </div>
      <InputText
        class="grow"
        type="text"
        v-model="name.firstName"
        @update:modelValue="handleUpdate"
        :pt="{
              root: ({ context }) => {
                return { class: [{ '!opacity-100 !pointer-events-auto': context.disabled }] }
              }
            }"
        :ptOptions="{ mergeProps: true }"
        :disabled="isViewMode"
      />

      <div class="basis-32 text-right">
        <span>Middle Name</span>
      </div>
      <InputText
        class="grow"
        type="text"
        v-model="name.middleName"
        @update:modelValue="handleUpdate"
        :pt="{
              root: ({ context }) => {
                return { class: [{ '!opacity-100 !pointer-events-auto': context.disabled }] }
              }
            }"
        :ptOptions="{ mergeProps: true }"
        :disabled="isViewMode"
      />

      <div class="basis-32 text-right">
        <span>Suffix</span>
      </div>
      <Dropdown
          v-model="selectedSuffix"
          :options="suffixes"
          @change="handleUpdate"
          :pt="{
              root: ({ props }) => ({
                class: { '!opacity-100 !pointer-events-auto': props.disabled }
              })
            }"
          :ptOptions="{ mergeProps: true }"
          :disabled="isViewMode"
        />
    </div>

    <div class="flex gap-9 items-center mt-2">

      <div class="basis-32 text-right">
        <label for="affiliation">Affiliation<span class="text-red-500 text-xl">*</span></label>
      </div>
      <Dropdown 
        v-model="selectedAffiliation"
        :options="affiliations"
        class="flex-grow" 
        @change="handleUpdate"
        :pt="{
              root: ({ props }) => ({
                class: { '!opacity-100 !pointer-events-auto': props.disabled }
              })
            }"
        :ptOptions="{ mergeProps: true }" 
        :disabled="isViewMode"
      />
    </div>
  </div>
  </BaseCard>
</template>
