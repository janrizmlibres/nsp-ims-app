<script setup>
// Presets
import ProgressSpinner from 'primevue/progressspinner';
import Panel from 'primevue/panel';
import { inject, ref, watch } from 'vue';

// stores

const module = inject('module')
const isFetching = inject('isFetching')
const distriDate = ref()
const retriDate = ref()
const totalScore = ref()

watch(() => module.value, (data) => {
    let tempDistriDate = new Date(data.distribution_date)
    distriDate.value = tempDistriDate.toDateString()

    let tempRetriDate = new Date(data.retrieval_date)
    retriDate.value = tempRetriDate.toDateString()

    totalScore.value = data.total_score
})
</script>

<template>
    <Panel toggleable class="shadow-md rounded-2xl u-border-bottom"
        :pt="{header: {class:['!rounded-t-2xl']}, toggleableContent: {class: ['!rounded-b-2xl']}, content: {class: ['!rounded-b-2xl']}}"
        :ptOptions="{mergeProps: true}"
    >
        <template #header>
            <div class="flex items-center gap-2">
                <i class="fa fa-circle-info fa-xl"></i>
                <span class="u-txt-active font-semibold text-xl content-center">Module Information</span>
            </div>
        </template>
        <ProgressSpinner v-if="isFetching" class="flex justify-center self-center" />
        <div v-else class="flex flex-col px-4">
            <span class="text-md u-txt-active flex flex-row">
                <p class="pr-4 font-semibold">Distribution Date:</p> 
                <p>{{ distriDate }}</p>
            </span>
            <span class="text-md u-txt-active flex flex-row">
                <p class="pr-4 font-semibold">Retrieval Date:</p>
                <p>{{ retriDate }}</p>
            </span>
            <span class="text-md u-txt-active flex flex-row">
                <p class="pr-4 font-semibold">Total Score:</p>
                <p>{{ totalScore }}</p>
            </span>
        </div>
    </Panel>
</template>

<style>
</style>