
<script setup>
import '@/assets/css/base.css'
import 'primeicons/primeicons.css'

import Button from 'primevue/button';

import Menu from 'primevue/menu';
import { ref } from "vue";

const items = ref([
    {
        separator: true
    },
    {
        label: 'Dashboard',
        icon: 'pi pi-home',
        shortcut: '⌘+D'
    },
    {
        label: 'Documents',
        items: [
            {
                label: 'New',
                icon: 'pi pi-plus',
                shortcut: '⌘+N'
            },
            {
                label: 'Search',
                icon: 'pi pi-search',
                shortcut: '⌘+S'
            }
        ]
    },
    {
        label: 'Profile',
        items: [
            {
                label: 'Settings',
                icon: 'pi pi-cog',
                shortcut: '⌘+O'
            },
            {
                label: 'Messages',
                icon: 'pi pi-inbox',
                badge: 2
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                shortcut: '⌘+Q'
            }
        ]
    },
    {
        separator: true
    }
]);
</script>

<template>
    <div class="primary-bg" >  
        <Menu :model="items" class="">
            
        </Menu>
    </div>
</template>

<style scoped>
  .primary-bg {
    background-color: var(--primary-color);
  }
</style>
