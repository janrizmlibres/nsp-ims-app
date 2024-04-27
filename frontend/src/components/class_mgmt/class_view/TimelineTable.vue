<script setup>
import Divider from 'primevue/divider';
import TimelineCard from './TimelineCard.vue';
</script>

<template>
    <div class="pt-[0.1rem] u-bg-pcolor rounded-md mb-12">
        <div class="bg-white shadow-xl p-4 rounded-md">
            <span class="font-semibold text-xl u-txt-active">Timeline</span>
            <Divider />
            <div class="flex flex-col gap-2 px-8 pb-4 overflow-auto">
                <TimelineCard />
                <TimelineCard />
                <TimelineCard />
            </div>
        </div>
    </div>
</template>

<style>
</style>