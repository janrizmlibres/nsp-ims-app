<script setup>
// Presets
import Button from 'primevue/button'
import PanelMenu from 'primevue/panelmenu'
import Skeleton from 'primevue/skeleton'

// Utils
import { onMounted, ref } from 'vue'

// Stores
import { useSidebarStore } from '@/stores/sidebar'
import { useTermStore } from '@/stores/term'
import { useAuthStore } from '@/stores/auth'

const sidebarStore = useSidebarStore()
const termStore = useTermStore()
const authStore = useAuthStore()

const items = ref([])
const isFetching = ref(true)
onMounted(async () => {
  const activeTerm = await termStore.getActiveTerm()

  const gradeSchool = activeTerm.class_levels.find((obj) => {
    return obj.school_level === 'Grade School'
  })

  const juniorHighSchool = activeTerm.class_levels.find((obj) => {
    return obj.school_level === 'Junior High School'
  })

  items.value = [
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
          route: { name: 'dashboard' }
        },
        {
          key: '2-2',
          label: 'Student Requirements',
          icon: 'fa fa-list-check',
          route: { name: 'dashboard' }
        },
        {
          key: '2-3',
          label: 'Admit Students',
          icon: 'fa fa-user-plus',
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
          label: 'Active Academic Year',
          icon: 'fa fa-calendar-week',
          route: { name: 'dashboard' }
        },
        {
          key: '3-2',
          label: 'Enrollment Records',
          icon: 'fa fa-scroll',
          route: { name: 'dashboard' }
        },
        {
          key: '3-3',
          label: 'Enroll Students',
          icon: 'fa fa-school-flag',
          route: { name: 'dashboard' }
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
          route: { name: 'dashboard' }
        },
        {
          key: '4-2',
          label: 'Admit Volunteers',
          icon: 'fa fa-user-plus',
          route: { name: 'dashboard' }
        }
      ]
    },
    {
      key: '5',
      label: 'Class Management',
      icon: 'fa fa-book-open',
      items: [
        {
          key: '5-1',
          label: 'Active Classes',
          icon: 'fa fa-book-bookmark',
          items: [
            {
              key: '5-1-1',
              label: 'Grade School',
              icon: 'fa fa-user-plus',
              route: {
                name: 'class-info',
                params: { term: activeTerm.academic_year },
                query: { id: gradeSchool.id }
              }
            },
            {
              key: '5-1-2',
              label: 'Junior High School',
              icon: 'fa fa-user-plus',
              route: {
                name: 'class-info',
                params: { term: activeTerm.academic_year },
                query: { id: juniorHighSchool.id }
              }
            }
          ]
        },
        {
          key: '5-2',
          label: 'Class Records',
          icon: 'fa fa-scroll',
          route: { name: 'class-records' }
        }
      ]
    },
    {
      key: '6',
      label: 'Term Management',
      icon: 'fa fa-calendar-days',
      route: { name: 'term-management' }
    },
    {
      key: '7',
      label: 'Learning Strand Management',
      icon: 'fa fa-book',
      route: { name: 'learning-strand-management' }
    },
    {
      key: '8',
      label: 'Student Requirements Management',
      icon: 'fa fa-list',
      route: { name: 'student-requirements-management' }
    },
    {
      key: '9',
      label: 'Staff Management',
      icon: 'fa fa-user',
      items: [
        {
          key: '9-1',
          label: 'Staff Records',
          icon: 'fa fa-address-book',
          route: { name: 'staff-records' }
        },
        {
          key: '9-2',
          label: 'Staff Permissions',
          icon: 'fa fa-shield-halved',
          route: { name: 'staff-permissions' }
        },
        {
          key: '9-3',
          label: 'Add Staff',
          icon: 'fa fa-user-plus',
          route: { name: 'add-staff' }
        }
      ]
    },
    {
      key: '10',
      label: 'Utilities',
      icon: 'fa fa-gear',
      items: [
        {
          key: '10-1',
          label: 'Generate Reports',
          icon: 'fa fa-note-sticky',
          route: { name: 'dashboard' }
        },
        {
          key: '10-2',
          label: 'Audit Trails',
          icon: 'fa fa-clock-rotate-left',
          route: { name: 'audit-trails' }
        }
      ]
    }
  ]

  isFetching.value = false
})

const buttonPt = {
  root: ({ props }) => ({
    class: [
      // Colors
      {
        'text-surface-100':
          !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
        'bg-transparent':
          !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
        'border-none':
          !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
      },
      // States
      {
        'hover:u-bg-pcolor-darker':
          !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
      },
      { 'focus:u-ring-scolor': props.severity === null }
    ]
  })
}
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
      'u-bg-pcolor',
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

// functions
function collapseAll() {
  expandedKeys.value = {}
}

function changeState() {
  collapseAll()
  sidebarStore.changePinnedState()
}

function setVisibility(keyValue) {
  const permissions = authStore.staff.permissions

  const permissionMap = {
    2: 'canMgStuds',
    3: 'canMgEnrollment',
    4: 'canMgVolunteer',
    5: 'canMgClass',
    6: 'canMgTerm',
    7: 'canMgLs',
    8: 'canMgStudReq',
    9: 'canMgStaff'
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
  <div
    class="flex flex-col z-50 u-sidemain-max-height h-screen u-bg-pcolor text-surface-100 rounded-md border-none shadow-xltransition-all duration-500 ease-in-out ml-4 my-4"
    :class="sidebarStore.isPinned ? 'u-sidebar-expanded' : 'u-sidebar-collapsed'"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <div class="u-sidebar-header text-surface-100 whitespace-nowrap p-5">
      <span class="u-sidebar-header-text text-3xl">Menu</span>
      <Button
        v-if="sidebarStore.isPinned"
        icon="fa fa-chevron-left"
        type="button"
        class="min-w-8 h-8"
        @click="changeState"
        :pt="buttonPt"
        :pt-options="{ mergeProps: true, mergeSections: true }"
      >
      </Button>
      <Button
        v-else
        icon="fa fa-bars"
        type="button"
        class="min-w-8 h-8"
        @click="changeState"
        :pt="buttonPt"
        :pt-options="{ mergeProps: true, mergeSections: true }"
      >
      </Button>
    </div>
    <div class="border-t mx-6"></div>

    <div v-if="isFetching" class="h-full p-4">
      <Skeleton class="h-full" />
    </div>
    <PanelMenu
      v-else
      class="h-full overflow-y-auto overflow-x-hidden mb-4"
      v-model:expandedKeys="expandedKeys"
      :model="items"
      :pt="panelMenuPt"
    >
      <template #item="{ item, props, hasSubmenu, active }">
        <div v-show="setVisibility(item.key)">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple v-bind="props.action" :href="href" @click="navigate">
              <div class="flex items-center px-5 py-3" @click="collapseAll">
                <span
                  class="flex justify-center items-center min-w-8 h-8 rounded-md u-bg-scolor shadow-md"
                >
                  <span :class="item.icon" class="fa-lg text-surface-100"
                /></span>
                <span class="u-sidebar-menuitem-text">{{ item.label }}</span>
              </div>
            </a>
          </router-link>
          <a
            v-else
            v-ripple
            class="flex items-center px-5 py-3"
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
    <div class="px-5 py-4 text-surface-100 whitespace-nowrap u-sidebar-footer">
      <span class="flex justify-center items-center min-w-8 h-8 rounded-md u-bg-scolor shadow-md">
        <span class="fa fa-circle-user text-surface-100" />
      </span>
      <div class="flex flex-col u-sidebar-footer-text">
        <span>{{ authStore.userName }}</span>
        <span class="text-sm">Role</span>
      </div>
    </div>
  </div>
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
  width: 4.5rem;
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
