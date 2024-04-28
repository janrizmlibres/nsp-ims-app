<script setup>
import Card from 'primevue/card';

const props = defineProps(['title', 'content'])
</script>

<template>
    <Card
    :pt-options="{mergeProps:false}"
    :pt="{
        root: {
            class: ['rounded-3xl', 'shadow-md', 'bg-surface-0 dark:bg-surface-900', 'u-txt-active dark:text-surface-0',
                'hover:u-bg-pcolor hover:text-white hover:cursor-pointer transition-all duration-200 hover:transform hover:scale-105' 
            ]
        },
        body: {
            class: 'p-5'
        },
        title: {
            class: 'text-2xl font-bold mb-2'
        },
        subtitle: {
            class: ['font-normal', 'mb-2']
        },
        content: {
            class: '!py-0'
        },
        footer: {
            class: 'pt-5'
        }
    }">
        <template #title> {{props.title}} </template>
        <template #subtitle> {{props.content}} </template>
    </Card>
</template>