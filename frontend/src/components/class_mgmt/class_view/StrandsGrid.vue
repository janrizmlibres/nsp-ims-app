<script setup>
import Divider from 'primevue/divider';
import StrandCard from './StrandCard.vue';
</script>

<template>
    <div class="mb-12">
        <div class="bg-transparent border-none flex flex-row justify-between items-center px-4">
            <div class="u-txt-active font-semibold text-3xl content-center">Learning Strands</div>
        </div>
        <Divider class="before:border-t before:border-surface-400"/>
        
        <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-12 p-4">
            <StrandCard />
            <StrandCard />
            <StrandCard />
        </div>
    </div>
</template>

<style>
</style>