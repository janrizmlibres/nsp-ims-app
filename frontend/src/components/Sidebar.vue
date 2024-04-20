
<script setup>

import Button from 'primevue/button';
import Divider from 'primevue/divider';
import PanelMenu from 'primevue/panelmenu';

import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const items = ref([
    {
        label: 'Dashboard',
        icon: 'fa fa-home',
        route: '/'

    },
    {
        label: 'Student Management',
        icon: 'fa fa-id-card',
        items: [
            {
                label: 'Student Records',
                icon: 'fa fa-address-book',
                route: '/student-records'
            },
            {
                label: 'Student Requirements',
                icon: 'fa fa-list-check',
                route: '/student-requirements'
            },
            {
                label: 'Admit Students',
                icon: 'fa fa-user-plus',
                route: '/admit-students'
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
                route: '/active-academic-year'
            },
            {
                label: 'Enrollment History',
                icon: 'fa fa-scroll',
                route: '/enrollment-history'
            },
            {
                label: 'Enroll Students',
                icon: 'fa fa-school-flag',
                route: '/enroll-students'
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
                route: '/volunteer-records'
            },
            {
                label: 'Admit Volunteers',
                icon: 'fa fa-user-plus',
                route: '/admit-volunteers'
            },
        ]
    },
    {
        label: 'Class Management',
        icon: 'fa fa-book-open',
        items: [
            {
                label: 'Active Classes',
                icon: 'fa fa-book-bookmark',
                route: '/active-classes'
            },
            {
                label: 'Class History',
                icon: 'fa fa-scroll',
                route: '/class-history'
            },
            {
                label: 'Create Classes',
                icon: 'fa fa-book-medical',
                route: '/create-classes'
            }
        ]
    },
    {
        label: 'Term Management',
        icon: 'fa fa-calendar-days',
        route: '/term-management'
    },
    {
        label: 'Learning Strand Management',
        icon: 'fa fa-book',
        route: '/learning-strand-management'
    },
    {
        label: 'Student Requirements Management',
        icon: 'fa fa-list',
        route: '/student-requirements-management'
    },
    {
        label: 'Staff Management',
        icon: 'fa fa-user',
        items: [
            {
                label: 'Staff Records',
                icon: 'fa fa-address-book',
                route: '/staff-records'
            },
            {
                label: 'Staff Permissions',
                icon: 'fa fa-shield-halved',
                route: '/staff-permissions'
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
                route: '/generate-reports'
            },
            {
                label: 'Audit Trails',
                icon: 'fa fa-clock-rotate-left',
                route: '/audit-trails'
            }
        ]
    },
]);
</script>

<template>
    <div class="z-50 fixed h-full w-80 pl-4 py-4">
        <div class="flex flex-col rounded-xl h-full min-w-[12rem] py-1 u-bg-pcolor dark:bg-surface-700 border border-surface-200 dark:border-surface-700 text-white shadow-lg">
            <div>
                <span class="inline-flex items-center gap-4 px-6 pt-4">
                    <Button icon="fa fa-bars" class="w-8 h-8 u-bg-scolor"
                    :pt="{
                        root: ({ props }) => ({
                            class: [
                                {
                                    'text-white dark:text-surface-900': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
                                    'u-bg-scolor dark:bg-primary-400': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
                                    'border-none dark:border-primary-400': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
                                },
                                { 'hover:u-bg-pcolor-darker dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain },
                                { 'focus:u-ring-scolor dark:focus:ring-primary-300/50': props.severity === null },
                            ]
                        })
                    }"
                    :pt-options="{mergeProps:true}">

                    </Button>
                    <span class="text-lg">
                        Menu
                    </span>
                </span>
                <div class="px-4">
                    <Divider />
                </div>
            </div>
            <PanelMenu class="w-full h-full md:w-20rem overflow-y-auto mb-4"
            :model="items"
            :pt="{
                panel: {
                    class: 'text-sm'
                },
                header: {
                    class: ['rounded-md', 'outline-none', 'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50']
                },
                headercontent: ({ context }) => {
                    return {
                    class: [
                        // Color
                        'border-none',
                        'bg-transparent dark:bg-surface-800',
                        'text-white dark:text-surface-0/80',
                        { 'u-bg-pcolor-darker': context.active },
                        // States
                        {
                            'hover:u-bg-pcolor-darker text-white dark:hover:bg-surface-600/80': !context.active,
                            'hover:u-bg-pcolor-2 dark:hover:bg-primary-300/30 dark:text-surface-0/80': context.active
                        },
                        // Transition
                        'transition duration-200 ease-in-out',
                        'transition-shadow duration-200',
                        'transition-shadow'
                    ]
                    };
                },
                headeraction: {
                    class: ['relative', 'flex', 'items-center', 'py-3', 'px-5', 'dark:text-white/80', 'no-underline', 'overflow-hidden', 'cursor-pointer', 'select-none']
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
                    class: ['border-none', 'rounded-t-none', 'text-surface-700 dark:text-white/80', 'u-bg-pcolor-2 dark:bg-surface-800', 'border-surface-200 dark:border-surface-700']
                },
                menu: {
                    class: ['outline-none', 'm-0 p-0 list-none']
                },
                content: {
                    class: ['border-none rounded-none', 'text-surface-700 dark:text-white/80', 'transition-shadow duration-200']
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
                    'hover:bg-surface-200/80 dark:hover:bg-surface-700/80 hover:u-txt-active dark:hover:text-white/80',
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
                        <a v-ripple class="flex items-center px-6 py-3" v-bind="props.action" :href="href" @click="navigate">
                            <span class="flex justify-center items-center w-8 h-8 rounded-md u-bg-scolor shadow-md">
                                <span :class="item.icon" class="fa-lg text-white"/>
                            </span>
                            <span class="ml-4">{{ item.label }}</span>
                        </a>
                    </router-link> 
                    <a v-else v-ripple class="flex items-center px-6 py-3" v-bind="props.action" :href="item.url" :target="item.target">
                        <span class="flex justify-center items-center w-8 h-8 rounded-md u-bg-scolor shadow-md">
                            <span :class="item.icon" class="fa-lg text-white"/>
                        </span>
                        <span class="ml-4">{{ item.label }}</span>
                        <i v-if="hasSubmenu && !active" class="pi pi-angle-right ml-auto"></i>
                        <i v-else class="pi pi-angle-down ml-auto"></i>
                    </a>   
                </template>
            </PanelMenu>
            <div>
                <div class="px-4">
                    <Divider />
                </div>
                <div class="flex flex-row justify-between items-center px-6 pb-4">
                    <div class="flex flex-col">
                        <span class="inline-flex justify-between items-center gap-1">Account Name</span>
                        <span class="inline-flex justify-between items-center gap-1 text-sm">Role</span>
                    </div>
                    <span>
                        <Button icon="fa fa-right-from-bracket" class="w-8 h-8"
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
                    </span>
                </div>
            </div>
        </div>
        
    </div>
</template>

<style scoped>

</style>
