import { defineStore } from 'pinia'

export const useClassesStore = defineStore('classes', {
  state: () => ({
    data: [
      {
        id: 5,
        batch_number: '5',
        academic_year: '2020-2021',
        start_date: 'August 01, 2020',
        end_date: 'May 31, 2021',
        schoollevels: [
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
      }
    ],
    dataColumns: [
      { field: 'batch_number', header: 'Batch no.' },
      { field: 'academic_year', header: 'Academic Year' },
      { field: 'start_date', header: 'Start Date' },
      { field: 'end_date', header: 'End Date' }
    ],

    expansionColumns: [
      { field: 'schoollevel', header: 'School Level' },
      { field: 'active', header: 'Active' },
      { field: 'inactive', header: 'Inactive' },
      { field: 'drop', header: 'Drop' },
      { field: 'totalstudents', header: 'Total Students' }
    ]
  }),

  actions: {
    exportCSV() {
      this.exportRef.exportCSV()
    }
  }
})
