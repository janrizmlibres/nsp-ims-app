<script setup>
import ConfirmDialog from 'primevue/confirmdialog';
import Button from 'primevue/button';
</script>

<template>
    <ConfirmDialog group="actionGuard">
        <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="flex flex-col items-center p-5 bg-surface-0 dark:bg-surface-700 rounded-md">
            <div class="rounded-full u-bg-red dark:bg-primary-400 text-surface-0 dark:text-surface-900 inline-flex justify-center items-center h-[6rem] w-[6rem] -mt-[3rem]">
            <i class="pi pi-exclamation-triangle text-5xl"></i>
            </div>
            <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
            <p class="mb-0">{{ message.message }}</p>
            <div class="flex items-center gap-2 mt-4">
            <Button label="Yes" @click="acceptCallback" class="w-[8rem]"
                    :pt="{
                root: ({ props, context, parent }) => ({
                    class: [
                    {
                        'u-bg-red dark:bg-primary-400': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
                        'border u-border-red dark:border-primary-400': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
                    },
                    
                    // Primary
                    { 'hover:u-bg-red-2 dark:hover:bg-primary-300 hover:u-border-red dark:hover:border-primary-300': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain },
                    { 'focus:ur-ring-red-2 dark:focus:ring-primary-300/50': props.severity === null },
                    ]
                })
                }"
                    :pt-options="{mergeProps: true}"
            />
            <Button label="No" outlined @click="rejectCallback" class="w-[8rem]"
                    :pt="{
                root: ({ props, context, parent }) => ({
                    class: [
                    // Primary Outlined Button
                    { 'u-txt-red border u-border-red hover:u-bg-red-darker': props.outlined && props.severity === null && !props.plain },
                    { 'focus:ur-ring-red-2 dark:focus:ring-primary-300/50': props.severity === null },
                    ]
                })
                }"
                    :pt-options="{mergeProps: true}"
            />
            </div>
        </div>
        </template>
    </ConfirmDialog>
</template>

<style scoped>

</style>