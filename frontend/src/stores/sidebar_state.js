import { defineStore } from 'pinia'

export const useSideBarStore = defineStore('sidebar', {
  state: () => ({
    items: [
      {
        key: '1',
        label: 'Dashboard',
        icon: 'fa fa-home',
        route: '/'
      },
      {
        key: '2',
        label: 'Student Management',
        icon: 'fa fa-id-card',
        items: [
          {
            key: '2-1',
            label: 'Student Records',
            icon: 'fa fa-address-book',
            route: '/student-records'
          },
          {
            key: '2-2',
            label: 'Student Requirements',
            icon: 'fa fa-list-check',
            route: '/student-requirements'
          },
          {
            key: '2-3',
            label: 'Admit Students',
            icon: 'fa fa-user-plus',
            route: '/admit-students'
          }
        ]
      },
      {
        key: '3',
        label: 'Enrollment Management',
        icon: 'fa fa-school',
        items: [
          {
            key: '3-1',
            label: 'Active Academic Year',
            icon: 'fa fa-calendar-week',
            route: '/active-academic-year'
          },
          {
            key: '3-2',
            label: 'Enrollment Records',
            icon: 'fa fa-scroll',
            route: '/enrollment-history'
          },
          {
            key: '3-3',
            label: 'Enroll Students',
            icon: 'fa fa-school-flag',
            route: '/enroll-students'
          }
        ]
      },
      {
        key: '4',
        label: 'Volunteer Management',
        icon: 'fa fa-users',
        items: [
          {
            key: '4-1',
            label: 'Volunteer Records',
            icon: 'fa fa-address-book',
            route: '/volunteer-records'
          },
          {
            key: '4-2',
            label: 'Admit Volunteers',
            icon: 'fa fa-user-plus',
            route: '/admit-volunteers'
          }
        ]
      },
      {
        key: '5',
        label: 'Class Management',
        icon: 'fa fa-book-open',
        items: [
          {
            key: '5-1',
            label: 'Active Classes',
            icon: 'fa fa-book-bookmark',
            route: '/active-classes'
          },
          {
            key: '5-2',
            label: 'Class Records',
            icon: 'fa fa-scroll',
            route: '/class-history'
          },
          {
            key: '5-3',
            label: 'Create Classes',
            icon: 'fa fa-book-medical',
            route: '/create-classes'
          }
        ]
      },
      {
        key: '6',
        label: 'Term Management',
        icon: 'fa fa-calendar-days',
        route: '/term-management'
      },
      {
        key: '7',
        label: 'Learning Strand Management',
        icon: 'fa fa-book',
        route: '/learning-strand-management'
      },
      {
        key: '8',
        label: 'Student Requirements Management',
        icon: 'fa fa-list',
        route: '/student-requirements-management'
      },
      {
        key: '9',
        label: 'Staff Management',
        icon: 'fa fa-user',
        items: [
          {
            key: '9-1',
            label: 'Staff Records',
            icon: 'fa fa-address-book',
            route: '/staff-records'
          },
          {
            key: '9-2',
            label: 'Staff Permissions',
            icon: 'fa fa-shield-halved',
            route: '/staff-permissions'
          },
          {
            key: '9-3',
            label: 'Add Staff',
            icon: 'fa fa-user-plus',
            route: '/add-staff'
          }
        ]
      },
      {
        key: '10',
        label: 'Utilities',
        icon: 'fa fa-gear',
        items: [
          {
            key: '10-1',
            label: 'Generate Reports',
            icon: 'fa fa-note-sticky',
            route: '/generate-reports'
          },
          {
            key: '10-2',
            label: 'Audit Trails',
            icon: 'fa fa-clock-rotate-left',
            route: '/audit-trails'
          }
        ]
      }
    ],

    name: "User",
    role: "Admin",
    isPinned: true,
    isExpanded: true,
    expandedKeys: {}
  }),
  actions: {
    changePinnedState() {
      this.isPinned = !this.isPinned
    },
    changeExpansionState() {
      this.isExpanded = !this.isExpanded
    },
    collapseAll() {
      this.expandedKeys = {}
    },
    changeState() {
      this.collapseAll()
      this.changePinnedState()
      this.changeExpansionState()
    }
  }
})
