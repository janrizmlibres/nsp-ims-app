import { createRouter, createWebHistory } from 'vue-router'
import ClassPage from '../views/ClassPage.vue'
import LoginView from '../views/LoginView.vue'
import DashboardPage from '../views/DashboardPage.vue'
import ActiveClassesPage from '../views/ActiveClassesPage.vue'
import ClassHistoryPage from '../views/ClassHistoryPage.vue'
import CreateClassesPage from '../views/CreateClassesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/', 
      name: 'class management',
      component: ClassPage
    },
    {
    
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
  ]
})

export default router
