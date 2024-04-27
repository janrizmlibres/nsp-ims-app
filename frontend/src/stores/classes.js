import { defineStore } from 'pinia'
import { FilterMatchMode } from 'primevue/api';
import { ref } from 'vue';

export const useClassesStore = defineStore('classes', {
  state: () => ({
    data: [
        {
            id: 5,
            batchnumber: '5',
            academicyear: '2020-2021',
            startdate: 'August 01, 2020',
            enddate: 'May 31, 2021',
            schoollevels: 
                [
                    {
                        id: '1005-1',
                        schoollevel: 'Grade School',
                        totalstudents: 12,
                        active: 10,
                        inactive: 1,
                        drop: 1
                    },
                    {
                        id: '1005-2',
                        schoollevel: 'Junior High School',
                        totalstudents: 9,
                        active: 4,
                        inactive: 4,
                        drop: 1
                    }
                ]
        },
        {
            id: 6,
            batchnumber: '6',
            academicyear: '2021-2022',
            startdate: 'August 01, 2021',
            enddate: 'May 31, 2022',
            schoollevels: 
                [
                    {
                        id: '1006-1',
                        schoollevel: 'Grade School',
                        totalstudents: 13,
                        active: 10,
                        inactive: 2,
                        drop: 1
                    },
                    {
                        id: '1006-2',
                        schoollevel: 'Junior High School',
                        totalstudents: 20,
                        active: 13,
                        inactive: 4,
                        drop: 3
                    }
                ]
        },
        {
            id: 7,
            batchnumber: '7',
            academicyear: '2022-2023',
            startdate: 'August 01, 2022',
            enddate: 'May 31, 2023',
            schoollevels: 
                [
                    {
                        id: '1007-1',
                        schoollevel: 'Grade School',
                        totalstudents: 13,
                        active: 10,
                        inactive: 2,
                        drop: 1
                    },
                    {
                        id: '1007-2',
                        schoollevel: 'Junior High School',
                        totalstudents: 20,
                        active: 13,
                        inactive: 4,
                        drop: 3
                    }
                ]
        },
        {
            id: 8,
            batchnumber: '8',
            academicyear: '2023-2024',
            startdate: 'August 01, 2023',
            enddate: 'May 31, 2024',
            schoollevels: 
                [
                    {
                        id: '1008-1',
                        schoollevel: 'Grade School',
                        totalstudents: 13,
                        active: 10,
                        inactive: 2,
                        drop: 1
                    },
                    {
                        id: '1008-2',
                        schoollevel: 'Junior High School',
                        totalstudents: 20,
                        active: 13,
                        inactive: 4,
                        drop: 3
                    }
                ]
        },
        {
            id: 9,
            batchnumber: '8',
            academicyear: '2023-2024',
            startdate: 'August 01, 2023',
            enddate: 'May 31, 2024',
            schoollevels: 
                [
                    {
                        id: '1008-1',
                        schoollevel: 'Grade School',
                        totalstudents: 13,
                        active: 10,
                        inactive: 2,
                        drop: 1
                    },
                    {
                        id: '1008-2',
                        schoollevel: 'Junior High School',
                        totalstudents: 20,
                        active: 13,
                        inactive: 4,
                        drop: 3
                    }
                ]
        },
        {
            id: 10,
            batchnumber: '8',
            academicyear: '2023-2024',
            startdate: 'August 01, 2023',
            enddate: 'May 31, 2024',
            schoollevels: 
                [
                    {
                        id: '1008-1',
                        schoollevel: 'Grade School',
                        totalstudents: 13,
                        active: 10,
                        inactive: 2,
                        drop: 1
                    },
                    {
                        id: '1008-2',
                        schoollevel: 'Junior High School',
                        totalstudents: 20,
                        active: 13,
                        inactive: 4,
                        drop: 3
                    }
                ]
        },
        {
            id: 11,
            batchnumber: '8',
            academicyear: '2023-2024',
            startdate: 'August 01, 2023',
            enddate: 'May 31, 2024',
            schoollevels: 
                [
                    {
                        id: '1008-1',
                        schoollevel: 'Grade School',
                        totalstudents: 13,
                        active: 10,
                        inactive: 2,
                        drop: 1
                    },
                    {
                        id: '1008-2',
                        schoollevel: 'Junior High School',
                        totalstudents: 20,
                        active: 13,
                        inactive: 4,
                        drop: 3
                    }
                ]
        },
        {
            id: 12,
            batchnumber: '8',
            academicyear: '2023-2024',
            startdate: 'August 01, 2023',
            enddate: 'May 31, 2024',
            schoollevels: 
                [
                    {
                        id: '1008-1',
                        schoollevel: 'Grade School',
                        totalstudents: 13,
                        active: 10,
                        inactive: 2,
                        drop: 1
                    },
                    {
                        id: '1008-2',
                        schoollevel: 'Junior High School',
                        totalstudents: 20,
                        active: 13,
                        inactive: 4,
                        drop: 3
                    }
                ]
        },
        {
            id: 13,
            batchnumber: '8',
            academicyear: '2023-2024',
            startdate: 'August 01, 2023',
            enddate: 'May 31, 2024',
            schoollevels: 
                [
                    {
                        id: '1008-1',
                        schoollevel: 'Grade School',
                        totalstudents: 13,
                        active: 10,
                        inactive: 2,
                        drop: 1
                    },
                    {
                        id: '1008-2',
                        schoollevel: 'Junior High School',
                        totalstudents: 20,
                        active: 13,
                        inactive: 4,
                        drop: 3
                    }
                ]
        }
    ],

    filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        batchnumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
        academicyear: { value: null, matchMode: FilterMatchMode.CONTAINS },
        startdate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        enddate: { value: null, matchMode: FilterMatchMode.CONTAINS }
    },

    globalFilters: ['batchnumber', 'academicyear', 'startdate', 'enddate'],

    dataColumns: [
        { field: 'id', header: 'Id'},
        { field: 'batchnumber', header: 'Batch no.' },
        { field: 'academicyear', header: 'Academic Year' },
        { field: 'startdate', header: 'Start Date' },
        { field: 'enddate', header: 'End Date' }
    ],

    expansionColumns: [
        { field: 'id', header: 'Id' },
        { field: 'schoollevel', header: 'School Level' },
        { field: 'active', header: 'Active' },
        { field: 'inactive', header: 'Inactive' },
        { field: 'drop', header: 'Drop' },
        { field: 'totalstudents', header: 'Total Students' }
    ],

    exportRef: ref()
  }),

  actions: {
    exportCSV() {
        this.exportRef.exportCSV();
    },
  }
})
