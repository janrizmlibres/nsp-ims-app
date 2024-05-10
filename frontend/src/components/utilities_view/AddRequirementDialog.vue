<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
</script>

<template>
    <Dialog modal header="Create a Student Requirement" :style="{ width: '25rem' }">
        <span class="p-text-secondary block mb-5">Fill up necessary information.</span>
        <div class="flex flex-col mb-4">
            <label>Student Requirement</label>
            <InputText id="title" v-model="name" aria-describedby="title-help" />
        </div>
        <div class="flex justify-end gap-2">
            <Button
                type="button"
                label="Create"
                icon="fa-solid fa-plus"
                :pt="{
                    root: ({ props, context, parent }) => ({
                        class: [
                            {
                                'u-bg-pcolor-darker': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
                                'border u-bc-button': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
                            },
                            {
                                'border u-bc-button hover:u-bc-button': props.outlined && props.severity === null && !props.plain
                            },
                            { 
                                'hover:u-bg-button-hover hover:u-bg-border-button-hover': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain 
                            },
                            { 
                                'focus:u-bg-border-button-focus': props.severity === null 
                            },
                        ]
                    })
                }"
                :pt-options="{mergeProps: true}"
            />
        </div>
    </Dialog>
</template>