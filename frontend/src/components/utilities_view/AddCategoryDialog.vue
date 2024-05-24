<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { computed, ref } from 'vue'

import { useUtilitiesStore } from '@/stores/utilities';

const toast = useToast()
const categoryStore = useUtilitiesStore()

const name = ref(null);

const isInvalid = computed(() => !name.value)

async function addCategory() {
    if (isInvalid.value) {
        return;
    }

    try {  
        if (!name.value.trim()) {
            toast.add({
                severity: 'error',
                summary: 'Incomplete Form',
                detail: "The field cannot be empty. Please provide a student category.",
                life: 3000
            })
            return
        }

        if (categoryStore.categories.some(category => category.category_name === name.value.trim())) {
            toast.add({
                severity: 'error',
                summary: 'Duplicate Category',
                detail: "Please provide a unique student category.",
                life: 3000
            })
            return
        }

        if (name.value.trim().length > 100) {
            toast.add({
                severity: 'error',
                summary: 'Category Too Long',
                detail: 'The category should not exceed 100 characters.',
                life: 3000
            })
            return
        }

        if (name.value.trim().length < 3) {
            toast.add({
                severity: 'error',
                summary: 'Category Too Short',
                detail: 'The category should be at least 3 characters.',
                life: 3000
            })
            return
        }

        await categoryStore.addCategory({
            category_name: name.value.trim()
        })

        await categoryStore.getCategories()

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Student Category added successfully!',
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
    categoryStore.showHideAddCategoryDialog()
}
</script>

<template>
    <Dialog v-model:visible="categoryStore.visibleAddCategoryDialog" modal header="Create a Student Category" :style="{ width: '25rem' }" @keyup.enter="addCategory">
        <span class="p-text-secondary block mb-5">Fill up necessary information.</span>
        <div class="flex flex-col mb-4">
            <label>Student Category</label>
            <InputText id="title" v-model="name" aria-describedby="title-help" />
        </div>
        <div class="flex justify-end gap-2">
            <Button
                type="button"
                label="Create"
                icon="fa-solid fa-plus"
                :disabled="isInvalid"
                @click="addCategory"
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