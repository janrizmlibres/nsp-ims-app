import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/login_view/LoginView.vue'

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
      path: '/classes',
      name: 'class-records',
      component: ClassesView,
    },
    {
      path: '/:term/class',
      name: 'class-info',
      component: ClassView,
      props: true,
      query: {
        id: Number
      },
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
            },
          ]
        },
      ]
    },
    {
      path: '/management/terms',
      name: 'term-management',
      component: TermView
    },
    {
      path: '/management/student_requirements',
      name: 'student-requirements-management',
      component: StudentRequirementView
    },
    {
      path: '/management/learning_strands',
      name: 'learning-strand-management',
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
      component: StaffFormView
    },
    {
      path: '/staffs/:userId',
      name: 'edit-staff',
      component: StaffFormView,
      props: true
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
