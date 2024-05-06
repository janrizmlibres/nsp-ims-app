<script setup>
// Presets
import Divider from 'primevue/divider';
import StrandCard from './StrandCard.vue';
import ProgressSpinner from 'primevue/progressspinner';
import { ref, watch } from 'vue';

// stores
import { useClassStore } from '@/stores/class';
const classStore = useClassStore()

const isFetching = ref(true)
const allStrands = ref([])

async function fetchStrands(data) {
    isFetching.value = true
    
    try {
        allStrands.value = data
    } catch(error) {
        console.log(error.response.data.message)
    }

    isFetching.value = false
}

watch(() => classStore.strands, fetchStrands, {immediate: false})
</script>

<template>
    <div class="mb-20">
        <div class="flex flex-row gap-4 items-center px-4">
            <i class="fa-solid fa-bookmark fa-2xl u-txt-active"></i>
            <span class="font-semibold text-3xl u-txt-active">Learning Strands</span>
        </div>
        <Divider class="before:border-t before:border-surface-400"/>
        
        <ProgressSpinner v-if="isFetching && allStrands.length === 0" class="flex justify-center" />
        <span v-else-if="!isFetching && allStrands.length === 0" class="flex flex-col text-center">No learning strands created.</span>
        <div v-else class="grid lg:grid-cols-3 md:grid-cols-1 gap-12">
            <StrandCard v-for="learningStrand of allStrands" :key="learningStrand.teacher" :id="learningStrand.id" :title="learningStrand.learning_strand.name" :teacher="learningStrand.teacher" :schedule="learningStrand.class_schedules" />
        </div>
    </div>
</template>

<style>
</style>