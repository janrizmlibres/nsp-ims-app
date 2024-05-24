<script setup>
import Button from 'primevue/button'
// import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

import { onMounted, ref, computed, provide, watch, readonly } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'

import ContentPane from '@/components/UI/ContentPane.vue'
import IdentityForm from '@/components/student_mgmt/profile_view/IdentityForm.vue'
import BulkForm from '@/components/student_mgmt/profile_view/BulkForm.vue'
import { useStudentsStore } from '@/stores/students'

import { FormParts } from '@/util/student_utils'
import { isEqual } from 'lodash'

const emit = defineEmits({ routeChange: [] })

const route = useRoute()
const router = useRouter()
// const toast = useToast()
const confirm = useConfirm()

const studentsStore = useStudentsStore()

const initialData = {
  identity: {
    firstName: '',
    middleName: '',
    lastName: '',
    suffixName: null,
    lrn: '',
    category: null,
    photoUrl: null
  },
  personalInfo: {
    birthday: null,
    bloodType: null,
    birthCity: '',
    birthProvince: '',
    religion: '',
    sex: null,
    civilStatus: null,
    homeBlkLtSt: '',
    homeBarangay: '',
    homeCity: '',
    homeProvince: ''
  },
  contactInfo: {
    email: '',
    contactNum: '',
    facebook: ''
  },
  emergencyPerson: {
    firstName: '',
    middleName: '',
    lastName: '',
    suffixName: null,
    contactNum: '',
    relationship: ''
  },
  parentalInfo: {
    lastNameF: '',
    middleNameF: '',
    firstNameF: '',
    suffixNameF: null,
    occupationF: '',
    lastNameM: '',
    middleNameM: '',
    firstNameM: '',
    suffixNameM: null,
    occupationM: ''
  },
  prevSchool: {
    name: '',
    schoolType: null,
    schoolAffiliation: null,
    lastSyAttended: null,
    highestEducation: null,
    gradeStopped: null,
    reason: '',
    street: '',
    city: '',
    province: ''
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
        ? await studentsStore.addStudent(formData.value)
        : await studentsStore.updateStudent(route.params.studentId, formData.value)

    // toast.add({
    //   severity: 'success',
    //   summary: 'Success',
    //   detail: result.data.message,
    //   life: 5000
    // })

    confirm.require({
      group: 'user-headless',
      header: 'Success',
      message: result.data.message,
      acceptLabel: 'OK',
      icon: 'fa-solid fa-thumbs-up'
    })

    await goToStudentView()
  } catch (error) {
    confirm.require({
      group: 'user-headless',
      header: 'Data is Incorrect',
      message: 'Make sure inputs are correct and all required fields are filled in.',
      acceptLabel: 'OK',
      icon: 'fa-solid fa-triangle-exclamation'
    })
  }
}

onBeforeRouteLeave((to) => {
  if (!isFormDirty.value || isOkToLeave) return true

  confirm.require({
    group: 'user-headless',
    header: 'Redirect Confirmation',
    message: 'Do you really want to leave? You have unsaved changes!',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
    icon: 'fa-solid fa-diamond-turn-right',
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

    const {
      personal_info,
      contact_info,
      emergency_person,
      parental_info,
      previous_school,
      ...identity
    } = student

    initialData.identity = filterObject(identity)
    initialData.personalInfo = filterObject(personal_info)
    initialData.contactInfo = filterObject(contact_info)
    initialData.emergencyPerson = filterObject(emergency_person)
    initialData.parentalInfo = parental_info && filterObject(parental_info)
    initialData.prevSchool = filterObject(previous_school)

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
    <form @submit.prevent="handleConfirm">
      <div class="flex flex-col gap-3 h-full mr-1">
        <IdentityForm
          @dataChanged="updateFormData"
          :identity="formData.identity"
          :isViewMode="$route.meta.isViewMode"
          :key="updateKey"
        />
        <BulkForm @dataChanged="updateFormData" :key="updateKey + 1" />

        <div class="flex-none text-right">
          <div class="inline-block">
            <Button type="submit" class="h-10 u-bg-green" :disabled="!isFormDirty">
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
    </form>
  </ContentPane>
</template>
