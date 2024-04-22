import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardPage from '../views/DashboardPage.vue'
import ActiveClassesView from '../views/ActiveClassesPage.vue'
import ClassHistoryView from '../views/ClassHistoryView.vue'
import CreateClassesView from '../views/CreateClassesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login-page',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardPage
    },
    {
      path: '/active-classes',
      name: 'Active Classes',
      component: ActiveClassesView
    },
    {
      path: '/class-history',
      name: 'Class History',
      component: ClassHistoryView
    },
    {
      path: '/create-classes',
      name: 'Create Classes',
      component: CreateClassesView
    },
  ]
})

export default router
