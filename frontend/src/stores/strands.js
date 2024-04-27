import { defineStore } from 'pinia'

export const useStrandStore = defineStore('strands', {
    state: () => ({
        data: [
            {
                id: 1,
                strandcode: 'LS1E',
                strandname: 'Communication Skills - English'
            },
            {
                id: 2,
                strandcode: 'LS1F',
                strandname: 'Communication Skills - Filipino'
            },
            {
                id: 3,
                strandcode: 'LS2',
                strandname: 'Science'
            },
            {
                id: 4,
                strandcode: 'LS3',
                strandname: 'Mathematics'
            },
            {
                id: 5,
                strandcode: 'LS4',
                strandname: 'Career and Life Skills'
            },
            {
                id: 6,
                strandcode: 'LS5',
                strandname: 'Understanding the Self and the Society (Culture, Arts and Music)'
            },
            {
                id: 7,
                strandcode: 'LS6',
                strandname: 'Digital Literacy'
            },
        ],

        dataColumns: [
            { field: 'id', header: 'ID'},
            { field: 'strandcode', header: 'Learning Strand Code' },
            { field: 'strandname', header: 'Learning Strand Name' }
    ],
  }),
})