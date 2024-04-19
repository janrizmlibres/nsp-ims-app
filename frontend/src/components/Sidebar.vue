
<script setup>

import Button from 'primevue/button';
import TieredMenu from 'primevue/tieredmenu';
import Divider from 'primevue/divider';

import { ref } from "vue";

const items = ref([
    {
        label: 'Dashboard'
    },
    {
        label: 'Student Management',
        items: [
            {
                label: 'Student Records'
            },
            {
                label: 'Student Requirements'
            },
            {
                label: 'Admit Students'
            }
        ]
    },
    {
        label: 'Enrollment Management',
        items: [
            {
                label: 'Active Academic Year'
            },
            {
                label: 'Enrollment History'
            },
            {
                label: 'Enroll Students'
            }
        ]
    },
    {
        label: 'Volunteer Management',
        items: [
            {
                label: 'Volunteer Records'
            },
            {
                label: 'Admit Volunteers'
            },
        ]
    },
    {
        label: 'Class Management',
        items: [
            {
                label: 'Active Classes'
            },
            {
                label: 'Class History'
            },
            {
                label: 'Create Class'
            }
        ]
    },
    {
        label: 'Term Management'
    },
    {
        label: 'Learning Strand Management'
    },
    {
        label: 'Student Requirement Management'
    },
    {
        label: 'Staff Management',
        items: [
            {
                label: 'Staff Records'
            },
            {
                label: 'Staff Permissions'
            }
        ]
    },
    {
        label: 'Utilities',
        items: [
            {
                label: 'Generate Reports'
            },
            {
                label: 'Audit Trails'
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
