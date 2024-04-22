import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ActiveClassesView from '../views/ActiveClassesView.vue'
import ClassHistoryView from '../views/ClassHistoryView.vue'
import CreateClassesView from '../views/CreateClassesView.vue'
import StaffView from '../views/staff_view/StaffView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView
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
      name: 'Staff Management',
      component: StaffView
    }
  ]
})

export default router
