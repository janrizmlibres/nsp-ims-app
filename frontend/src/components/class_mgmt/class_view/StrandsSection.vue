<script setup>
// Presets
import Divider from 'primevue/divider';
import StrandCard from './StrandCard.vue';
import ProgressSpinner from 'primevue/progressspinner';
import { ref, watch } from 'vue';

const props = defineProps(['modelValue'])

const isFetching = ref(true)
const strands = ref([])

watch(() => props.modelValue, (data) => {
    isFetching.value = true
    strands.value = data
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