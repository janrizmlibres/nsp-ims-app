import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/login_view/LoginView.vue'

import ActiveClassesView from '../views/class_mgmt/ActiveClassesView.vue'
import ClassesView from '../views/class_mgmt/ClassesView.vue'
import ClassView from '../views/class_mgmt/ClassView.vue'
import StrandView from '../views/class_mgmt/StrandView.vue'
import ModuleView from '../views/class_mgmt/ModuleView.vue'
import CreateClassesView from '../views/class_mgmt/CreateClassesView.vue'
import ClassRosterView from '@/views/class_mgmt/ClassRosterView.vue'

import StudentRequirementView from '../views/requirement_view/StudentRequirementView.vue'
import LearningStrandView from '../views/strand_view/LearningStrandView.vue'
import TermView from '../views/term_view/TermView.vue'
import RecordsView from '@/views/staff_view/RecordsView.vue'
import PermissionsView from '@/views/staff_view/PermissionsView.vue'
import AddStaffView from '@/views/staff_view/AddStaffView.vue'

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
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/active-classes',
      name: 'active-classes',
      component: ActiveClassesView
    },
    {
      path: '/class-records',
      name: 'class-records',
      component: ClassesView,
      children: [
        {
          path: 'class-information',
          name: 'class-info',
          component: ClassView,
          children: [
            {
              path: 'strand-information',
              name: 'strand-info',
              component: StrandView,
              children: [
                {
                  path: 'module-information',
                  name: 'module-info',
                  component: ModuleView
                }
              ]
            },
            {
              path: 'class-roster',
              name: 'class-roster',
              component: ClassRosterView,
            }
          ]
        }
      ]
    },
    {
      path: '/class-information',
      name: 'class-info',
      component: ClassView
    },
    {
      path: '/strand-information',
      name: 'strand-info',
      component: StrandView
    },
    {
      path: '/create-classes',
      name: 'create-classes',
      component: CreateClassesView
    },
    {
      path: '/class-roster',
      name: 'class-roster',
      component: ClassRosterView,
    },
    {
      path: '/term-management',
      name: 'Term Management',
      component: TermView
    },
    {
      path: '/student-requirements-management',
      name: 'Student Requirements Management',
      component: StudentRequirementView
    },
    {
      path: '/learning-strand-management',
      name: 'Learning Strand Management',
      component: LearningStrandView
    },
    {
      path: '/staffs',
      name: 'staff-records',
      component: RecordsView
    },
    {
      path: '/staffs/permissions',
      name: 'staff-permissions',
      component: PermissionsView
    },
    {
      path: '/staffs/add',
      name: 'add-staff',
      component: AddStaffView
    },
    { path: '/:misc(.*)', redirect: { name: 'login' } }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.name !== 'login' && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else if (to.name === 'login' && authStore.isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
