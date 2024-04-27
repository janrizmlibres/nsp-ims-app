<script setup>
import InputText from 'primevue/inputtext';

import { useClassesStore } from '@/stores/classes';
const classesStore = useClassesStore()
</script>

<template>
    <div class="bg-transparent border-none flex justify-between py-2">
        <div class="pt-4 text-surface-600">Select a class in an academic year</div>
        <div>
            <span class="relative mr-2">
                <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                <InputText v-model="classesStore.filters['global'].value" placeholder="Search"  size="small" class="pl-10 font-normal"/>
            </span>
        </div>
    </div>
</template>