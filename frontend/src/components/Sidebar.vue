
<script setup>

import Button from 'primevue/button';
import TieredMenu from 'primevue/tieredmenu';
import Divider from 'primevue/divider';

import { ref } from "vue";

const items = ref([
    {
        label: 'Dashboard',
        icon: 'fa fa-chart-simple'
    },
    {
        label: 'Student Management',
        icon: 'fa fa-id-card',
        items: [
            {
                label: 'Student Records',
                icon: 'fa fa-address-book'
            },
            {
                label: 'Student Requirements',
                icon: 'fa fa-list-check'
            },
            {
                label: 'Admit Students',
                icon: 'fa fa-user-plus'
            }
        ]
    },
    {
        label: 'Enrollment Management',
        icon: 'fa fa-school',
        items: [
            {
                label: 'Active Academic Year',
                icon: 'fa fa-calendar-week'
            },
            {
                label: 'Enrollment History',
                icon: 'fa fa-scroll'
            },
            {
                label: 'Enroll Students',
                icon: 'fa fa-school-flag'
            }
        ]
    },
    {
        label: 'Volunteer Management',
        icon: 'fa fa-users',
        items: [
            {
                label: 'Volunteer Records',
                icon: 'fa fa-address-book'
            },
            {
                label: 'Admit Volunteers',
                icon: 'fa fa-user-plus'
            },
        ]
    },
    {
        label: 'Class Management',
        icon: 'fa fa-book-open',
        items: [
            {
                label: 'Active Classes',
                icon: 'fa fa-book-bookmark'
            },
            {
                label: 'Class History',
                icon: 'fa fa-scroll'
            },
            {
                label: 'Create Class',
                icon: 'fa fa-book-medical'
            }
        ]
    },
    {
        label: 'Term Management',
        icon: 'fa fa-calendar-days'
    },
    {
        label: 'Learning Strand Management',
        icon: 'fa fa-book'
    },
    {
        label: 'Student Requirement Management',
        icon: 'fa fa-list'
    },
    {
        label: 'Staff Management',
        icon: 'fa fa-user',
        items: [
            {
                label: 'Staff Records',
                icon: 'fa fa-address-book'
            },
            {
                label: 'Staff Permissions',
                icon: 'fa fa-shield-halved'
            }
        ]
    },
    {
        label: 'Utilities',
        icon: 'fa fa-gear',
        items: [
            {
                label: 'Generate Reports',
                icon: 'fa fa-note-sticky'
            },
            {
                label: 'Audit Trails',
                icon: 'fa fa-clock-rotate-left'
            }
        ]
    },
]);
</script>

<template>
    <div class="fixed w-72 pl-4 py-4">
        <TieredMenu 
        :model="items"
        :pt="{ 
            root: {
                class: ['rounded-xl', 'min-w-[12rem]', 'py-1', 'u-bg-pcolor dark:bg-surface-700', 'border border-surface-200 dark:border-surface-700', 'text-white']
            },
            menu: {
                class: ['list-none', 'm-0', 'p-0', 'outline-none']
            },
            menuitem: {
                class: ['relative']
            },
            content: ({ context }) => ({
                class: [
                //Shape
                'rounded-none',
                //  Colors
                {
                    'text-surface-500 dark:text-white/70': !context.focused && !context.active,
                    'u-bg-pcolor-darker dark:text-white/70 bg-surface-200 dark:bg-surface-600/90': context.focused && !context.active,
                    'u-bg-pcolor-darker dark:text-surface-0/80 bg-primary-50 dark:bg-primary-400/30': context.focused && context.active,
                    'u-bg-pcolor-darker dark:text-surface-0/80 bg-primary-50 dark:bg-primary-400/30': !context.focused && context.active
                },
                // Hover States
                {
                    'hover:u-bg-pcolor-darker dark:hover:bg-surface-600/80': !context.active,
                    'hover:u-bg-pcolor-darker dark:hover:bg-primary-300/30 text-primary-700 dark:text-surface-0/80': context.active
                },
                // Transitions
                'transition-shadow',
                'duration-200'
                ]
            }),
            action: {
                class: ['relative', 'flex', 'items-center', 'py-3', 'px-5', 'text-sm text-white dark:text-white/80', 'no-underline', 'overflow-hidden', 'cursor-pointer', 'select-none']
            },
            icon: {
                class: ['mr-2', 'text-surface-600 dark:text-white/70']
            },
            label: {
                class: ['leading-none']
            },
            submenuicon: {
                class: ['ml-auto']
            },
            submenu: {
                class: ['w-full sm:w-48', 'py-1', 'm-0', 'list-none', 'shadow-none sm:shadow-md', 'border-0', 'static sm:absolute', 'z-10', 'u-bg-pcolor dark:bg-surface-700']
            },
            separator: {
                class: 'border-t border-surface-200 dark:border-surface-600 my-1'
            }
            }">
            <template #start>
                <span class="inline-flex items-center gap-4 px-6 pt-4">
                    <Button class="w-10 h-10 u-secondary-bg">

                    </Button>
                    <span class="text-lg">
                        Menu
                    </span>
                </span>
                <Divider />
            </template>
            <template #item="{ item, props, hasSubmenu }">
                <a v-ripple class="flex align-items-center" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                    <span v-if="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
                    <i v-if="hasSubmenu" class="pi pi-angle-right ml-auto"></i>
                </a>
            </template>
            <template #end>
                <Divider />
                <span class="inline-flex justify-between items-center gap-1 px-6 pb-4">Account</span>
            </template>
        </TieredMenu>
    </div>
</template>

<style scoped>

</style>
