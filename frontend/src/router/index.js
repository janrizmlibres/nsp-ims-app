import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/login_view/LoginView.vue'

import ActiveClassesView from '../views/class_mgmt/ActiveClassesView.vue'
import ClassesView from '../views/class_mgmt/ClassesView.vue'
import ClassView from '../views/class_mgmt/ClassView.vue'
import StrandView from '../views/class_mgmt/StrandView.vue'
import ModuleView from '../views/class_mgmt/ModuleView.vue'
import CreateClassesView from '../views/class_mgmt/CreateClassesView.vue'
import ClassRosterView from '@/views/class_mgmt/ClassRosterView.vue'

import RecordsView from '../views/staff_view/RecordsView.vue'
import PermissionsView from '../views/staff_view/PermissionsView.vue'
import AddStaffView from '../views/staff_view/AddStaffView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
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
      component: ClassesView,
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
            },
            {
              path: 'classRoster',
              name: 'Class Roster',
              component: ClassRosterView,
            }
          ]
        }
      ]
    },
    {
      path: '/classInformation',
      name: 'Class Information',
      component: ClassView,
    },
    {
      path: '/strandInformation',
      name: 'Strand Information',
      component: StrandView,
    },
    {
      path: '/createClasses',
      name: 'Create Classes',
      component: CreateClassesView
    },
    {
      path: '/classRoster',
      name: 'Class Roster',
      component: ClassRosterView,
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
