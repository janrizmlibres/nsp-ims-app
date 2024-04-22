import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '../views/DashboardPage.vue'
import ActiveClassesView from '../views/ActiveClassesView.vue'
import ClassHistoryView from '../views/ClassHistoryView.vue'
import CreateClassesView from '../views/CreateClassesView.vue'

import RecordsView from '@/views/staff_view/RecordsView.vue'
import PermissionsView from '@/views/staff_view/PermissionsView.vue'
import AddStaffView from '@/views/staff_view/AddStaffView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardPage
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
    }
  ]
})

export default router
