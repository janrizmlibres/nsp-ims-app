import { defineStore } from 'pinia'
import { FilterMatchMode } from 'primevue/api';
import { ref } from 'vue';

export const useRosterStore = defineStore('roster', {
    state: () => ({
        data: [
        ],
        
        filters: {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            lrn: { value: null, matchMode: FilterMatchMode.CONTAINS },
            lastName: { value: null, matchMode: FilterMatchMode.CONTAINS },
            firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
            contactNumber: { value: null, matchMode: FilterMatchMode.CONTAINS }
        },
        
        globalFilters: ['lrn', 'lastName', 'firstName', 'contactNumber'],
        
        dataColumns: [
            { field: 'id', header: 'Id'},
            { field: 'lrn', header: 'LRN' },
            { field: 'lastName', header: 'Last Name' },
            { field: 'firstName', header: 'First Name' },
            { field: 'middleName', header: 'Middle Name' },
            { field: 'suffix', header: 'Suffix' },
            { field: 'category', header: 'Category' },
            { field: 'birthday', header: 'Birthday' },
            { field: 'bloodType', header: 'Blood Type' },
            { field: 'religion', header: 'Religion' },
            { field: 'sex', header: 'Sex' },
            { field: 'civilStatus', header: 'Civil Status' },
            { field: 'st', header: 'Street' },
            { field: 'barangay', header: 'Barangay' },
            { field: 'city', header: 'City' },
            { field: 'province', header: 'Province' },
            { field: 'contactNumber', header: 'Contact Number' },
            { field: 'email', header: 'Email' },
            { field: 'facebookName', header: 'facebookName' }
        ],

        exportRef: ref()
    }),

    actions: {
        exportCSV() {
            this.exportRef.exportCSV();
        }
    }
})
