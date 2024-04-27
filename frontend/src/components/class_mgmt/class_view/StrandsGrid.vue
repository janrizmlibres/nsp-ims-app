<script setup>
import Divider from 'primevue/divider';
import StrandCard from './StrandCard.vue';
</script>

<template>
    <div class="bg-transparent border-none flex flex-row justify-between items-center px-4">
        <div class="u-txt-active font-semibold text-3xl content-center">Learning Strands</div>
    </div>
    <Divider class="before:border-t before:border-surface-400"/>
    
    <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-12 pt-4 px-4 mb-16">
        <StrandCard />
        <StrandCard />
        <StrandCard />
    </div>
</template>

<style>
</style>