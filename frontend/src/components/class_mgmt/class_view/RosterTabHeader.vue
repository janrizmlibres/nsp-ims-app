<script setup>
// Presets
import InputText from 'primevue/inputtext';
import { ref } from 'vue';

const props = defineProps(['filters'])
const filters = ref(props.filters)
</script>

<template>
    <div>
        <span class="relative mr-2">
            <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
            <InputText v-model="filters['global'].value" placeholder="Search" class="pl-10 font-normal"/>
        </span>
    </div>
</template>