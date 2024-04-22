import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
import DashboardView from '../views/DashboardView.vue'
import ActiveClassesView from '../views/ActiveClassesView.vue'
import ClassHistoryView from '../views/ClassHistoryView.vue'
import CreateClassesView from '../views/CreateClassesView.vue'
import StaffView from '../views/staff_view/StaffView.vue'
=======
import LoginView from '../views/login_view/LoginView.vue'
import DashboardPage from '../views/DashboardPage.vue'
import ActiveClassesView from '../views/ActiveClassesView.vue'
import ClassHistoryView from '../views/ClassHistoryView.vue'
import CreateClassesView from '../views/CreateClassesView.vue'

import RecordsView from '@/views/staff_view/RecordsView.vue'
import PermissionsView from '@/views/staff_view/PermissionsView.vue'
import AddStaffView from '@/views/staff_view/AddStaffView.vue'
>>>>>>> ed46ac4c73d8b179f05102f3c491184dc07a900e

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
<<<<<<< HEAD
      name: 'Dashboard',
      component: DashboardView
=======
      name: 'login page',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage
>>>>>>> ed46ac4c73d8b179f05102f3c491184dc07a900e
    },
    {
      path: '/active-classes',
      name: 'active classes',
      component: ActiveClassesView
    },
    {
      path: '/class-history',
      name: 'class history',
      component: ClassHistoryView
    },
    {
      path: '/create-classes',
      name: 'create classes',
      component: CreateClassesView
    },
    {
      path: '/staff-records',
<<<<<<< HEAD
      name: 'Staff Management',
      component: StaffView
=======
      name: 'staff records',
      component: RecordsView
    },
    {
      path: '/staff-permissions',
      name: 'staff permissions',
      component: PermissionsView
    },
    {
      path: '/add-staff',
      name: 'add staff',
      component: AddStaffView
>>>>>>> ed46ac4c73d8b179f05102f3c491184dc07a900e
    }
  ]
})

export default router
