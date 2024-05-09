<script setup>
// Presets
import ProgressSpinner from 'primevue/progressspinner';
import Panel from 'primevue/panel';
import { ref, watch } from 'vue';

// stores

const props = defineProps(['modelValue'])

const isFetching = ref(true)
const distriDate = ref()
const retriDate = ref()

watch(() => props.modelValue, (data) => {
    isFetching.value = true
    try {
        let tempDistriDate = new Date(data.distribution_date)
        distriDate.value = tempDistriDate.toDateString()

        let tempRetriDate = new Date(data.retrieval_date)
        retriDate.value = tempRetriDate.toDateString()
    } catch(error) {
        console.log(error.response.data.message)
    }

    isFetching.value = false
}, {immediate: false})
</script>

<template>
    <Panel toggleable class="shadow-md">
        <template #header>
            <div class="flex items-center gap-2">
                <i class="fa fa-circle-info fa-xl"></i>
                <span class="u-txt-active font-semibold text-xl content-center">Module Information</span>
            </div>
        </template>
        <ProgressSpinner v-if="isFetching" class="flex justify-center" />
        <div v-else class="flex flex-col px-4">
            <span class="text-md u-txt-active flex flex-row">
                <p class="pr-4 font-semibold">Distribution Date:</p> 
                <p>{{ distriDate }}</p>
            </span>
            <span class="text-md u-txt-active flex flex-row">
                <p class="pr-4 font-semibold">Retrieval Date:</p>
                <p>{{ retriDate }}</p>
            </span>
        </div>
    </Panel>
</template>

<style>
</style>