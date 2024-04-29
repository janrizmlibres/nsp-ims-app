import { defineStore } from 'pinia'

export const useStrandStore = defineStore('strands', {
    state: () => ({
        data: [
            {
                id: 1,
                code: 'LS1E',
                name: 'Communication Skills - English'
            },
            {
                id: 2,
                code: 'LS1F',
                name: 'Communication Skills - Filipino'
            },
            {
                id: 3,
                code: 'LS2',
                name: 'Science'
            },
            {
                id: 4,
                code: 'LS3',
                name: 'Mathematics'
            },
            {
                id: 5,
                code: 'LS4',
                name: 'Career and Life Skills'
            },
            {
                id: 6,
                code: 'LS5',
                name: 'Understanding the Self and the Society (Culture, Arts and Music)'
            },
            {
                id: 7,
                code: 'LS6',
                name: 'Digital Literacy'
            },
        ],

        dataColumns: [
            { field: 'code', header: 'Learning Strand Code' },
            { field: 'name', header: 'Learning Strand Name' }
    ],
  }),
})