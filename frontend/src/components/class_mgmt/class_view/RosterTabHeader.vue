<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import { useRosterStore } from '@/stores/roster';
const rosterStore = useRosterStore()
</script>

<template>
    <div>
        <span class="relative mr-2">
            <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
            <InputText v-model="rosterStore.filters['global'].value" placeholder="Search"  size="small" class="pl-10 font-normal"/>
        </span>
        <Button icon="fa-solid fa-file-export" label="Export" class="ml-2 h-10" @click="rosterStore.exportCSV($event)" />
    </div>
</template>