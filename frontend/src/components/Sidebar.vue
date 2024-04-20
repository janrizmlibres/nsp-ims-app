
<script setup>

import Button from 'primevue/button';
import Divider from 'primevue/divider';
import PanelMenu from 'primevue/panelmenu';

import { ref } from "vue";

const items = ref([
    {
        key: '1',
        label: 'Dashboard',
        icon: 'fa fa-home',
        route: '/'

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
                route: '/student-records'
            },
            {
                key: '2-2',
                label: 'Student Requirements',
                icon: 'fa fa-list-check',
                route: '/student-requirements'
            },
            {
                key: '2-3',
                label: 'Admit Students',
                icon: 'fa fa-user-plus',
                route: '/admit-students'
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
                route: '/active-academic-year'
            },
            {
                key: '3-2',
                label: 'Enrollment History',
                icon: 'fa fa-scroll',
                route: '/enrollment-history'
            },
            {
                key: '3-3',
                label: 'Enroll Students',
                icon: 'fa fa-school-flag',
                route: '/enroll-students'
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
                route: '/volunteer-records'
            },
            {
                key: '4-2',
                label: 'Admit Volunteers',
                icon: 'fa fa-user-plus',
                route: '/admit-volunteers'
            },
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
                route: '/active-classes'
            },
            {
                key: '5-2',
                label: 'Class History',
                icon: 'fa fa-scroll',
                route: '/class-history'
            },
            {
                key: '5-3',
                label: 'Create Classes',
                icon: 'fa fa-book-medical',
                route: '/create-classes'
            }
        ]
    },
    {
        key: '6',
        label: 'Term Management',
        icon: 'fa fa-calendar-days',
        route: '/term-management'
    },
    {
        key: '7',
        label: 'Learning Strand Management',
        icon: 'fa fa-book',
        route: '/learning-strand-management'
    },
    {
        key: '8',
        label: 'Student Requirements Management',
        icon: 'fa fa-list',
        route: '/student-requirements-management'
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
                route: '/staff-records'
            },
            {
                key: '9-2',
                label: 'Staff Permissions',
                icon: 'fa fa-shield-halved',
                route: '/staff-permissions'
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
                route: '/generate-reports'
            },
            {
                key: '10-2',
                label: 'Audit Trails',
                icon: 'fa fa-clock-rotate-left',
                route: '/audit-trails'
            }
        ]
    },
]);

const expandedKeys = ref({});
const collapseAll = () => {
    expandedKeys.value = {};
};

const isExpanded = ref(true)
const ToggleMenu = () => {
    isExpanded.value = !isExpanded.value
}
</script>

<template>
    <div class="left-0 shadow-xl fixed inset-y-0 w-full !u-sidebar-max-w z-50 transition-all duration-100 ease-in-out rounded-xl u-bg-pcolor ml-4 my-4 border-none" :class="`${ isExpanded ? 'u-sidebar-expanded' : 'u-sidebar-collapsed'}`">
        <div class="flex flex-col h-full text-surface-100 u-sidebar-pl">
            <div class="px-6 py-6 block text-white whitespace-nowrap" :class="`${isExpanded ? 'flex justify-between' : ''}`">
                <span class="text-3xl">{{ isExpanded ? 'Menu' : ''}}</span>
                <Button type="button" icon="fa fa-bars" class="w-8 h-8" @click="ToggleMenu"
                :pt="{
                    root: ({ props }) => ({
                        class: [
                            // Colors
                            {
                                'text-surface-100': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
                                'u-bg-scolor': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
                                'border-none': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
                            },
                            // States
                            { 'hover:u-bg-pcolor-darker dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain },
                            { 'focus:u-ring-scolor dark:focus:ring-primary-300/50': props.severity === null },
                        ]
                    })
                }"
                :pt-options="{mergeProps:true, mergeSections:true}">
                </Button>
            </div>
            <div class="border-b mx-6 mr-8"></div>
            <PanelMenu class="h-full overflow-y-auto mb-4"
            v-model:expandedKeys="expandedKeys"
            :model="items"
            :pt="{
                root: {
                    class: 'my-4'
                },
                panel: {
                    class: 'text-sm'
                },
                headercontent: ({ context, item }) => {
                    return {
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
                    };
                },
                headeraction: {
                    class: ['relative', 'leading-none', 'flex items-center', 'p-5', 'select-none cursor-pointer no-underline']
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
                action: ({ context }) => ({
                    class: [
                    'relative',
                    // Font
                    'leading-none',
                    // Flex & Alignments
                    'flex items-center',
                    // Spacing
                    isExpanded ? 'pl-10' : '',
                    // Color
                    'text-surface-100',
                    // States
                    'hover:bg-surface-100 hover:u-txt-active',
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
                    enterActiveClass: 'overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]',
                    enterToClass: 'max-h-[1000px]',
                    leaveFromClass: 'max-h-[1000px]',
                    leaveActiveClass: 'overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]',
                    leaveToClass: 'max-h-0',
                    
                }
            }">
                <template #item="{ item, props, hasSubmenu, active }">
                    <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                        <a v-ripple v-bind="props.action" :href="href" @click="navigate">
                            <div class="px-6 py-3" @click="collapseAll" :class="`${isExpanded ? 'flex items-center' : ''}`">
                                <span class="flex justify-center items-center w-8 h-8 rounded-md u-bg-scolor shadow-md">
                                    <span :class="item.icon" class="fa-lg text-surface-100" />
                                </span>
                                <span :class="`${ isExpanded ? 'ml-4' : ''}`">{{ isExpanded ? item.label : '' }}</span>
                            </div>
                        </a>
                    </router-link> 
                    <a v-else v-ripple class="flex items-center px-6 py-3" v-bind="props.action" :href="item.url" :target="item.target">
                        <span class="flex justify-center items-center w-8 h-8 rounded-md u-bg-scolor shadow-md">
                            <span :class="item.icon" class="fa-lg text-surface-100" />
                        </span>
                        <span :class="`${ isExpanded ? 'ml-4' : ''}`">{{ isExpanded ? item.label : '' }}</span>
                        <i v-if="hasSubmenu && !active" :class="`${ isExpanded ? 'pi pi-angle-right ml-auto' : ''}`"></i>
                        <i v-else :class="`${ isExpanded ? 'pi pi-angle-down ml-auto' : ''}`"></i>
                    </a>   
                </template>
            </PanelMenu>
            <div class="border-t mx-6 mr-8"></div>
            <div class="px-6 pr-8 py-6 items-center text-surface-100 whitespace-nowrap" :class="`${isExpanded ? 'flex justify-between' : ''}`">
                <div class="flex flex-col">
                    <span>{{ isExpanded ? 'Account Name' : ''}}</span>
                    <span class="text-sm">{{ isExpanded ? 'Role' : ''}}</span>
                </div>
                <Button type="button" icon="fa fa-right-from-bracket" :loading="loading" class="w-8 h-8"
                :pt="{
                    root: ({ props, context, parent }) => ({
                        class: [
                            {
                                'text-white dark:text-surface-900': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
                                'u-bg-scolor dark:bg-primary-400': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
                                'border-none dark:border-primary-400': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
                            },
                            { 'hover:u-bg-red dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain },
                            { 'focus:u-ring-scolor dark:focus:ring-primary-300/50': props.severity === null },
                        ]
                    })
                }"
                :pt-options="{mergeProps:true}">
                </Button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
