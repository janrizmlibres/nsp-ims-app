<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

import { useUtilitiesStore } from '@/stores/utilities';

const toast = useToast()
const requirementStore = useUtilitiesStore()

const name = ref(null);

async function addRequirement() {
    try {  
        if (!name.value.trim()) {
            toast.add({
                severity: 'error',
                summary: 'Incomplete Form',
                detail: "The field cannot be empty. Please provide a student requirement.",
                life: 3000
            })
            return
        }

        if (requirementStore.requirements.some(requirement => requirement.requirement_name === name.value.trim())) {
            toast.add({
                severity: 'error',
                summary: 'Duplicate Requirement',
                detail: "Please provide a unique student requirement.",
                life: 3000
            })
            return
        }

        if (name.value.trim().length > 100) {
            toast.add({
                severity: 'error',
                summary: 'Requirement Too Long',
                detail: 'The requirement should not exceed 100 characters.',
                life: 3000
            })
            return
        }

        if (name.value.trim().length < 3) {
            toast.add({
                severity: 'error',
                summary: 'Requirement Too Short',
                detail: 'The requirement should be at least 3 characters.',
                life: 3000
            })
            return
        }

        await requirementStore.addRequirement({
            requirement_name: name.value.trim()
        })

        await requirementStore.getRequirements()

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Student Requirement added successfully!',
            life: 3000
        })
    } catch(error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered. Please refresh this page.',
            life: 3000
        })
    }

    name.value = null;
    requirementStore.showHideAddRequirementDialog()
}
</script>

<template>
    <Dialog v-model:visible="requirementStore.visibleAddRequirementDialog" modal header="Create a Student Requirement" :style="{ width: '25rem' }">
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
                @click="addRequirement"
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