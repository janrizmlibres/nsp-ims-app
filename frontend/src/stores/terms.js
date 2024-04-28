import { defineStore } from 'pinia'

export const useTermStore = defineStore('terms', {
    state: () => ({
        data: [
            {
                id: 1,
                batchnumber: '1',
                academicyear: '2016-2017',
                startdate: 'August 01, 2016',
                enddate: 'May 31, 2017',
                termstatus: "Inactive"
            },
            {
                id: 2,
                batchnumber: '2',
                academicyear: '2017-2018',
                startdate: 'August 01, 2017',
                enddate: 'May 31, 2018',
                termstatus: "Inactive"
            },
            {
                id: 3,
                batchnumber: '3',
                academicyear: '2018-2019',
                startdate: 'August 01, 2018',
                enddate: 'May 31, 2019',
                termstatus: "Inactive"
            },
            {
                id: 4,
                batchnumber: '4',
                academicyear: '2019-2020',
                startdate: 'August 01, 2019',
                enddate: 'May 31, 2020',
                termstatus: "Inactive"
            },
            {
                id: 5,
                batchnumber: '5',
                academicyear: '2020-2021',
                startdate: 'August 01, 2020',
                enddate: 'May 31, 2021',
                termstatus: "Inactive"
            },
            {
                id: 6,
                batchnumber: '6',
                academicyear: '2021-2022',
                startdate: 'August 01, 2021',
                enddate: 'May 31, 2022',
                termstatus: "Inactive"
            },
            {
                id: 7,
                batchnumber: '7',
                academicyear: '2022-2023',
                startdate: 'August 01, 2022',
                enddate: 'May 31, 2023',
                termstatus: "Inactive"
            },
            {
                id: 8,
                batchnumber: '8',
                academicyear: '2023-2024',
                startdate: 'August 01, 2023',
                enddate: 'May 31, 2024',
                termstatus: "Active"
            },
        ],

        dataColumns: [
            { field: 'id', header: 'ID'},
            { field: 'batchnumber', header: 'Batch Number' },
            { field: 'academicyear', header: 'Academic Year' },
            { field: 'startdate', header: 'Start Date' },
            { field: 'enddate', header: 'End Date' },
            { field: 'termstatus', header: 'Status' }
    ],
  }),
})