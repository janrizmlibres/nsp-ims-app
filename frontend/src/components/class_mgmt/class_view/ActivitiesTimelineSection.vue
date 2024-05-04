<script setup>
// Presets
import Divider from 'primevue/divider';
import TimelineCard from './TimelineCard.vue';
import ProgressSpinner from 'primevue/progressspinner';
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
    <div class="bg-white shadow-xl p-4 rounded-md mb-12 u-border-bottom">
        <span class="font-semibold text-xl u-txt-active">Timeline</span>
        <Divider />

        <ProgressSpinner v-if="isFetching" class="flex justify-center" />
        <div v-else class="flex flex-col gap-2 px-8 pb-4 overflow-auto justify-center">
            <span v-if="allModules.length === 0" class="text-center">No upcoming activities due</span>
            <TimelineCard v-else v-for="module of allModules" :key="module.id" />
        </div>
    </div>
</template>