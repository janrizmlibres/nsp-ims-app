import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/login_view/LoginView.vue'
import TheRootView from '@/views/TheRootView.vue'

import ClassesView from '../views/class_mgmt/ClassesView.vue'
import ClassView from '../views/class_mgmt/ClassView.vue'
import StrandView from '../views/class_mgmt/StrandView.vue'
import ModuleView from '../views/class_mgmt/ModuleView.vue'
import CreateClassesView from '../views/class_mgmt/CreateClassesView.vue'

import StudentRequirementView from '../views/requirement_view/StudentRequirementView.vue'
import LearningStrandView from '../views/strand_view/LearningStrandView.vue'
import TermView from '../views/term_view/TermView.vue'

import RecordsView from '@/views/staff_view/RecordsView.vue'
import PermissionsView from '@/views/staff_view/PermissionsView.vue'
import StaffFormView from '@/views/staff_view/StaffFormView.vue'

import VolunteerRecordsView from '@/views/volunteer_view/VolunteerRecordsView.vue' // Add this line

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
          path: '',
          beforeEnter: () => {
            const authStore = useAuthStore()
            return authStore.staff.permissions.canMgClass ? true : { name: 'dashboard' }
          },
          children: [
            {
              path: ':term/class',
              name: 'class-info',
              component: ClassView,
              query: { id: Number },
              children: [
                {
                  path: 'add_learning_strand',
                  name: 'class-info',
                  component: CreateClassesView
                },
                {
                  path: '',
                  name: 'strand-info',
                  component: StrandView,
                  query: Number,
                  children: [
                    {
                      path: '',
                      name: 'module-info',
                      component: ModuleView,
                      query: {
                        module: Number
                      }
                    }
                  ]
                }
              ]
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