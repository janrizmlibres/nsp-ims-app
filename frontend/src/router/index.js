import { createRouter, createWebHistory } from 'vue-router'
// Dashboard View
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/login/LoginView.vue'
import TheRootView from '../views/TheRootView.vue'

// Enrollment Views
import EnrollmentHistoryView from '@/views/enrollment/EnrollmentHistoryView.vue'
import EnrollLearnersView from '@/views/enrollment/EnrollLearnersView.vue'
import EditEnrolledView from '@/views/enrollment/EditEnrolledView.vue'

// Class Management Views
import ManageClassView from '@/views/class_mgmt/ManageClassView.vue'
import ModuleView from '../views/class_mgmt/ModuleView.vue'
import SessionView from '@/views/class_mgmt/SessionView.vue'

// Utilities Views
import StudentCategoryView from '@/views/utilities/StudentCategoryView.vue'
import StudentRequirementView from '@/views/utilities/StudentRequirementView.vue'
import LearningStrandView from '@/views/utilities/LearningStrandView.vue'
import TermView from '@/views/utilities/TermView.vue'

// User Management Views
import UserRecordsView from '@/views/user_mgmt/UserRecordsView.vue'
import UserPermissionsView from '@/views/user_mgmt/UserPermissionsView.vue'
import UserFormView from '@/views/user_mgmt/UserFormView.vue'
import AuditView from '@/views/user_mgmt/AuditView.vue'

import StudentRecordsView from '@/views/student_mgmt/StudentRecordsView.vue'
import StudentFormView from '@/views/student_mgmt/StudentFormView.vue'
import StudentRequirementsSetView from '@/views/student_mgmt/StudentRequirementsSetView.vue'

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

            const hasPermission = () => {
              const { permissions, accessLevel } = authStore.user
              return permissions.canMgStuds || [1, 2].includes(accessLevel)
            }

            return hasPermission() ? true : { name: 'dashboard' }
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
              component: StudentFormView,
              meta: { isViewMode: false }
            },
            {
              path: ':studentId',
              name: 'view-student',
              component: StudentFormView,
              meta: { isViewMode: true }
            },
            {
              path: 'edit/:studentId',
              name: 'edit-student',
              component: StudentFormView,
              meta: { isViewMode: false }
            },
            {
              path: 'requirements',
              name: 'student-requirements-set',
              component: StudentRequirementsSetView
            }
          ]
        },
        {
          path: 'enrollment',
          beforeEnter: () => {
            const authStore = useAuthStore()

            const hasPermission = () => {
              const { permissions, accessLevel } = authStore.user
              return permissions.canMgEnrollment || [1, 2].includes(accessLevel)
            }

            return hasPermission() ? true : { name: 'dashboard' }
          },
          children: [
            {
              path: 'history',
              name: 'enrollment-history',
              component: EnrollmentHistoryView
            },
            {
              path: 'enroll-learners',
              name: 'enroll-learners',
              component: EnrollLearnersView
            },
            {
              path: 'edit-enrolled',
              name: 'edit-enrolled',
              query: { studentId: Number, enrollmentId: Number, academicYear: String },
              component: EditEnrolledView
            }
          ]
        },
        {
          path: 'volunteers',
          beforeEnter: () => {
            const authStore = useAuthStore()

            const hasPermission = () => {
              const { permissions, accessLevel } = authStore.user
              return permissions.canMgVolunteer || [1, 2].includes(accessLevel)
            }

            return hasPermission() ? true : { name: 'dashboard' }
          },
          children: [
            {
              path: 'records', // Add this route object
              name: 'volunteer-records',
              component: VolunteerRecordsView
            },
            {
              path: 'admit', // New route object
              name: 'admit-volunteers',
              component: AdmitVolunteerView
            },
            {
              path: ':id',
              name: 'view-volunteer',
              component: AdmitVolunteerView,
              meta: { isViewMode: true }
            },
            {
              path: 'edit/:id',
              name: 'edit-volunteer',
              component: AdmitVolunteerView,
              meta: { isViewMode: false }
            }
          ]
        },
        {
          path: '',
          beforeEnter: () => {
            const authStore = useAuthStore()

            const hasPermission = () => {
              const { permissions, accessLevel } = authStore.user
              return permissions.canMgClass || [1, 2].includes(accessLevel)
            }

            return hasPermission() ? true : { name: 'dashboard' }
          },
          children: [
            {
              path: '/class',
              name: 'class-management',
              component: ManageClassView
            },
            {
              path: '/module',
              name: 'module-info',
              component: ModuleView,
              query: { id: Number, status: Boolean },
              beforeEnter: (to) => {
                return Object.keys(to.query).length === 0 ? { name: 'dashboard' } : true
              }
            },
            {
              path: '/session',
              name: 'session-info',
              component: SessionView,
              query: { id: Number, status: Boolean },
              beforeEnter: (to) => {
                return Object.keys(to.query).length === 0 ? { name: 'dashboard' } : true
              }
            }
          ]
        },
        {
          path: 'users',
          beforeEnter: () => {
            const authStore = useAuthStore()

            const hasPermission = () => {
              const { permissions, accessLevel } = authStore.user
              return permissions.canMgUser || [1, 2].includes(accessLevel)
            }

            return hasPermission() ? true : { name: 'dashboard' }
          },
          children: [
            {
              path: '',
              name: 'user-records',
              component: UserRecordsView
            },
            {
              path: 'permissions',
              name: 'user-permissions',
              component: UserPermissionsView
            },
            {
              path: 'add',
              name: 'add-user',
              component: UserFormView
            },
            {
              path: ':userId',
              name: 'edit-user',
              component: UserFormView
            }
          ]
        },
        {
          path: 'configuration',
          beforeEnter: () => {
            const authStore = useAuthStore()
            return [1, 2].includes(authStore.user.accessLevel) ? true : { name: 'dashboard' }
          },
          children: [
            {
              path: '/configuration/academic_terms',
              name: 'academic-term-configuration',
              component: TermView
            },
            {
              path: '/configuration/learning_strand',
              name: 'learning-strand-configuration',
              component: LearningStrandView
            },
            {
              path: '/configuration/student_requirement',
              name: 'student-requirement-configuration',
              component: StudentRequirementView
            },
            {
              path: '/configuration/student_category',
              name: 'student-category-configuration',
              component: StudentCategoryView
            }
          ]
        },
        {
          path: 'audit-trails',
          name: 'audit-trails',
          component: AuditView
        }
      ]
    },
    { path: '/:misc(.*)', redirect: { name: 'login' } }
  ]
})

router.getRoutes().forEach((route) => {
  route.components ? (route.components.default.name = route.name) : null
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
