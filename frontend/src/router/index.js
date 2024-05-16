import { createRouter, createWebHistory } from 'vue-router'
// Dashboard View
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/login/LoginView.vue'
import TheRootView from '../views/TheRootView.vue'

// Enrollment Views
import CurrentEnrollmentView from '@/views/enrollment/CurrentEnrollmentView.vue'
import EnrollmentHistoryView from '@/views/enrollment/EnrollmentHistoryView.vue'
import EnrollLearnersView from '@/views/enrollment/EnrollLearnersView.vue'
import EditEnrolledView from '@/views/enrollment/EditEnrolledView.vue'

// Class Management Views
import ClassesView from '../views/class_mgmt/ClassesView.vue'
import ClassView from '../views/class_mgmt/ClassView.vue'
import StrandView from '../views/class_mgmt/StrandView.vue'
import ModuleView from '../views/class_mgmt/ModuleView.vue'

// Utilities Views
import StudentRequirementView from '@/views/utilities/StudentRequirementView.vue'
import LearningStrandView from '@/views/utilities/LearningStrandView.vue'
import TermView from '@/views/utilities/TermView.vue'

// Staff Management Views
import RecordsView from '@/views/staff_mgmt/RecordsView.vue'
import PermissionsView from '@/views/staff_mgmt/PermissionsView.vue'
import StaffFormView from '@/views/staff_mgmt/StaffFormView.vue'
import AuditView from '@/views/staff_mgmt/AuditView.vue'

import StudentRecordsView from '@/views/student_mgmt/StudentRecordsView.vue'
import StudentFormView from '@/views/student_mgmt/StudentFormView.vue'

import VolunteerRecordsView from '@/views/volunteer_view/VolunteerRecordsView.vue'
import AdmitVolunteerView from '@/views/volunteer_view/AdmitVolunteerView.vue'

import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      component: TheRootView,
      redirect: { name: 'dashboard' },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: 'students',
          beforeEnter: () => {
            const authStore = useAuthStore()
            return authStore.staff.permissions.canMgStuds ? true : { name: 'dashboard' }
          },
          children: [
            {
              path: '',
              name: 'student-records',
              component: StudentRecordsView
            },
            {
              path: 'add',
              name: 'add-student',
              component: StudentFormView
            }
          ]
        },
        {
          path: 'enrollment',
          children: [
            {
              path: 'current',
              name: 'current-enrollment',
              component: CurrentEnrollmentView
            },
            {
              path: 'history',
              name: 'enrollment-history',
              component: EnrollmentHistoryView
            },
            {
              path: 'enroll-learners',
              name: 'enroll-learners',
              component: EnrollLearnersView,
              beforeEnter: () => {
                const authStore = useAuthStore()
                return authStore.staff.permissions.canMgEnrollment ? true : { name: 'dashboard' }
              },
            },
            {
              path: 'edit-enrolled',
              name: 'edit-enrolled',
              query: { studentId: Number, enrollmentId: Number, academicYear: String},
              component: EditEnrolledView,
              beforeEnter: () => {
                const authStore = useAuthStore()
                return authStore.staff.permissions.canMgEnrollment ? true : { name: 'dashboard' }
              },
            }
          ]
        },
        {
          path: '',
          beforeEnter: () => {
            const authStore = useAuthStore()
            return authStore.staff.permissions.canMgClass ? true : { name: 'dashboard' }
          },
          children: [
            {
              path: '/class',
              name: 'class',
              component: ClassView,
              query: {
                id: Number,
                action: String
              },
              beforeEnter: (to) => {
                return Object.keys(to.query).length === 0 ? { name: 'dashboard' } : true
              }
            },
            {
              path: '/strand',
              name: 'strand-info',
              component: StrandView,
              query: { id: Number }
            },
            {
              path: '/module',
              name: 'module-info',
              component: ModuleView,
              query: { id: Number }
            },
            {
              path: 'classes',
              name: 'class-records',
              component: ClassesView
            }
          ]
        },
        {
          path: '/management/terms',
          name: 'term-management',
          component: TermView,
          beforeEnter: () => {
            const authStore = useAuthStore()
            return authStore.staff.permissions.canMgTerm ? true : { name: 'dashboard' }
          }
        },
        {
          path: '/management/learning_strands',
          name: 'learning-strand-management',
          component: LearningStrandView,
          beforeEnter: () => {
            const authStore = useAuthStore()
            return authStore.staff.permissions.canMgLs ? true : { name: 'dashboard' }
          }
        },
        {
          path: '/management/student_requirements',
          name: 'student-requirements-management',
          component: StudentRequirementView,
          beforeEnter: () => {
            const authStore = useAuthStore()
            return authStore.staff.permissions.canMgStudReq ? true : { name: 'dashboard' }
          }
        },
        {
          path: '/volunteer-records', // Add this route object
          name: 'volunteer-records',
          component: VolunteerRecordsView
        },
        {
          path: '/admit-volunteers', // New route object
          name: 'admit-volunteers',
          component: AdmitVolunteerView
        },
        {
          path: 'staffs',
          beforeEnter: () => {
            const authStore = useAuthStore()
            return authStore.staff.permissions.canMgStaff ? true : { name: 'dashboard' }
          },
          children: [
            {
              path: '',
              name: 'staff-records',
              component: RecordsView
            },
            {
              path: 'permissions',
              name: 'staff-permissions',
              component: PermissionsView
            },
            {
              path: 'add',
              name: 'add-staff',
              component: StaffFormView
            },
            {
              path: ':userId',
              name: 'edit-staff',
              component: StaffFormView,
              props: true
            }
          ]
        },
        {
          path: 'utilities',
          children: [
            {
              path: 'audit-trails',
              name: 'audit-trails',
              component: AuditView
            }
          ]
        }
      ]
    },
    { path: '/:misc(.*)', redirect: { name: 'login' } }
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.name !== 'login' && !authStore.isAuthenticated) {
    return { name: 'login' }
  } else if (to.name === 'login' && authStore.isAuthenticated) {
    return { name: 'dashboard' }
  } else {
    return true
  }
})

export default router
