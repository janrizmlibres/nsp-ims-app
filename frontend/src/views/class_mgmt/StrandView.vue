<script setup>
import ContentPane from '@/components/UI/ContentPane.vue';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
</script>

<template>
    <ContentPane header="Strand Information">
        <div class="u-router-view-max-h h-screen overflow-auto">
            <div class="grid grid-cols-3 gap-8">
                <Card>
                    <template #title> Section </template>
                    <template #content> Sample Content </template>
                </Card>
                <Card>
                    <template #title> Section </template>
                    <template #content> Sample Content </template>
                </Card>
                <Card>
                    <template #title> Section </template>
                    <template #content> Sample Content </template>
                </Card>
            </div>
        </div>
    </ContentPane>
</template>

<style>
</style>