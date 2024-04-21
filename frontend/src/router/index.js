import { createRouter, createWebHistory } from 'vue-router'
import ClassPage from '../views/ClassPage.vue'
import StaffView from '@/views/StaffView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'class management',
      component: ClassPage
    },
    {
      path: '/staff',
      name: 'staff management',
      component: StaffView
    }
  ]
})

export default router
