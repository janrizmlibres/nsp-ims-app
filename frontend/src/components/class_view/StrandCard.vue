<script setup>
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import ProgressBar from 'primevue/progressbar';

const router = useRouter()

function showStrand() {
    router.push('/strandInformation')
}
</script>

<template>
    <Card
    :pt-options="{mergeProps:true}"
    :pt="{
        root: {
            class: ['rounded-t-3xl rounded-b-3xl', 'shadow-md', 'bg-surface-0', 'u-txt-active']
        },
        body: {
            class: '!p-0'
        },
        caption: {
            class: 'px-8 pt-8'
        },
        title: {
            class: 'text-lg font-bold'
        },
        content: {
            class: 'pl-8 pb-8'
        },
        footer: {
            class: '!pt-0 u-bg-pcolor rounded-b-3xl overflow-hidden '
        }
    }">
        <template #title> Understanding the Self and Society </template>
        <template #subtitle><ProgressBar :value="50"></ProgressBar></template>
        <template #content>
            <h3> Dela Cruz, Juan A. </h3>
            <p class="m-0 max-h">
                MTH | 6:00 PM - 7:00 PM
            </p>
            
        </template>
        <template #footer>
            <Button label="View" class="w-full rounded-t-none u-bg-pcolor" @click="showStrand" />
        </template>
    </Card>
</template>