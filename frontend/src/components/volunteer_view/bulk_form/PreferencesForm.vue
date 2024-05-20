<script setup>
import { ref, inject } from 'vue'
import Checkbox from 'primevue/checkbox'
import FormParts from '@/util/volunteer_form_parts'

const { formData, updateFormData } = inject('formData')
const VolunteerAvailability = formData.VolunteerAvailability
const VolunteerSpecialization = formData.VolunteerSpecialization 

const day = ref(VolunteerAvailability.day ? VolunteerAvailability.day.split(',') : [])
const area = ref(VolunteerSpecialization.area ? VolunteerSpecialization.area.split(',') : [])

const handleDayUpdate = () => {
  updateFormData(FormParts.VolunteerAvailability, { day: day.value.join(', ') })
}

const handleAreaUpdate = () => {
  updateFormData(FormParts.VolunteerSpecialization, { area: area.value.join(', ') })
}
</script>

<template>
  <div class="flex flex-col h-full">

    <div class="flex grow font-medium pt-10">
      <div class="basis-1/2 pr-16 pl-2">
        <div class="flex gap-10 mb-7 items-center">
          <div class="basis-32 text-right">
            <span>Availability</span>
          </div>
            <div class="flex align-items-center">
                <Checkbox v-model="day" inputId="m" name="mon" value="Monday" @change="handleDayUpdate" />
                <label for="mon" class="ml-2"> M </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="day" inputId="t" name="tue" value="Tuesday" @change="handleDayUpdate" />
                <label for="tue" class="ml-2"> T </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="day" inputId="w" name="wed" value="Wednesday" @change="handleDayUpdate" />
                <label for="wed" class="ml-2"> W </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="day" inputId="th" name="thu" value="Thursday" @change="handleDayUpdate" />
                <label for="thu" class="ml-2"> Th </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="day" inputId="f" name="fri" value="Friday" @change="handleDayUpdate" />
                <label for="fri" class="ml-2"> F </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="day" inputId="s" name="sat" value="Saturday" @change="handleDayUpdate" />
                <label for="sat" class="ml-2"> S </label>
            </div>
        </div>

        <div class="flex gap-10 mb-2 items-center">
          <div class="basis-32 text-right">
            <span>Area of Specialization</span>
          </div>
            <div class="flex align-items-center">
                <Checkbox v-model="area" inputId="ls1-e" name="ls1-e" value="LS1-E" @change="handleAreaUpdate" />
                <label for="ls1-e" class="ml-2 whitespace-nowrap"> LS1-E </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="area" inputId="ls1-f" name="ls1-f" value="LS1-F" @change="handleAreaUpdate" />
                <label for="ls1-f" class="ml-2 whitespace-nowrap"> LS1-F </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="area" inputId="ls2-S" name="ls2-s" value="LS2-S" @change="handleAreaUpdate" />
                <label for="ls2-s" class="ml-2 whitespace-nowrap"> LS2-S </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="area" inputId="ls3-m" name="ls3-m" value="LS3-M" @change="handleAreaUpdate" />
                <label for="ls3-m" class="ml-2 whitespace-nowrap"> LS3-M </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="area" inputId="ls4-cls" name="ls4-cls" value="LS4-CLS" @change="handleAreaUpdate" />
                <label for="ls4-cls" class="ml-2 whitespace-nowrap"> LS4-CLS</label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="area" inputId="ls5-uts" name="ls5-uts" value="LS5-UTS" @change="handleAreaUpdate" />
                <label for="ls5-uts" class="ml-2 whitespace-nowrap"> LS5-UTS</label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="area" inputId="ls6-dl" name="ls6-dl" value="LS6-DL" @change="handleAreaUpdate" />
                <label for="ls6-dl" class="ml-2 whitespace-nowrap"> LS6-DL</label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="area" inputId="hr" name="homeroom" value="Homeroom" @change="handleAreaUpdate" />
                <label for="homeroom" class="ml-2"> Homeroom</label>
            </div>
        </div>

      </div>
    </div>
  </div>
</template>
