import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '@/views/DashboardPage.vue'
import ActiveClassesPage from '@/views/ActiveClassesPage.vue'
import ClassHistoryPage from '@/views/ClassHistoryPage.vue'
import CreateClassesPage from '@/views/CreateClassesPage.vue'
import StaffView from '@/views/StaffView.vue'
// import AddStaff from '@/components/AddStaff.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardPage
    },
    {
      path: '/active-classes',
      name: 'Active Classes',
      component: ActiveClassesPage
    },
    {
      path: '/class-history',
      name: 'Class History',
      component: ClassHistoryPage
    },
    {
      path: '/create-classes',
      name: 'Create Classes',
      component: CreateClassesPage
    },
    {
      path: '/staff',
      name: 'staff management',
      component: StaffView
    }
  ]
})

export default router
