<script setup>
// Presets
import PanelMenu from 'primevue/panelmenu'

// Utils
import { computed, ref } from 'vue'

// Stores
import { useSidebarStore } from '@/stores/sidebar'
import { useAuthStore } from '@/stores/auth'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()

const items = computed(() => [
  {
    key: '1',
    label: 'Dashboard',
    icon: 'fa fa-home',
    route: { name: 'dashboard' }
  },
  {
    key: '2',
    label: 'Student Management',
    icon: 'fa fa-id-card',
    items: [
      {
        key: '2-1',
        label: 'Student Records',
        icon: 'fa fa-address-book',
        route: { name: 'student-records' }
      },
      {
        key: '2-2',
        label: 'Student Requirements',
        icon: 'fa fa-list-check',
        route: { name: 'dashboard' }
      }
    ]
  },
  {
    key: '3',
    label: 'Enrollment Management',
    icon: 'fa fa-school',
    items: [
      {
        key: '3-1',
        label: 'Enrollment Records',
        icon: 'fa fa-scroll',
        route: { name: 'enrollment-history' }
      },
      {
        key: '3-2',
        label: 'Enroll Students',
        icon: 'fa fa-school-flag',
        route: { name: 'enroll-learners' }
      }
    ]
  },
  {
    key: '4',
    label: 'Volunteer Management',
    icon: 'fa fa-users',
    items: [
      {
        key: '4-1',
        label: 'Volunteer Records',
        icon: 'fa fa-address-book',
        route: { name: 'volunteer-records' }
      },
      {
        key: '4-2',
        label: 'Admit Volunteers',
        icon: 'fa fa-user-plus',
        route: { name: 'admit-volunteers' } // Update this line
      }
    ]
  },
  {
    key: '5',
    label: 'Class Management',
    icon: 'fa fa-book-open',
    route: { name: 'class-management' }
  },
  {
    key: '6',
    label: 'User Management',
    icon: 'fa fa-user',
    items: [
      {
        key: '6-1',
        label: 'User Records',
        icon: 'fa fa-address-book',
        route: { name: 'user-records' }
      },
      {
        key: '6-2',
        label: 'Staff Permissions',
        icon: 'fa fa-shield-halved',
        route: { name: 'user-permissions' }
      }
    ]
  },
  {
    key: '7',
    label: 'Configurations',
    icon: 'fa fa-gear',
    items: [
      {
        key: '7-1',
        label: 'Academic Term Configuration',
        icon: 'fa fa-calendar-days',
        route: { name: 'academic-term-configuration' }
      },
      {
        key: '7-2',
        label: 'Learning Strand Configuration',
        icon: 'fa fa-book',
        route: { name: 'learning-strand-configuration' }
      },
      {
        key: '7-3',
        label: 'Student Requirement Configuration',
        icon: 'fa fa-list',
        route: { name: 'student-requirement-configuration' }
      },
      {
        key: '7-4',
        label: 'Student Category Configuration',
        icon: 'fa fa-layer-group',
        route: { name: 'student-category-configuration' }
      }
    ]
  },
  {
    key: '8',
    label: 'Audit Trails',
    icon: 'fa fa-clock-rotate-left',
    route: { name: 'audit-trails' }
  }
])

const role = computed(() => {
  if (authStore.user.accessLevel === 1) {
    return 'Admin'
  } else if (authStore.user.accessLevel === 2) {
    return 'Sub-Admin'
  } else {
    return 'User'
  }
})

const panelMenuPt = {
  root: {
    class: 'my-4'
  },
  panel: {
    class: 'text-sm'
  },
  headercontent: {
    class: [
      // Color
      'border-none',
      'bg-none',
      'text-surface-100',
      // States
      'hover:bg-surface-100',
      'hover:u-txt-active',
      // Transition
      'transition duration-200 ease-in-out',
      'transition-shadow duration-200'
    ]
  },
  headeraction: {
    class: [
      'relative',
      'leading-none',
      'flex items-center',
      'p-5',
      'select-none cursor-pointer no-underline'
    ]
  },
  menucontent: {
    class: ['border-none', 'rounded-t-none', 'u-bg-pcolor-2']
  },
  menu: {
    class: ['outline-none', 'm-0 p-0 list-none']
  },
  content: {
    class: ['border-none rounded-none', 'transition-shadow duration-200']
  },
  action: {
    class: [
      'relative',
      // Font
      'leading-none',
      // Flex & Alignments
      'flex items-center',
      // Spacing
      'u-sidebar-submenuitem-pl',
      // Color
      'text-surface-100',
      // States
      'hover:bg-surface-100 hover:u-txt-active',
      // Misc
      'cursor-pointer no-underline',
      'select-none overflow-hidden'
    ]
  },
  icon: {
    class: ['mr-2']
  },
  submenu: {
    class: 'p-0 pl-4 m-0 list-none'
  },
  transition: {
    enterFromClass: 'max-h-0',
    enterActiveClass:
      'overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]',
    enterToClass: 'max-h-[1000px]',
    leaveFromClass: 'max-h-[1000px]',
    leaveActiveClass:
      'overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]',
    leaveToClass: 'max-h-0'
  }
}

const expandedKeys = ref({})

function collapseAll() {
  expandedKeys.value = {}
}

function setVisibility(keyValue) {
  if ([1, 2].includes(authStore.user.accessLevel)) return true
  else if (keyValue === '7') return false

  const permissions = authStore.user.permissions

  const permissionMap = {
    2: 'canMgStuds',
    3: 'canMgEnrollment',
    4: 'canMgVolunteer',
    5: 'canMgClass',
    6: 'canMgUser'
  }

  const hasNoPermission = (keyValue) => {
    return keyValue in permissionMap && !permissions[permissionMap[keyValue]]
  }

  return hasNoPermission(keyValue) ? false : true
}

const handleMouseOver = () => {
  sidebarStore.handleMouseOver()
}

const handleMouseLeave = () => {
  sidebarStore.handleMouseLeave()
}
</script>

<template>
  <aside
    class="
      flex flex-col z-50 view-max-height
      bg-transparent text-surface-100 my-2
      transition-all duration-500 ease-in-out"
    :class="sidebarStore.isPinned ? 'u-sidebar-expanded' : 'u-sidebar-collapsed'"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <div class="flex flex-row items-center gap-2 text-surface-100 p-5 overflow-hidden">
      <img src="@/assets/logo.png" class="max-w-10 h-10 bg-white shadow-xl rounded-full" />
      <span class="u-sidebar-header-text text-3xl">Menu</span>
    </div>
    <div class="border-t mx-6"></div>

    <PanelMenu
      class="h-full overflow-y-auto overflow-x-hidden mb-4"
      v-model:expandedKeys="expandedKeys"
      :model="items"
      :pt="panelMenuPt"
    >
      <template #item="{ item, props, hasSubmenu, active }">
        <div v-show="setVisibility(item.key)">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple v-bind="props.action" :href="href" @click="navigate">
              <div class="flex items-center px-6 py-3" @click="collapseAll">
                <span class="flex justify-center items-center min-w-8 h-8 rounded-md u-bg-scolor shadow-md">
                  <span :class="item.icon" class="fa-lg text-surface-100"/></span>
                <span class="u-sidebar-menuitem-text">{{ item.label }}</span>
              </div>
            </a>
          </router-link>
          <a
            v-else
            v-ripple
            class="flex items-center px-6 py-3"
            v-bind="props.action"
            :href="item.url"
            :target="item.target"
          >
            <span
              class="flex justify-center items-center min-w-8 h-8 rounded-md u-bg-scolor shadow-md"
            >
              <span :class="item.icon" class="fa-lg text-surface-100" />
            </span>
            <span class="u-sidebar-menuitem-text">{{ item.label }}</span>
            <i
              v-if="hasSubmenu && !active"
              class="pi pi-angle-right ml-auto u-sidebar-menuitem-dropdown"
            ></i>
            <i v-else class="pi pi-angle-down ml-auto u-sidebar-menuitem-dropdown"></i>
          </a>
        </div>
      </template>
    </PanelMenu>

    <div class="border-t mx-6"></div>
    <div class="px-6 py-4 text-surface-100 whitespace-nowrap u-sidebar-footer overflow-hidden">
      <span class="flex justify-center items-center min-w-8 h-8 rounded-md u-bg-scolor shadow-md my-2">
        <span class="fa fa-circle-user text-surface-100" />
      </span>
      <div class="flex flex-col u-sidebar-footer-text">
        <span>{{ authStore.user.userName }}</span>
        <span class="text-sm"> {{ role }}</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* sidebar expanded */
.u-sidebar-expanded {
  width: 15rem;
}

.u-sidebar-expanded .u-sidebar-header {
  display: flex;
  align-items: center;
}

.u-sidebar-expanded .u-sidebar-header-text {
  width: 100%;
}

.u-sidebar-expanded .u-sidebar-menuitem-text {
  margin-left: 1rem;
}

.u-sidebar-expanded .u-sidebar-submenuitem-pl {
  padding-left: 2.5rem;
}

.u-sidebar-expanded .u-sidebar-footer {
  display: flex;
  align-items: center;
}

.u-sidebar-expanded .u-sidebar-footer-text {
  margin-left: 1rem;
}

/* sidebar collapsed */
.u-sidebar-collapsed {
  width: 5rem;
}

.u-sidebar-collapsed:hover {
  width: 15rem;
}

.u-sidebar-collapsed .u-sidebar-header {
  display: flex;
  align-items: center;
}

.u-sidebar-collapsed .u-sidebar-header-text {
  opacity: 0%;
  width: 0%;

  transition: 0.5s ease-in-out;
}

.u-sidebar-collapsed:hover .u-sidebar-header-text {
  opacity: 100%;
  width: 100%;

  transition: 0.3s ease-in-out;
}

.u-sidebar-collapsed .u-sidebar-menuitem-text {
  margin-left: 0;
  opacity: 0%;
  width: 0;
  height: 0;

  transition: 0.1s ease-in-out;
}

.u-sidebar-collapsed:hover .u-sidebar-menuitem-text {
  margin-left: 1rem;
  opacity: 100%;
  width: auto;
  height: 100%;
}

.u-sidebar-collapsed .u-sidebar-menuitem-dropdown {
  opacity: 0%;
  width: 0;
}

.u-sidebar-collapsed:hover .u-sidebar-menuitem-dropdown {
  margin-left: auto;
  width: auto;
  opacity: 100%;
}

.u-sidebar-collapsed .u-sidebar-submenuitem-pl {
  padding-left: 0;

  transition: 0.5s ease-in-out;
}

.u-sidebar-collapsed:hover .u-sidebar-submenuitem-pl {
  padding-left: 2.5rem;

  transition: 0.3s ease-in-out;
}

.u-sidebar-collapsed .u-sidebar-footer {
  display: flex;
  align-items: center;
}

.u-sidebar-collapsed .u-sidebar-footer-text {
  margin-left: 0;
  opacity: 0%;
  width: 0;
  height: 0;
  white-space: nowrap;

  transition: 0.1s ease-in-out;
}

.u-sidebar-collapsed:hover .u-sidebar-footer-text {
  margin-left: 1rem;
  opacity: 100%;
  width: max-content;
  height: 100%;
  white-space: nowrap;
}
</style>
