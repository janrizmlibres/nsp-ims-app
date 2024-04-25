<script setup>
import Button from 'primevue/button'
import PanelMenu from 'primevue/panelmenu'

import { useSideBarStore } from '@/stores/sidebar_state';
const sideBarStore = useSideBarStore()
</script>

<template>
  <div
    class="left-0 u-sidemain-max-height h-screen shadow-xl inset-y-0 z-50 transition-all duration-500 ease-in-out rounded-md u-bg-pcolor ml-4 my-4 border-none"
    :class="sideBarStore.isExpanded ? 'u-sidebar-expanded' : 'u-sidebar-collapsed'"
  >
    <div class="flex flex-col h-full text-surface-100">
      <div class="p-5 text-surface-100 whitespace-nowrap u-sidebar-header">
        <span class="text-3xl u-sidebar-header-text">Menu</span>
        <Button
          v-if="sideBarStore.isPinned"
          icon="fa fa-chevron-left"
          type="button"
          class="min-w-8 h-8"
          @click="sideBarStore.changeState"
          :pt="{
            root: ({ props }) => ({
              class: [
                // Colors
                {
                  'text-surface-100':
                    !props.link &&
                    props.severity === null &&
                    !props.text &&
                    !props.outlined &&
                    !props.plain,
                  'bg-transparent':
                    !props.link &&
                    props.severity === null &&
                    !props.text &&
                    !props.outlined &&
                    !props.plain,
                  'border-none':
                    !props.link &&
                    props.severity === null &&
                    !props.text &&
                    !props.outlined &&
                    !props.plain
                },
                // States
                {
                  'hover:u-bg-pcolor-darker':
                    !props.link &&
                    props.severity === null &&
                    !props.text &&
                    !props.outlined &&
                    !props.plain
                },
                { 'focus:u-ring-scolor': props.severity === null }
              ]
            })
          }"
          :pt-options="{ mergeProps: true, mergeSections: true }"
        >
        </Button>
        <Button
          v-else
          icon="fa fa-bars"
          type="button"
          class="min-w-8 h-8"
          @click="sideBarStore.changeState"
          :pt="{
            root: ({ props }) => ({
              class: [
                // Colors
                {
                  'text-surface-100':
                    !props.link &&
                    props.severity === null &&
                    !props.text &&
                    !props.outlined &&
                    !props.plain,
                  'bg-transparent':
                    !props.link &&
                    props.severity === null &&
                    !props.text &&
                    !props.outlined &&
                    !props.plain,
                  'border-none':
                    !props.link &&
                    props.severity === null &&
                    !props.text &&
                    !props.outlined &&
                    !props.plain
                },
                // States
                {
                  'hover:u-bg-pcolor-darker':
                    !props.link &&
                    props.severity === null &&
                    !props.text &&
                    !props.outlined &&
                    !props.plain
                },
                { 'focus:u-ring-scolor': props.severity === null }
              ]
            })
          }"
          :pt-options="{ mergeProps: true, mergeSections: true }"
        >
        </Button>
      </div>
      <div class="border-b mx-6"></div>
      <PanelMenu
        class="h-full overflow-y-auto overflow-x-hidden mb-4"
        v-model:expandedKeys="sideBarStore.expandedKeys"
        :model="sideBarStore.items"
        :pt="{
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
        }"
      >
        <template #item="{ item, props, hasSubmenu, active }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple v-bind="props.action" :href="href" @click="navigate">
              <div class="flex items-center px-5 py-3" @click="sideBarStore.collapseAll">
                <span
                  class="flex justify-center items-center min-w-8 h-8 rounded-md u-bg-scolor shadow-md"
                >
                  <span :class="item.icon" class="fa-lg text-surface-100" />
                </span>
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
        </template>
      </PanelMenu>
      <div class="border-t mx-6"></div>
      <div class="px-5 py-4 text-surface-100 whitespace-nowrap u-sidebar-footer">
        <span class="flex justify-center items-center min-w-8 h-8 rounded-md u-bg-scolor shadow-md">
          <span class="fa fa-circle-user text-surface-100" />
        </span>
        <div class="flex flex-col u-sidebar-footer-text">
          <span>{{ sideBarStore.name }}</span>
          <span class="text-sm">{{ sideBarStore.role }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* sidebar expanded */
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
