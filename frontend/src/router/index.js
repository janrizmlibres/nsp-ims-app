import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/login_view/LoginView.vue'
import ActiveClassesView from '../views/class_view/ActiveClassesView.vue'
import ClassRecordsView from '../views/class_view/ClassRecordsView.vue'
import CreateClassesView from '../views/class_view/CreateClassesView.vue'

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
      path: '/class-history',
      name: 'class-records',
      component: ClassRecordsView
    },
    {
      path: '/create-classes',
      name: 'create-classes',
      component: CreateClassesView
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
      path: '/staffs/add-staff',
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
  } else {
    next()
  }
})

export default router
