import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useStudentsStore } from './students'
import { mapValues, isNil } from 'lodash'
import { FormParts } from '@/util/student_utils'

export const useStudentFormDataStore = defineStore('studentFormData', () => {
  const studentsStore = useStudentsStore()

  let date = new Date().getFullYear()

  const blankData = {
    identity: {
      firstName: '',
      middleName: '',
      lastName: '',
      suffixName: null,
      lrn: '',
      category: null,
      photoUrl: null,
      admitted_year: date + '-' + (date + 1) // Replace to backend
    },
    personalInfo: {
      birthday: null,
      bloodType: null,
      birthCity: '',
      birthProvince: '',
      religion: '',
      sex: null,
      civilStatus: null,
      homeDistrict: '',
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

  let initialData = structuredClone(blankData)
  let formData = ref(structuredClone(initialData))

  const contactRe = /(\+63|0)\s?\d{3}\s?\d{3}\s?\d{4}/

  const contactsInvalidState = ref({
    contactNum: false,
    emergencyNum: false
  })

  //   const isContactNumInvalid = computed(() => {
  //     const contactNumOk = contactRe.exec(formData.value.contactInfo.contactNum)
  //     return contactNumOk !== null ? false : true
  //   })

  //   const isEmergencyNumInvalid = computed(() => {
  //     const emergencyNumOk = contactRe.exec(formData.value.emergencyPerson.contactNum)
  //     return emergencyNumOk !== null ? false : true
  //   })

  const isFormDirty = computed(() => {
    for (const key in initialData) {
      for (const inner in initialData[key]) {
        let value1 = initialData[key][inner]
        let value2 = formData.value[key][inner]

        if (Object.prototype.toString.call(value1) === '[object Date]') {
          value1.setHours(0, 0, 0, 0)
          value2.setHours(0, 0, 0, 0)

          value1 = value1.getTime()
          value2 = value2.getTime()
        } else if (value1 instanceof Array) {
          continue
        }

        if (value1 !== value2) return true
      }
    }
    return false
  })

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

  function reset() {
    initialData = structuredClone(blankData)
    formData.value = structuredClone(initialData)
  }

  function setContactsInvalidState() {
    const contactNumOk = contactRe.exec(formData.value.contactInfo.contactNum)
    const emergencyNumOk = contactRe.exec(formData.value.emergencyPerson.contactNum)

    contactsInvalidState.value.contactNum = contactNumOk !== null ? false : true
    contactsInvalidState.value.emergencyNum = emergencyNumOk !== null ? false : true
  }

  async function submitStudentData(routeName, studentId) {
    if (routeName === 'add-student') {
      return await studentsStore.addStudent(formData.value)
    }
    return await studentsStore.updateStudent(studentId, formData.value)
  }

  async function populate(studentId) {
    const result = await studentsStore.getStudent(studentId)
    const student = result.data.student

    Object.keys(student).forEach((key) => delete student[key].id)

    initialData.identity = {
      // Convert all null fields to empty string ('')
      ...mapValues(student.identity, (field) => (isNil(field) ? '' : field)),
      suffixName: student.identity.suffixName,
      photoUrl: student.identity.photoUrl
    }

    initialData.personalInfo = {
      ...mapValues(student.personal_info, (field) => (isNil(field) ? '' : field)),
      bloodType: student.personal_info.bloodType
    }

    initialData.contactInfo = mapValues(student.contact_info, (field) => {
      isNil(field) ? '' : field
    })

    initialData.emergencyPerson = {
      ...mapValues(student.emergency_person, (field) => (isNil(field) ? '' : field)),
      suffixName: student.emergency_person.suffixName
    }

    initialData.parentalInfo = {
      ...mapValues(student.parental_info, (field) => (isNil(field) ? '' : field)),
      suffixNameF: student.parental_info.suffixNameF,
      suffixNameM: student.parental_info.suffixNameM
    }

    initialData.prevSchool = mapValues(student.previous_school, (field) => {
      isNil(field) ? '' : field
    })

    formData.value = structuredClone(initialData)

    // admitted_year: date + '-' + (date + 1) // Replace to backend
  }

  return {
    formData,
    isFormDirty,
    updateFormData,
    reset,
    populate,
    submitStudentData,
    setContactsInvalidState
  }
})
