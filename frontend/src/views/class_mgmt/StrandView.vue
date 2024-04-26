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
                    <template #title> Modules </template>
                    <template #content> View Modules </template>
                </Card>
                <Card>
                    <template #title> Grades </template>
                    <template #content> View Grades </template>
                </Card>
                <Card>
                    <template #title> Attendance </template>
                    <template #content> View Attendance </template>
                </Card>
            </div>
        </div>
    </ContentPane>
</template>

<style>
</style>