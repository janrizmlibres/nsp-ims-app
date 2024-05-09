<script setup>
// Presets
import Divider from 'primevue/divider';
import StrandCard from './StrandCard.vue';
import ProgressSpinner from 'primevue/progressspinner';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// stores
import { useClassStore } from '@/stores/class';

const route = useRoute()
const classStore = useClassStore()

const isFetching = ref(true)
const strands = ref([])

watch(() => route.query, (query) => {
    isFetching.value = true
    try {
        classStore.getAllStrands(query.id).then((data) => strands.value = data)
    } catch (error) {
        console.log(error.response.data.message)
    }
    isFetching.value = false
}, {immediate: true})
</script>

<template>
    <div class="mb-20">
        <div class="flex flex-row gap-4 items-center px-4">
            <i class="fa-solid fa-bookmark fa-2xl u-txt-active"></i>
            <span class="font-semibold text-3xl u-txt-active">Learning Strands</span>
        </div>
        <Divider class="before:border-t before:border-surface-400"/>
        
        <ProgressSpinner v-if="isFetching" class="flex justify-center" />
        <span v-else-if="strands.length === 0" class="flex flex-col text-center">No learning strands created.</span>
        <div v-else class="grid lg:grid-cols-3 md:grid-cols-1 gap-12">
            <StrandCard v-for="learningStrand of strands" :key="learningStrand.teacher" :data="learningStrand" />
        </div>
    </div>
</template>

<style>
</style>