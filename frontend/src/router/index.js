import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/login_view/LoginView.vue'
import ActiveClassesView from '../views/class_view/ActiveClassesView.vue'
import ClassRecordsView from '../views/class_view/ClassRecordsView.vue'
import CreateClassesView from '../views/class_view/CreateClassesView.vue'

import RecordsView from '@/views/staff_view/RecordsView.vue'
import PermissionsView from '@/views/staff_view/PermissionsView.vue'
import AddStaffView from '@/views/staff_view/AddStaffView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login page',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView
    },
    {
      path: '/active-classes',
      name: 'Active Classes',
      component: ActiveClassesView
    },
    {
      path: '/class-history',
      name: 'Class Records',
      component: ClassRecordsView
    },
    {
      path: '/create-classes',
      name: 'Create Classes',
      component: CreateClassesView
    },
    {
      path: '/staff-records',
      name: 'Staff Records',
      component: RecordsView
    },
    {
      path: '/staff-permissions',
      name: 'Staff Permissions',
      component: PermissionsView
    },
    {
      path: '/add-staff',
      name: 'Add Staff',
      component: AddStaffView
    }
  ]
})

export default router
