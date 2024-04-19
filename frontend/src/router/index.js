import { createRouter, createWebHistory } from 'vue-router'
import ClassPage from '../views/ClassPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'class management',
      component: ClassPage
    }
  ]
})

export default router
