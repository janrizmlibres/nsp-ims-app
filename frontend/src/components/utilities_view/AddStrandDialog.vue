<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

import { useUtilitiesStore } from '@/stores/utilities';

const toast = useToast()
const strandStore = useUtilitiesStore()

const code = ref(null);
const name = ref(null);

async function addLearningStrand() {
    if (!code.value.trim() || !name.value.trim()) {
        toast.add({
            severity: 'error',
            summary: 'Incomplete Form',
            detail: "Please fill all necessary information",
            life: 3000
        })
        return
    }

    if (strandStore.strands.some(strand => strand.code === code.value.trim())) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Learning Strand Code already exists.',
            life: 3000
        })
        return
    }

    if (strandStore.strands.some(strand => strand.name === name.value.trim())) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Learning Strand Name already exists.',
            life: 3000
        })
        return
    }
    
    if (code.value.trim().length > 25) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Learning Strand Code should not exceed 25 characters.',
            life: 3000
        })
        return
    }

    if (name.value.trim().length > 100) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Learning Strand Name should not exceed 100 characters.',
            life: 3000
        })
        return
    }

    if (code.value.trim().length < 3) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Learning Strand Code should be at least 3 characters.',
            life: 3000
        })
        return
    }

    if (name.value.trim().length < 3) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Learning Strand Name should be at least 3 characters.',
            life: 3000
        })
        return
    }

    try {
        await strandStore.addLearningStrand({
            code: code.value.trim(),
            name: name.value.trim()
        })

        await strandStore.getLearningStrands()

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Learning Strand added successfully!',
            life: 3000
        })
    } catch(error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered.',
            life: 3000
        })
    }

    code.value = null;
    name.value = null;
    strandStore.showHideAddStrandDialog()
}
</script>

<template>
    <Dialog v-model:visible="strandStore.visibleAddStrandDialog" modal header="Create a Learning Strand" :style="{ width: '25rem' }">
        <span class="p-text-secondary block mb-5">Fill up necessary information.</span>
        <div class="flex flex-col mb-4">
            <label>Learning Strand Code</label>
            <InputText id="title" v-model="code" aria-describedby="title-help" />
        </div>
        <div class="flex flex-col mb-4">
            <label>Learning Strand Name</label>
            <InputText id="title" v-model="name" aria-describedby="title-help" />
        </div>
        <div class="flex justify-end gap-2">
            <Button
                type="button"
                label="Create"
                icon="fa-solid fa-plus"
                @click="addLearningStrand"
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