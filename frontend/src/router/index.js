import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/login_view/LoginView.vue'

import ActiveClassesView from '../views/class_view/ActiveClassesView.vue'
import ClassRecordsView from '../views/class_view/ClassRecordsView.vue'
import ClassView from '../views/class_view/ClassView.vue'
import StrandView from '../views/class_view/StrandView.vue'
import ModuleView from '../views/class_view/ModuleView.vue'
import CreateClassesView from '../views/class_view/CreateClassesView.vue'

import RecordsView from '../views/staff_view/RecordsView.vue'
import PermissionsView from '../views/staff_view/PermissionsView.vue'
import AddStaffView from '../views/staff_view/AddStaffView.vue'


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
      path: '/activeClasses',
      name: 'Active Classes',
      component: ActiveClassesView
    },
    {
      path: '/classRecords',
      name: 'Class Records',
      component: ClassRecordsView,
      children: [
        {
          path: 'classInformation',
          name: 'Class Information',
          component: ClassView,
          children: [
            {
              path: 'strandInformation',
              name: 'Strand Information',
              component: StrandView,
              children: [
                {
                  path: 'moduleInformation',
                  name: 'Module Information',
                  component: ModuleView
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/createClasses',
      name: 'Create Classes',
      component: CreateClassesView
    },
    {
      path: '/staffRecords',
      name: 'Staff Records',
      component: RecordsView
    },
    {
      path: '/staffPermissions',
      name: 'Staff Permissions',
      component: PermissionsView
    },
    {
      path: '/addStaff',
      name: 'Add Staff',
      component: AddStaffView
    }
  ]
})

export default router
