<script setup>
// Presets
import Divider from 'primevue/divider';
import LearningStrandCard from './LearningStrandCard.vue';
import { computed } from 'vue';

const props = defineProps(['modelValue'])

const strands = computed(() => props.modelValue)
</script>

<template>
    <div class="mb-20">
        <div class="flex flex-row gap-4 items-center px-4">
            <i class="fa-solid fa-bookmark fa-2xl u-txt-active"></i>
            <span class="font-semibold text-3xl u-txt-active">Learning Strands</span>
        </div>
        <Divider class="before:border-t before:border-surface-400"/>
        
        <span v-if="strands.length === 0" class="flex flex-col text-center">No learning strands created.</span>
        <div v-else class="flex flex-col gap-4">
            <LearningStrandCard v-for="learningStrand of strands" :key="learningStrand.id" :data="learningStrand" />
        </div>
    </div>
</template>

<style>
</style>