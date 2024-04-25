<script setup>
import ContentPane from '@/components/UI/ContentPane.vue';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
</script>

<template>
    <ContentPane header="Strand Information">
        <div class="u-router-view-max-h h-screen overflow-auto">
            <div class="pt-1 u-bg-pcolor rounded-lg">
                <div class="bg-white shadow-xl p-4 mb-8 rounded-md">
                    <span>Timeline</span>
                    <Divider />
                    <div class="flex flex-col gap-8 px-8">
                        <Card><template #title> Activity </template></Card>
                        <Card><template #title> Activity </template></Card>
                        <Card><template #title> Activity </template></Card>
                    </div>
                </div>
            </div>
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