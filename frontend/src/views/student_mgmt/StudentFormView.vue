<script setup>
import Button from 'primevue/button'

import ContentPane from '@/components/UI/ContentPane.vue'
import IdentityForm from '@/components/student_mgmt/profile_view/IdentityForm.vue'
import BulkForm from '@/components/student_mgmt/profile_view/BulkForm.vue'

import FormParts from '../../util/student_form_parts'

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
    LastNameF: null,
    MiddleNameF: null,
    FirstNameF: null,
    SuffixNameF: null,
    OccupationF: null,
    LastNameM: null,
    MiddleNameM: null,
    FirstNameM: null,
    SuffixNameM: null,
    OccupationM: null
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

  console.log(formData)
}
</script>

<template>
  <ContentPane :header="`Students / Add Record`" subheader="Academic Year 2022 - 2023">
    <div class="flex flex-col gap-3 h-full mr-1">
      <IdentityForm @dataChanged="updateFormData" />
      <BulkForm @dataChanged="updateFormData" />

      <div class="flex-none text-right">
        <div class="inline-block">
          <Button class="h-10 u-bg-green">
            <div>
              <font-awesome-icon
                icon="fa-solid fa-circle-check"
                class="absolute top-2/4 -mt-2 left-3"
              />
              <h2 class="pl-5 font-bold">Proceed</h2>
            </div>
          </Button>
          <Button class="h-10 ml-2 u-bg-red" label="Cancel" icon="fa-solid fa-circle-xmark" />
        </div>
      </div>
    </div>
  </ContentPane>
</template>
