import { defineStore } from 'pinia'

export const useRequirementStore = defineStore('requirements', {
    state: () => ({
        data: [
            {
                id: 1,
                requirementname: 'Enrollment Form'
            },
            {
                id: 2,
                requirementname: 'CSWD Endorsement Letter'
            },
            {
                id: 3,
                requirementname: 'Birth Certificate'
            },
            {
                id: 4,
                requirementname: 'Barangay Clearance'
            },
            {
                id: 5,
                requirementname: 'Certificate of Residency'
            },
            {
                id: 6,
                requirementname: 'Health Records'
            },
            {
                id: 7,
                requirementname: 'Waiver for Photos'
            },
        ],

        dataColumns: [
            { field: 'id', header: 'ID'},
            { field: 'requirementname', header: 'Student Requirement Name' }
    ],
  }),
})