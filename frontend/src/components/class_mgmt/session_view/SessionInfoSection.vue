<script setup>
// Presets
import ProgressSpinner from 'primevue/progressspinner';
import Panel from 'primevue/panel';
import { ref, watch } from 'vue';

// stores

const props = defineProps(['modelValue'])

const isFetching = ref(true)
const date = ref()

watch(() => props.modelValue, (data) => {
    isFetching.value = true
    
    let tempDistriDate = new Date(data.date)
    date.value = tempDistriDate.toDateString()

    isFetching.value = false
}, {immediate: false})
</script>

<template>
    <Panel toggleable class="shadow-md">
        <template #header>
            <div class="flex items-center gap-2">
                <i class="fa fa-circle-info fa-xl"></i>
                <span class="u-txt-active font-semibold text-xl content-center">Session Information</span>
            </div>
        </template>
        <ProgressSpinner v-if="isFetching" class="self-center" />
        <div v-else class="flex flex-col px-4">
            <span class="text-md u-txt-active flex flex-row">
                <p class="pr-4 font-semibold">Date:</p> 
                <p>{{ date }}</p>
            </span>
        </div>
    </Panel>
</template>

<style>
</style>