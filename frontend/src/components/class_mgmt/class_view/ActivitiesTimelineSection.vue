<script setup>
// Presets
import Divider from 'primevue/divider';
import TimelineCard from './TimelineCard.vue';
import Badge from 'primevue/badge';
import { computed } from 'vue';

const props = defineProps(['modelValue'])

const strands = computed(() => props.modelValue)
</script>

<template>
    <div class="bg-white shadow-xl p-4 rounded-md mb-20 u-border-bottom">
        <div class="flex flex-row gap-4 items-center">
            <i class="fa-solid fa-chart-line fa-lg u-txt-active"></i>
            <span class="font-semibold text-2xl u-txt-active">Timeline</span>
            <Badge v-if="strands.length" :value="strands.flatMap((strand) => {return strand.modules}).length" size="large" severity="warning"></Badge>
        </div>
        <Divider />

        <div class="flex flex-col gap-12 px-auto pb-4 overflow-auto max-h-[24rem]">
            <span v-if="strands.length === 0" class="text-center">No upcoming activities due</span>
            <div v-else v-for="strand of strands" :key="strand.id" class="flex flex-col gap-2 px-8">
                <div class="flex flex-row gap-4 items-center u-txt-active">
                    <i class="fa fa-bookmark" />
                    <span class="font-semibold">{{ strand.learning_strand.name }}</span>
                </div>
                <TimelineCard v-for="module of strand.modules" :key="module.id" :data="module" :subdata="strand.learning_strand" />
            </div>
        </div>
    </div>
</template>