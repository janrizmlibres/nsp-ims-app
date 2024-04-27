import { defineStore } from 'pinia'
import { FilterMatchMode } from 'primevue/api';

export const useClassStore = defineStore('class', {
  state: () => ({
    students: [
        {
            id: 1,
            lrn: 115932100021,
            lastName: 'Dela Cruz',
            firstName: 'Juan',
            middleName: 'Asuncion',
            suffix: '',
            category: 'Out-of-School Youth',
            birthday: 'January 01, 2002',
            bloodType: 'O+',
            religion: 'Roman Catholic',
            sex: 'M',
            civilStatus: 'Single',
            st: 'Zone 3, Dela Cruz Compound',
            barangay: 'Camaman-an',
            city: 'Cagayan de Oro City',
            province: 'Misamis Oriental',
            contactNumber: '09123456789',
            email: 'DelaCruzJuan@gmail.com',
            facebookName: 'Juan Dela Cruz',
            lastschoolname: 'Camaman-an Elementary School',
            schoolSt: 'Zone 3',
            schoolBarangay: 'Camaman-an',
            blockCity: 'Cagayan de Oro City',
            Province: 'Misamis Oriental,',
            Type: 'Public',
            religiousAffil: 'Non-sectarian',
            lastSy:'2012-2013',
            hat: 'Elementary',
            levelStopped: 'Grade 2',
            fatherLn: 'Dela Cruz',
            fatherFn: 'Fernando',
            fatherMn: 'Ponteciano',
            fatherOccup: '',
            fatherSuffix: 'T',
            motherLn: 'Potenciano',
            motherFn: 'Jade',
            motherMn: 'Adajar',
            motherSuffix: 'T',
            momotherOccup: '20',
            emeLn: 'Potenciano ',
            emeFn: 'Jade',
            emeMn: 'Adajar',
            emecontactNumber: '09123456789',
        }
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
    ]
  })
})
