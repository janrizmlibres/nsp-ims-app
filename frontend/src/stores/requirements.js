import { defineStore } from 'pinia'

export const useRequirementStore = defineStore('requirements', {
  state: () => ({
    data: [
      {
        id: 1,
        requirement_name: 'Enrollment Form'
      },
      {
        id: 2,
        requirement_name: 'CSWD Endorsement Letter'
      },
      {
        id: 3,
        requirement_name: 'Birth Certificate'
      },
      {
        id: 4,
        requirement_name: 'Barangay Clearance'
      },
      {
        id: 5,
        requirement_name: 'Certificate of Residency'
      },
      {
        id: 6,
        requirement_name: 'Health Records'
      },
      {
        id: 7,
        requirement_name: 'Waiver for Photos'
      }
    ],

    dataColumns: [{ field: 'requirement_name', header: 'Student Requirement Name' }]
  })
})
