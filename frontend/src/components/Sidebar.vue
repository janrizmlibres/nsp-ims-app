
<script setup>

import DashboardIcon from 'vue-material-design-icons/ViewDashboard.vue';

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
        <TieredMenu :model="items">
            <template #start>
                <span class="inline-flex justify-between items-center gap-1 px-6 pt-2">
                    <Button>

                    </Button>
                    <span>
                        Menu
                    </span>
                </span>
                <Divider />
            </template>
            <template #item="{ item, props }">
                <a v-ripple class="flex align-items-center px-3 py-2 cursor-pointer" v-bind="props.action">
                    <span :class="[item.icon]" />
                    <span :class="['ml-2', 'primary-text-size', { 'font-semibold': item.items }]">{{ item.label }}</span>
                    <span v-if="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
                </a>
            </template>
            <template #end>
                <Divider />
                <span class="inline-flex justify-between items-center gap-1 px-6 pb-2">Account</span>
            </template>
        </TieredMenu>
    </div>
</template>

<style scoped>
  .primary-bg {
    background-color: var(--primary-color) !important;
  }

  .p-menu {
    background-color: var(--primary-color) !important;
  }

  .primary-text-size {
    font-size: var(--p-txt-size);
  }

  .h-calc {
    height: (100vh);
  }
</style>
