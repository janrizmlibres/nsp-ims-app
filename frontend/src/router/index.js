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
import EnrolledView from '@/views/enrollment/EnrolledView.vue'

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
import RecordsView from '@/views/user_mgmt/RecordsView.vue'
import PermissionsView from '@/views/user_mgmt/PermissionsView.vue'
import UserFormView from '@/views/user_mgmt/UserFormView.vue'
import AuditView from '@/views/user_mgmt/AuditView.vue'

import StudentRecordsView from '@/views/student_mgmt/StudentRecordsView.vue'
import StudentFormView from '@/views/student_mgmt/StudentFormView.vue'

import VolunteerRecordsView from '@/views/volunteer_view/VolunteerRecordsView.vue'
import AdmitVolunteerView from '@/views/volunteer_view/AdmitVolunteerView.vue'

import { useAuthStore } from '@/stores/auth'
// import ManageGradeView from '@/views/class_mgmt/ManageGradeView.vue'
// import ManageSessionView from '@/views/class_mgmt/ManageSessionView.vue'

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
            return authStore.user.permissions.canMgStuds ? true : { name: 'dashboard' }
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
              path: 'enrolled/view',
              name: 'view-enrolled',
              query: {
                studentId: Number,
                enrollmentId: Number,
                schoolLevelId: Number,
                studentFullName: String
              },
              component: EnrolledView
            },
            {
              path: 'enroll-learners',
              name: 'enroll-learners',
              component: EnrollLearnersView,
              beforeEnter: () => {
                const authStore = useAuthStore()
                return authStore.user.permissions.canMgEnrollment ? true : { name: 'dashboard' }
              }
            },
            {
              path: 'edit-enrolled',
              name: 'edit-enrolled',
              query: { studentId: Number, enrollmentId: Number, academicYear: String },
              component: EditEnrolledView,
              beforeEnter: () => {
                const authStore = useAuthStore()
                return authStore.user.permissions.canMgEnrollment ? true : { name: 'dashboard' }
              }
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
              path: 'enrolled/view',
              name: 'view-enrolled',
              query: {
                studentId: Number,
                enrollmentId: Number,
                schoolLevelId: Number,
                studentFullName: String
              },
              component: EnrolledView
            },
            {
              path: 'enroll-learners',
              name: 'enroll-learners',
              component: EnrollLearnersView,
              beforeEnter: () => {
                const authStore = useAuthStore()
                return authStore.user.permissions.canMgEnrollment ? true : { name: 'dashboard' }
              }
            },
            {
              path: 'edit-enrolled',
              name: 'edit-enrolled',
              query: { studentId: Number, enrollmentId: Number, academicYear: String },
              component: EditEnrolledView,
              beforeEnter: () => {
                const authStore = useAuthStore()
                return authStore.user.permissions.canMgEnrollment ? true : { name: 'dashboard' }
              }
            }
          ]
        },
        {
          path: '',
          beforeEnter: () => {
            const authStore = useAuthStore()
            return authStore.user.permissions.canMgClass ? true : { name: 'dashboard' }
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
          path: '/configuration/academic_terms',
          name: 'academic-term-configuration',
          component: TermView,
          beforeEnter: () => {
            const authStore = useAuthStore()
            return authStore.user.permissions.canMgTerm ? true : { name: 'dashboard' }
          }
        },
        {
          path: '/configuration/learning_strand',
          name: 'learning-strand-configuration',
          component: LearningStrandView,
          beforeEnter: () => {
            const authStore = useAuthStore()
            return authStore.user.permissions.canMgLs ? true : { name: 'dashboard' }
          }
        },
        {
          path: '/configuration/student_requirement',
          name: 'student-requirement-configuration',
          component: StudentRequirementView,
          beforeEnter: () => {
            const authStore = useAuthStore()
            return authStore.user.permissions.canMgStudReq ? true : { name: 'dashboard' }
          }
        },
        {
          path: '/configuration/student_category',
          name: 'student-category-configuration',
          component: StudentCategoryView,
          beforeEnter: () => {
            const authStore = useAuthStore()
            return authStore.user.permissions.canMgStudCat ? true : { name: 'dashboard' }
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
          path: 'users',
          beforeEnter: () => {
            const authStore = useAuthStore()
            return authStore.user.permissions.canMgUser ? true : { name: 'dashboard' }
          },
          children: [
            {
              path: '',
              name: 'user-records',
              component: RecordsView
            },
            {
              path: 'permissions',
              name: 'user-permissions',
              component: PermissionsView
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
