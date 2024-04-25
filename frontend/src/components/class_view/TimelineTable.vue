<script setup>
import Divider from 'primevue/divider';
import Card from 'primevue/card';
</script>

<template>
    <div class="pt-[0.1rem] u-bg-pcolor rounded-md mb-12">
        <div class="bg-white shadow-xl p-4 rounded-md">
            <span class="font-semibold text-xl u-txt-active">Timeline</span>
            <Divider />
            <div class="flex flex-col gap-8 px-8 pb-4 overflow-auto">
                <Card><template #title> Activity </template></Card>
                <Card><template #title> Activity </template></Card>
                <Card><template #title> Activity </template></Card>
            </div>
        </div>
    </div>
</template>

<style>
</style>