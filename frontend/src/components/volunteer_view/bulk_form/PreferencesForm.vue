<script setup>
import { ref, inject, onMounted } from 'vue'
import Checkbox from 'primevue/checkbox'
import FormParts from '@/util/volunteer_form_parts'
import { useUtilitiesStore } from '@/stores/utilities';

const utilitiesStore = useUtilitiesStore()

const { formData, updateFormData } = inject('formData')
const props = defineProps({ Volunteer: Object, isViewMode: Boolean })

const areaOfSpecializationOptions = ref([
    {name: 'LS1-E', key: 'LS1-E'},
    {name: 'LS1-F', key: 'LS1-F'}
]);

const availability = formData.availability
const specialization = formData.specialization 

const day = ref(availability.day ? availability.day.split(', ') : [])
const area = ref(specialization.area ? specialization.area.split(', ') : [])

const handleDayUpdate = () => {
  updateFormData(FormParts.VolunteerAvailability, { day: day.value.join(', ') })
}

const handleAreaUpdate = () => {
  updateFormData(FormParts.VolunteerSpecialization, { area: area.value.join(', ') })
}

onMounted(async () => {
  try{
    await utilitiesStore.getLearningStrands()
    areaOfSpecializationOptions.value = utilitiesStore.strands.map(strand => ({name: strand.code, key: strand.code}))
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="flex flex-col h-full">

    <div class="flex grow font-medium pt-10">
      <div class="basis-1/2 pr-16 pl-2">
        <div class="flex gap-10 mb-7 items-center">
          <div class="basis-32 text-right">
            <label for="availability">Availability<span class="text-red-500 text-xl">*</span></label>
          </div>
            <div class="flex align-items-center">
                <Checkbox 
                  v-model="day" 
                  inputId="m" 
                  name="mon" 
                  value="M" 
                  @change="handleDayUpdate"
                  :ptOptions="{ mergeProps: true }"
                  :disabled="$route.meta.isViewMode" />
                <label for="mon" class="ml-2"> M </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox 
                  v-model="day" 
                  inputId="t" 
                  name="tue" 
                  value="T" 
                  @change="handleDayUpdate"
                  :ptOptions="{ mergeProps: true }"
                  :disabled="$route.meta.isViewMode" />
                <label for="tue" class="ml-2"> T </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox 
                  v-model="day" 
                  inputId="w" 
                  name="wed" 
                  value="W" 
                  @change="handleDayUpdate"
                  :ptOptions="{ mergeProps: true }"
                  :disabled="$route.meta.isViewMode" />
                <label for="wed" class="ml-2"> W </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox 
                  v-model="day" 
                  inputId="th" 
                  name="thu" 
                  value="Th" 
                  @change="handleDayUpdate"
                  :ptOptions="{ mergeProps: true }"
                  :disabled="$route.meta.isViewMode" />
                <label for="thu" class="ml-2"> Th </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox 
                  v-model="day" 
                  inputId="f" 
                  name="fri" 
                  value="F" 
                  @change="handleDayUpdate"
                  :ptOptions="{ mergeProps: true }"
                  :disabled="$route.meta.isViewMode" />
                <label for="fri" class="ml-2"> F </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox 
                  v-model="day" 
                  inputId="s" 
                  name="sat" 
                  value="S" 
                  @change="handleDayUpdate"
                  :ptOptions="{ mergeProps: true }"
                  :disabled="$route.meta.isViewMode" />
                <label for="sat" class="ml-2"> S </label>
            </div>
        </div>

        <div class="flex gap-[4.25rem] mb-2 items-center">
          <div class="text-right">
            <label for="area-of-specialization">Area of Specialization<span class="text-red-500 text-xl">*</span></label>
          </div>
          <div class="flex gap-4">
            <div v-for="Specialization of areaOfSpecializationOptions" :key="Specialization.key" class="flex align-items-center flex gap-4">
                <Checkbox v-model="area" :inputId="Specialization.key" name="Specialization" :value="Specialization.name" @change="handleAreaUpdate" />
                <label :for="Specialization.key">{{ Specialization.name }}</label>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>