<script setup>
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

import { onMounted, ref, computed, provide, watch } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'

import ContentPane from '@/components/UI/ContentPane.vue'
import IdentityForm from '@/components/student_mgmt/profile_view/IdentityForm.vue'
import BulkForm from '@/components/student_mgmt/profile_view/BulkForm.vue'
import { useStudentsStore } from '@/stores/students'

import FormParts from '@/util/student_form_parts'

const props = defineProps({
  studentId: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['routeChange'])

const router = useRouter()
const toast = useToast()
const confirm = useConfirm()
const studentsStore = useStudentsStore()

const formData = {
  identity: ref({
    firstName: null,
    middleName: null,
    lastName: null,
    suffixName: null,
    lrn: null,
    category: null,
    photoUrl: null
  }),
  personalInfo: ref({
    birthday: null,
    bloodType: null,
    birthBarangay: null,
    birthCity: null,
    birthProvince: null,
    religion: null,
    sex: null,
    civilStatus: null,
    homeBlkLtSt: null,
    homeBarangay: null,
    homeCity: null,
    homeProvince: null
  }),
  contactInfo: ref({
    email: null,
    contactNum: null,
    facebook: null
  }),
  emergencyPerson: ref({
    firstName: null,
    middleName: null,
    lastName: null,
    suffixName: null,
    contactNum: null,
    relationship: null
  }),
  parentalInfo: ref({
    lastNameF: null,
    middleNameF: null,
    firstNameF: null,
    suffixNameF: null,
    occupationF: null,
    lastNameM: null,
    middleNameM: null,
    firstNameM: null,
    suffixNameM: null,
    occupationM: null
  }),
  prevSchool: ref({
    name: null,
    schoolType: null,
    schoolAffiliation: null,
    lastSyAttended: null,
    highestEducation: null,
    gradeStopped: null,
    reason: null,
    street: null,
    barangay: null,
    city: null,
    province: null
  })
}

let okToLeave = true
const updateKey = ref(0)
const isViewMode = ref(Boolean(props.studentId))
const headerText = computed(() => {
  if (props.studentId === null) return 'Add Record'
  return isViewMode.value ? 'View Record' : 'Edit Record'
})

watch(
  () => props.studentId,
  () => emit('routeChange')
)

provide('personalData', formData.personalInfo)
provide('contactData', formData.contactInfo)
provide('emergencyData', formData.emergencyPerson)
provide('parentalData', formData.parentalInfo)
provide('prevSchoolData', formData.prevSchool)
provide('isViewMode', isViewMode)

function updateFormData(part, data) {
  const updateMapping = {
    [FormParts.Identity]: () => (formData.identity.value = data),
    [FormParts.Personal]: () => (formData.personalInfo.value = data),
    [FormParts.Contact]: () => (formData.contactInfo.value = data),
    [FormParts.Emergency]: () => (formData.emergencyPerson.value = data),
    [FormParts.Parental]: () => (formData.parentalInfo.value = data),
    [FormParts.PrevSchool]: () => (formData.prevSchool.value = data)
  }

  updateMapping[part]()
  okToLeave = false
}

async function goToStudentView() {
  await router.replace({ name: 'student-records' })
}

async function submitForm() {
  try {
    const result = await studentsStore.addStudent(formData)

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: result.data.message,
      life: 5000
    })

    await goToStudentView()
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
  if (okToLeave) return true

  confirm.require({
    message: 'Do you really want to leave? You have unsaved changes!',
    header: 'Redirect Confirmation',
    accept: async () => {
      okToLeave = true
      await router.push(to)
    }
  })

  return false
})

onMounted(async () => {
  if (props.studentId === null) return

  try {
    const result = await studentsStore.getStudent(props.studentId)
    const student = result.data.student

    const {
      personal_info,
      contact_info,
      emergency_person,
      parental_info,
      previous_school,
      ...identity
    } = student

    formData.identity.value = identity
    formData.personalInfo.value = personal_info
    formData.contactInfo.value = contact_info
    formData.emergencyPerson.value = emergency_person
    formData.parentalInfo.value = parental_info
    formData.prevSchool.value = previous_school

    okToLeave = true
    updateKey.value += 1
  } catch (error) {
    router.back()
  }
})
</script>

<template>
  <ContentPane :header="`Students / ${headerText}`" subheader="Academic Year 2022 - 2023">
    <div class="flex flex-col gap-3 h-full mr-1">
      <IdentityForm
        @dataChanged="updateFormData"
        :identity="formData.identity.value"
        :isViewMode="isViewMode"
        :key="updateKey"
      />
      <BulkForm @dataChanged="updateFormData" :key="updateKey + 1" />

      <div class="flex-none text-right">
        <div class="inline-block">
          <Button class="h-10 u-bg-green" @click="submitForm">
            <div>
              <font-awesome-icon
                icon="fa-solid fa-circle-check"
                class="absolute top-2/4 -mt-2 left-3"
              />
              <h2 class="pl-5 font-bold">Submit</h2>
            </div>
          </Button>
          <Button
            class="h-10 ml-2 u-bg-red"
            label="Cancel"
            icon="fa-solid fa-circle-xmark"
            @click="goToStudentView"
          />
        </div>
      </div>
    </div>
  </ContentPane>
</template>
