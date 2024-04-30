<script setup>
import Card from 'primevue/card';
</script>

<template>
    <Card
    :pt="{
        root: {
            class: ['rounded-md', 'shadow-md', 'bg-surface-0 dark:bg-surface-900', 'text-surface-700 dark:text-surface-0', 'hover: hover:bg-surface-100 hover:cursor-pointer']
        },
        body: {
            class: 'p-5 px-8'
        },
        title: {
            class: 'text-lg font-semibold mb-2'
        },
        subtitle: {
            class: ['text-sm', 'mb-2', 'text-surface-600 dark:text-surface-0/60']
        },
        content: {
            class: 'py-none'
        },
        footer: {
            class: 'pt-5'
        }
    }">
    <template #title> Deadline </template>
    <template #subtitle>
        <div class="flex flex-row justify-between">
            <div class="flex flex-row">
                <i class="fa-solid fa-file-circle-exclamation fa-lg mr-4 pt-2" />
                <div class="flex flex-col">
                    <p>Module #: Title</p>
                    <p>Learning Strand #</p>
                </div>
            </div>
            <div>
                View
            </div>
        </div>
    </template>
</Card>
</template>