<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import VolunteerBulkForm from '@/components/volunteer_view/VolunteerBulkForm.vue'
import AdmitVolunteerHeader from '@/components/volunteer_view/AdmitVolunteerHeader.vue'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast';
import { useVolunteerStore } from '@/stores/volunteer';
import FormParts from '../../util/volunteer_form_parts'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { isEqual } from 'lodash'
import { useConfirm } from 'primevue/useconfirm'
import { onMounted, ref, computed, provide, watch, readonly } from 'vue'

const emit = defineEmits(['routeChange'])

const route = useRoute()
const router = useRouter()
const confirm = useConfirm()
const toast = useToast()

const volunteerStore = useVolunteerStore()

const initialData = {
  volunteerHeader: {
    volunteerId: null,
    affiliation: null,
    firstName: null,
    middleName: null,
    lastName: null,
    suffix: null,
  },

  personalInformation: {
    nickname: null,
    birthday: null,
    sex: null,
    housing: null,
    barangay: null,
    city: null,
    province: null
  },

  contactInformation: {
    contactNumber: null,
    email: null,
    facebook: null,
  },

  emergency: {
    lastName: null,
    firstName: null,
    middleName: null,
    suffix: null,
    contactNumber: null,
    relationship: null,
  },

  availability: {
    day: null,
  },

  specialization: {
    area: null,
  },

  student: {
    program: null,
    year: null,
  },

  professional: {
    work: null,
  },

  //add work
}

const formData = ref(structuredClone(initialData))

let isOkToLeave = false
const updateKey = ref(0)

const headerText = computed(() => {
  if (!route.params.id) return 'Add Record'
  return route.meta.isViewMode ? 'View Record' : 'Edit Record'
})
const confirmBtnText = computed(() => (route.meta.isViewMode ? 'Edit' : 'Submit'))
const cancelBtnText = computed(() => (route.meta.isViewMode ? 'Back' : 'Cancel'))
const isFormDirty = computed(() => {
  for (const key in initialData) {
    if (!isEqual(initialData[key], formData.value[key])) return true
  }
  return false
})

watch(
  () => route.name,
  () => emit('routeChange')
)

provide('formData', readonly({ formData, updateFormData }))

function updateFormData(part, data) {
 // console.log(formData.value)
  const updateMapping = {
    [FormParts.Volunteer]: () => (formData.value.volunteerHeader = data),
    [FormParts.VolunteerPersonalInformation]: () => (formData.value.personalInformation = data),
    [FormParts.VolunteerContactInformation]: () => (formData.value.contactInformation = data),
    [FormParts.VolunteerEmergency]: () => (formData.value.emergency = data),
    [FormParts.VolunteerAvailability]: () => (formData.value.availability = data),
    [FormParts.VolunteerSpecialization]: () => (formData.value.specialization = data),
    [FormParts.StudentVolunteer]: () => (formData.value.student = data),
    [FormParts.ProfessionalVolunteer]: () => (formData.value.professional = data)
  }

    updateMapping[part]()
}

function handleConfirm() {
  if (route.meta.isViewMode) {
    router.push({ name: 'edit-volunteer', params: { id: route.params.id } })
  } else {
    submitForm()
  }
}

function handleCancel() {
  if (route.name === 'admit-volunteers' || route.meta.isViewMode) goToVolunteerRecords()
  else router.push({ name: 'view-volunteer', params: { id: route.params.id } })
}

async function goToVolunteerRecords() {
  await router.replace({ name: 'volunteer-records' })
}

async function submitForm() {
  try {
    const result =
      route.name === 'admit-volunteers'
        ? await volunteerStore.addVolunteer(formData.value)
        : await volunteerStore.updateVolunteer(route.params.id, formData.value)

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: result.data.message,
      life: 5000
    })
    isOkToLeave = true
    await goToVolunteerRecords()
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  }
}

onBeforeRouteLeave((to) => {
  if (!isFormDirty.value || isOkToLeave) return true

  confirm.require({
    message: 'Do you really want to leave? You have unsaved changes!',
    header: 'Redirect Confirmation',
    accept: async () => {
      isOkToLeave = true
      await router.push(to)
    }
  })

  return false
})

onMounted(async () => {
  if (!route.params.id) return

  try {
    const result = await volunteerStore.getVolunteer(route.params.id)
    const volunteer = result.data.volunteer

    /* try to see why this won't work:
    const filterObject = (obj) => {
      // eslint-disable-next-line no-unused-vars
      const { createdAt, updatedAt, id, ...filteredObj } = obj
      return filteredObj
    }*/

    const filterObject = (obj) => {
      if (!obj) return {}
      // eslint-disable-next-line no-unused-vars
      const { id, createdAt, updatedAt, volunteerId, ...filteredObj } = obj
      return filteredObj
    }

  const {
    volunteer_personal_information,
    volunteer_contact_information,
    volunteer_emergency_contact,
    volunteer_availability,
    volunteer_specialization,
    student_volunteer,
    professional_volunteer,
    //...identity
  } = volunteer

    //initialData.Volunteer = filterObject(identity)
    initialData.volunteerHeader = filterObject(volunteer)
    initialData.personalInformation = filterObject(volunteer_personal_information)
    initialData.contactInformation = filterObject(volunteer_contact_information)
    initialData.emergency = filterObject(volunteer_emergency_contact)
    initialData.availability = filterObject(volunteer_availability)
    initialData.specialization = filterObject(volunteer_specialization)
    initialData.student = filterObject(student_volunteer)
    initialData.professional = filterObject(professional_volunteer)

    for (const key in initialData) {
      formData.value[key] = initialData[key]
    }

    updateKey.value += 1
  } catch (error) {
    console.error('Failed to load volunteer:', error)
    router.back()
  }
})
</script>

<template>
  <ContentPane :header="`Volunteers / ${headerText}`" subheader="Academic Year 2022 - 2023">
    <div class="flex flex-col gap-3 h-full mr-1">
      <AdmitVolunteerHeader 
        @dataChanged="updateFormData"
        :Volunteer="formData.volunteerHeader"
        :isViewMode="$route.meta.isViewMode"
        :key="updateKey"
      />
      <VolunteerBulkForm @dataChanged="updateFormData" :key="updateKey + 1" />

      <div class="flex-none text-right">
        <div class="inline-block">
          <Button class="h-10 u-bg-green" @click="handleConfirm">
            <div>
              <font-awesome-icon
                icon="fa-solid fa-circle-check"
                class="absolute top-2/4 -mt-2 left-3"
              />
              <h2 class="pl-5 font-bold">{{ confirmBtnText }}</h2>
            </div>
          </Button>
          <Button
            class="h-10 ml-2 u-bg-red"
            :label="cancelBtnText"
            icon="fa-solid fa-circle-xmark"
            @click="handleCancel"
          />
        </div>
      </div>
    </div>
  </ContentPane>
</template>

