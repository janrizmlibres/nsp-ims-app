import { defineStore } from 'pinia'
import { FilterMatchMode } from 'primevue/api';
import { ref } from 'vue';

export const useTermsStore = defineStore('terms', {
    state: () => ({
        data: [
            {
                id: 1,
                batch_number: '1',
                academic_year: '2016-2017',
                start_date: 'August 01, 2016',
                end_date: 'May 31, 2017',
                term_status: "Inactive"
            },
            {
                id: 2,
                batch_number: '2',
                academic_year: '2017-2018',
                start_date: 'August 01, 2017',
                end_date: 'May 31, 2018',
                term_status: "Inactive"
            },
            {
                id: 3,
                batch_number: '3',
                academic_year: '2018-2019',
                start_date: 'August 01, 2018',
                end_date: 'May 31, 2019',
                term_status: "Inactive"
            },
            {
                id: 4,
                batch_number: '4',
                academic_year: '2019-2020',
                start_date: 'August 01, 2019',
                end_date: 'May 31, 2020',
                term_status: "Inactive"
            },
            {
                id: 5,
                batch_number: '5',
                academic_year: '2020-2021',
                start_date: 'August 01, 2020',
                end_date: 'May 31, 2021',
                term_status: "Inactive"
            },
            {
                id: 6,
                batch_number: '6',
                academic_year: '2021-2022',
                start_date: 'August 01, 2021',
                end_date: 'May 31, 2022',
                term_status: "Inactive"
            },
            {
                id: 7,
                batch_number: '7',
                academic_year: '2022-2023',
                start_date: 'August 01, 2022',
                end_date: 'May 31, 2023',
                term_status: "Inactive"
            },
            {
                id: 8,
                batch_number: '8',
                academic_year: '2023-2024',
                start_date: 'August 01, 2023',
                end_date: 'May 31, 2024',
                term_status: "Active"
            },
        ]
  }),
})