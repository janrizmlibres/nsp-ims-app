<script setup>
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import PanelMenu from 'primevue/panelmenu'

import { ref } from 'vue'

const items = ref([
  {
    label: 'Dashboard',
    icon: 'fa fa-chart-simple relative'
  },
  {
    label: 'Student Management',
    icon: 'fa fa-id-card',
    items: [
      {
        label: 'Student Records',
        icon: 'fa fa-address-book',
        route: ''
      },
      {
        label: 'Student Requirements',
        icon: 'fa fa-list-check',
        route: ''
      },
      {
        label: 'Admit Students',
        icon: 'fa fa-user-plus',
        route: ''
      }
    ]
  },
  {
    label: 'Enrollment Management',
    icon: 'fa fa-school',
    items: [
      {
        label: 'Active Academic Year',
        icon: 'fa fa-calendar-week',
        route: ''
      },
      {
        label: 'Enrollment History',
        icon: 'fa fa-scroll',
        route: ''
      },
      {
        label: 'Enroll Students',
        icon: 'fa fa-school-flag',
        route: ''
      }
    ]
  },
  {
    label: 'Volunteer Management',
    icon: 'fa fa-users',
    items: [
      {
        label: 'Volunteer Records',
        icon: 'fa fa-address-book',
        route: ''
      },
      {
        label: 'Admit Volunteers',
        icon: 'fa fa-user-plus',
        route: ''
      }
    ]
  },
  {
    label: 'Class Management',
    icon: 'fa fa-book-open',
    items: [
      {
        label: 'Active Classes',
        icon: 'fa fa-book-bookmark',
        route: ''
      },
      {
        label: 'Class History',
        icon: 'fa fa-scroll',
        route: ''
      },
      {
        label: 'Create Class',
        icon: 'fa fa-book-medical',
        route: ''
      }
    ]
  },
  {
    label: 'Term Management',
    icon: 'fa fa-calendar-days',
    route: ''
  },
  {
    label: 'Learning Strand Management',
    icon: 'fa fa-book',
    route: ''
  },
  {
    label: 'Student Requirement Management',
    icon: 'fa fa-list',
    route: ''
  },
  {
    label: 'Staff Management',
    icon: 'fa fa-user',
    items: [
      {
        label: 'Staff Records',
        icon: 'fa fa-address-book',
        route: ''
      },
      {
        label: 'Staff Permissions',
        icon: 'fa fa-shield-halved',
        route: ''
      }
    ]
  },
  {
    label: 'Utilities',
    icon: 'fa fa-gear',
    items: [
      {
        label: 'Generate Reports',
        icon: 'fa fa-note-sticky',
        route: ''
      },
      {
        label: 'Audit Trails',
        icon: 'fa fa-clock-rotate-left',
        route: ''
      }
    ]
  }
])
</script>

<template>
  <div class="z-auto fixed h-full w-80 pl-4 py-4">
    <div
      class="flex flex-col rounded-xl h-full min-w-[12rem] py-1 u-bg-pcolor dark:bg-surface-700 border border-surface-200 dark:border-surface-700 text-white"
    >
      <Card>
        <span class="inline-flex items-center gap-4 px-6 pt-4">
          <Button
            icon="fa fa-bars"
            class="w-8 h-8 u-bg-scolor"
            :pt="{
              root: ({ props }) => ({
                class: [
                  {
                    'text-white dark:text-surface-900':
                      !props.link &&
                      props.severity === null &&
                      !props.text &&
                      !props.outlined &&
                      !props.plain,
                    'u-bg-scolor dark:bg-primary-400':
                      !props.link &&
                      props.severity === null &&
                      !props.text &&
                      !props.outlined &&
                      !props.plain,
                    'border-none dark:border-primary-400':
                      !props.link &&
                      props.severity === null &&
                      !props.text &&
                      !props.outlined &&
                      !props.plain
                  },
                  {
                    'hover:u-bg-pcolor-darker dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300':
                      !props.link &&
                      props.severity === null &&
                      !props.text &&
                      !props.outlined &&
                      !props.plain
                  },
                  { 'focus:u-ring-scolor dark:focus:ring-primary-300/50': props.severity === null }
                ]
              })
            }"
            :pt-options="{ mergeProps: true }"
          >
          </Button>
          <span class="text-lg"> Menu </span>
        </span>
        <div class="px-4">
          <Divider />
        </div>
      </Card>
      <PanelMenu
        class="w-full h-full md:w-20rem overflow-y-auto mb-4"
        :model="items"
        :pt="{
          panel: {
            class: 'text-sm'
          },
          header: {
            class: [
              'rounded-md',
              'outline-none',
              'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50'
            ]
          },
          headercontent: ({ context, instance }) => {
            var _a, _b
            return {
              class: [
                // Color
                'border-none',
                'bg-transparent dark:bg-surface-800',
                'text-white dark:text-surface-0/80',
                { 'u-bg-pcolor-darker': context.active },
                // States
                {
                  'hover:u-bg-pcolor-darker text-white dark:hover:bg-surface-600/80':
                    !context.active,
                  'hover:u-bg-pcolor-2 dark:hover:bg-primary-300/30 dark:text-surface-0/80':
                    context.active
                },
                // Transition
                'transition duration-200 ease-in-out',
                'transition-shadow duration-200',
                'transition-shadow'
              ]
            }
          },
          headeraction: {
            class: [
              'relative',
              'flex',
              'items-center',
              'py-3',
              'px-5',
              'dark:text-white/80',
              'no-underline',
              'overflow-hidden',
              'cursor-pointer',
              'select-none'
            ]
          },
          headerlabel: {
            class: 'leading-none'
          },
          headerIcon: {
            class: 'mr-2'
          },
          submenuicon: {
            class: 'mr-2'
          },
          menucontent: {
            class: [
              'border-none',
              'rounded-t-none',
              'text-surface-700 dark:text-white/80',
              'u-bg-pcolor-2 dark:bg-surface-800',
              'border-surface-200 dark:border-surface-700'
            ]
          },
          menu: {
            class: ['outline-none', 'm-0 p-0 list-none']
          },
          content: {
            class: [
              'border-none rounded-none',
              'text-surface-700 dark:text-white/80',
              'transition-shadow duration-200'
            ]
          },
          action: ({ context }) => ({
            class: [
              'relative',
              // Font
              'leading-none',
              // Flex & Alignments
              'flex items-center',
              // Spacing
              'py-3 pl-10',
              // Color
              'text-white dark:text-white/80',
              // States
              'hover:bg-surface-0 dark:hover:bg-surface-700/80 hover:u-txt-active dark:hover:text-white/80',
              // Misc
              'cursor-pointer no-underline',
              'select-none overflow-hidden'
            ]
          }),
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
        }"
      >
        <template #item="{ item, props, hasSubmenu }">
          <a v-ripple class="flex items-center px-6 py-3" v-bind="props.action">
            <span class="flex justify-center items-center w-8 h-8 rounded-md u-bg-scolor shadow-md">
              <span :class="item.icon" class="fa-lg text-white" />
            </span>
            <span class="ml-4">{{ item.label }}</span>
            <span
              v-if="item.shortcut"
              class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
              >{{ item.shortcut }}</span
            >
            <i v-if="hasSubmenu" class="pi pi-angle-right ml-auto"></i>
          </a>
        </template>
      </PanelMenu>
      <Card>
        <div class="px-4">
          <Divider />
        </div>
        <div class="flex flex-row justify-between items-center px-6 pb-4">
          <div class="flex flex-col">
            <span class="inline-flex justify-between items-center gap-1">Account Name</span>
            <span class="inline-flex justify-between items-center gap-1 text-sm">Role</span>
          </div>
          <span>
            <Button
              icon="fa fa-right-from-bracket"
              class="w-8 h-8"
              :pt="{
                root: ({ props, context, parent }) => ({
                  class: [
                    {
                      'text-white dark:text-surface-900':
                        !props.link &&
                        props.severity === null &&
                        !props.text &&
                        !props.outlined &&
                        !props.plain,
                      'u-bg-scolor dark:bg-primary-400':
                        !props.link &&
                        props.severity === null &&
                        !props.text &&
                        !props.outlined &&
                        !props.plain,
                      'border-none dark:border-primary-400':
                        !props.link &&
                        props.severity === null &&
                        !props.text &&
                        !props.outlined &&
                        !props.plain
                    },
                    {
                      'hover:u-bg-red dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300':
                        !props.link &&
                        props.severity === null &&
                        !props.text &&
                        !props.outlined &&
                        !props.plain
                    },
                    {
                      'focus:u-ring-scolor dark:focus:ring-primary-300/50': props.severity === null
                    }
                  ]
                })
              }"
              :pt-options="{ mergeProps: true }"
            >
            </Button>
          </span>
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
