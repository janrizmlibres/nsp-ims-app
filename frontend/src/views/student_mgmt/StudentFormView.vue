<script setup>
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

import { onMounted } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'

import ContentPane from '@/components/UI/ContentPane.vue'
import IdentityForm from '@/components/student_mgmt/profile_view/IdentityForm.vue'
import BulkForm from '@/components/student_mgmt/profile_view/BulkForm.vue'
import { useStudentsStore } from '@/stores/students'

import FormParts from '../../util/student_form_parts'

const props = defineProps({
  studentId: {
    type: String,
    default: null
  }
})

const router = useRouter()
const toast = useToast()
const studentsStore = useStudentsStore()

const formData = {
  identity: {
    firstName: null,
    middleName: null,
    lastName: null,
    suffixName: null,
    lrn: null,
    category: null,
    photoUrl: null
  },
  personalInfo: {
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
  },
  contactInfo: {
    email: null,
    contactNum: null,
    facebook: null
  },
  emergencyPerson: {
    firstName: null,
    middleName: null,
    lastName: null,
    suffixName: null,
    contactNum: null,
    relationship: null
  },
  parentalInfo: {
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
  },
  prevSchool: {
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
  }
}

let okToLeave = true

function updateFormData(part, data) {
  const updateMapping = {
    [FormParts.Identity]: () => (formData.identity = data),
    [FormParts.Personal]: () => (formData.personalInfo = data),
    [FormParts.Contact]: () => (formData.contactInfo = data),
    [FormParts.Emergency]: () => (formData.emergencyPerson = data),
    [FormParts.Parental]: () => (formData.parentalInfo = data),
    [FormParts.PrevSchool]: () => (formData.prevSchool = data)
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

    console.log(student)
  } catch (error) {
    router.back()
  }
})
</script>

<template>
  <ContentPane :header="`Students / Add Record`" subheader="Academic Year 2022 - 2023">
    <div class="flex flex-col gap-3 h-full mr-1">
      <IdentityForm @dataChanged="updateFormData" />
      <BulkForm @dataChanged="updateFormData" />

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
