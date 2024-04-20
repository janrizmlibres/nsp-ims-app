import { createRouter, createWebHistory } from 'vue-router'
import ClassPage from '../views/ClassPage.vue'
import LoginView from '../views/LoginView.vue'

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
    }
  ]
})

export default router
