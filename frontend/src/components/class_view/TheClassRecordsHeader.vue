<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import { ref } from 'vue';
defineProps(['filterValues'])

const filters = ref(this.filterValues)
</script>

<template>
    <div class="flex justify-end">
        <span class="relative mr-2">
            <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
            <InputText v-model="filters['global'].value" placeholder="Keyword Search"  class="pl-10 font-normal"/>
        </span>
        <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
    </div>
</template>