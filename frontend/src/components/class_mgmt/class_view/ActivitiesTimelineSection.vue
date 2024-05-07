<script setup>
// Presets
import Divider from 'primevue/divider';
import TimelineCard from './TimelineCard.vue';
import ProgressSpinner from 'primevue/progressspinner';
import Badge from 'primevue/badge';
import { ref, watch } from 'vue';

// stores
import { useClassStore } from '@/stores/class';

const classStore = useClassStore()

const isFetching = ref(true)
const allModules = ref([])

function fetchModules(data) {
    isFetching.value = true
    
    try {
        allModules.value = data
    } catch(error) {
        console.log(error.response.data.message)
    }
    
    isFetching.value = false
}

watch(() => classStore.modules, fetchModules, {immediate: false})
</script>

<template>
    <div class="bg-white shadow-xl p-4 rounded-md mb-20 u-border-bottom">
        <div class="flex flex-row gap-4 items-center">
            <i class="fa-solid fa-chart-line fa-lg u-txt-active"></i>
            <span class="font-semibold text-2xl u-txt-active">Timeline</span>
            <Badge v-if="allModules.length" :value="allModules.length" size="large" severity="warning"></Badge>
        </div>
        <Divider />

        <ProgressSpinner v-if="isFetching" class="flex justify-center" />
        <div v-else class="flex flex-col gap-2 px-auto pb-4 overflow-auto max-h-[24rem]">
            <span v-if="allModules.length === 0" class="text-center">No upcoming activities due</span>
            <TimelineCard v-else v-for="module of allModules" :key="module.id" :data="module" />
        </div>
    </div>
</template>