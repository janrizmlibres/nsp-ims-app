<script setup>
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

import { onMounted, ref, computed, provide, watch, readonly } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'

import ContentPane from '@/components/UI/ContentPane.vue'
import IdentityForm from '@/components/student_mgmt/profile_view/IdentityForm.vue'
import BulkForm from '@/components/student_mgmt/profile_view/BulkForm.vue'
import { useStudentsStore } from '@/stores/students'

import FormParts from '@/util/student_form_parts'
import { isEqual } from 'lodash'

const emit = defineEmits(['routeChange'])

const route = useRoute()
const router = useRouter()
const toast = useToast()
const confirm = useConfirm()

const studentsStore = useStudentsStore()

const initialData = {
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

const formData = ref(structuredClone(initialData))

let isOkToLeave = false
const updateKey = ref(0)

const headerText = computed(() => {
  if (!route.params.studentId) return 'Add Record'
  return route.meta.isViewMode ? 'View Record' : 'Edit Record'
})
const confirmBtnText = computed(() => (route.meta.isViewMode ? 'Edit' : 'Submit'))
const cancelBtnText = computed(() => (route.meta.isViewMode ? 'Back' : 'Cancel'))
const isFormDirty = computed(() => {
  for (const key in initialData) {
    if (!isEqual(initialData[key], formData[key].value)) return true
  }
  return false
})

watch(
  () => route.name,
  () => emit('routeChange')
)

provide('formData', readonly({ formData, updateFormData }))

function updateFormData(part, data) {
  const updateMapping = {
    [FormParts.Identity]: () => (formData.value.identity = data),
    [FormParts.Personal]: () => (formData.value.personalInfo = data),
    [FormParts.Contact]: () => (formData.value.contactInfo = data),
    [FormParts.Emergency]: () => (formData.value.emergencyPerson = data),
    [FormParts.Parental]: () => (formData.value.parentalInfo = data),
    [FormParts.PrevSchool]: () => (formData.value.prevSchool = data)
  }

  updateMapping[part]()
}

function handleConfirm() {
  if (route.meta.isViewMode) {
    router.push({ name: 'edit-student', params: { studentId: route.params.studentId } })
  } else {
    submitForm()
  }
}

function handleCancel() {
  if (route.name === 'add-student' || route.meta.isViewMode) goToStudentView()
  else router.push({ name: 'view-student', params: { studentId: route.params.studentId } })
}

async function goToStudentView() {
  await router.push({ name: 'student-records' })
}

async function submitForm() {
  try {
    const result =
      route.name === 'add-student'
        ? await studentsStore.addStudent(formData)
        : await studentsStore.updateStudent(route.params.studentId, formData)

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
  if (!route.params.studentId) return

  try {
    const result = await studentsStore.getStudent(route.params.studentId)
    const student = result.data.student

    const filterObject = (obj) => {
      // eslint-disable-next-line no-unused-vars
      const { id, createdAt, updatedAt, studentId, ...filteredObj } = obj
      return filteredObj
    }

    for (const key in initialData) {
      initialData[key] = filterObject(student[key])
    }

    for (const key in initialData) {
      formData.value[key] = initialData[key]
    }

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
        :isViewMode="$route.meta.isViewMode"
        :key="updateKey"
      />
      <BulkForm @dataChanged="updateFormData" :key="updateKey + 1" />

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
