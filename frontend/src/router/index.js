import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView,
  },
  // other routes...
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
<<<<<<<<< Temporary merge branch 1
      name: 'login',
      component: LoginView
    },
    {
=========
      name: 'class management',
      component: ClassPage
>>>>>>>>> Temporary merge branch 2
    }
  ]
})

export default router;