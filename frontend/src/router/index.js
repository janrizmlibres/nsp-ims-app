import { createRouter, createWebHistory } from 'vue-router'
// Dashboard View
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/login/LoginView.vue'
import TheRootView from '../views/TheRootView.vue'

// Class Management Views
import ModuleView from '../views/class_mgmt/ModuleView.vue'
import ManageScheduleView from '@/views/class_mgmt/ManageScheduleView.vue'
import ManageModuleView from '@/views/class_mgmt/ManageModuleView.vue'

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
import ManageGradeView from '@/views/class_mgmt/ManageGradeView.vue'
import ManageSessionView from '@/views/class_mgmt/ManageSessionView.vue'
import SessionView from '@/views/class_mgmt/SessionView.vue'

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
            },
            {
              path: ':studentId',
              name: 'view-student',
              component: StudentFormView,
              props: true
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
              path: '/schedules',
              name: 'schedules',
              component: ManageScheduleView
            },
            {
              path: '/modules',
              name: 'modules',
              component: ManageModuleView
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
              path: '/grades',
              name: 'grades',
              component: ManageGradeView
            },
            {
              path: '/sessions',
              name: 'sessions',
              component: ManageSessionView
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
