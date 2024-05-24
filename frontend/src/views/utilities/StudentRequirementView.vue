<script setup>
import ContentPane from '@/components/UI/ContentPane.vue';
import AddRequirementDialog from '@/components/utilities_view/AddRequirementDialog.vue';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useToast } from 'primevue/usetoast';
import { ref, onMounted, computed } from 'vue';

import { useUtilitiesStore } from '@/stores/utilities';

const requirementStore = useUtilitiesStore()
const toast = useToast()

const requirements = computed(() => requirementStore.requirements)

onMounted(async () => {
    try {
        await requirementStore.getRequirements()
    } catch(error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered. Please refresh this page.',
            life: 3000
        })
    } 
})

async function deleteRequirement(id) {
    try {
        await requirementStore.deleteRequirement(id)
        await requirementStore.getRequirements()

            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Student Requirement deleted successfully!',
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
}

const editingRows = ref([])

const onRowEditSave = async (event) => {
    let { data, newData } = event;
    if ( JSON.stringify(data) !== JSON.stringify(newData) ) {
        if (!newData.requirement_name.trim()) {
            toast.add({
                severity: 'error',
                summary: 'Incomplete Form',
                detail: "The field cannot be empty. Please provide a requirement.",
                life: 3000
            })
            return
        }

        if (requirementStore.requirements.some(requirement => requirement.requirement_name === newData.requirement_name.trim() && requirement.id !== newData.id)) {
            toast.add({
                severity: 'error',
                summary: 'Duplicate Requirement',
                detail: "Please provide a unique student requirement.",
                life: 3000
            })
            return
        }

        if (newData.requirement_name.trim().length > 100) {
            toast.add({
                severity: 'error',
                summary: 'Requirement Too Long',
                detail: 'The requirement should not exceed 100 characters.',
                life: 3000
            })
            return
        }

        if (newData.requirement_name.trim().length < 3) {
            toast.add({
                severity: 'error',
                summary: 'Requirement Too Short',
                detail: 'The requirement should be at least 3 characters.',
                life: 3000
            })
            return
        }

        try {
            await requirementStore.updateRequirement(newData.id, {
                requirement_name: newData.requirement_name.trim()
            })

            await requirementStore.getRequirements()

            toast.add({
                severity: 'success',
                summary: 'Update Successful',
                detail: 'Student Requirement updated successfully!',
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
    }
};

const onRowEditCancel = () => {
    toast.add({
        severity: 'info',
        summary: 'Cancelled',
        detail: 'Student Requirement update cancelled.',
        life: 3000
    })
}
</script>

<template>
    <ContentPane header="Student Requirement" subheader="Configuration">
    <div class="bg-white shadow-xl rounded-md p-5">
        <DataTable  
            v-model:value="requirements" dataKey="id" 
            sortField="requirement_name" :sortOrder="1" removableSort 
            resizableColumns columnResizeMode="fit" showGridlines scrollable 
            v-model:editingRows="editingRows" editMode="row" @row-edit-save="onRowEditSave" @row-edit-cancel="onRowEditCancel"
            :ptOptions="{mergeProps:true}"
            :pt="{
                root: {
                    class: ['flex flex-col justify-between overflow-auto']
                },
                table: {
                    class: 'bg-white border-spacing-0 border-separate',
                },
                thead: {
                    class: 'bg-surface-0 top-0 z-40 sticky'
                },
                tbody: {
                    class: 'sticky z-20'
                },
                column: {
                    headercell: ({ context, props }) => ({
                        class: [
                            'font-medium',
                            {
                                'space-nowrap border-y bg-clip-padding': context.resizable
                            },
                            (props.sortable === '' || props.sortable) && context.sorted ? 'bg-white u-txt-active' : 'bg-white u-txt-active',
                            {
                                'hover:bg-surface-50': context.sorted
                            }
                        ]
                    }),
                    sorticon: ({ context }) => ({
                        class: ['ml-2', context.sorted ? 'u-legend-txt-color dark:text-white/80' : 'u-txt-active dark:text-white/70']
                    }),
                    bodycell: {class: 'py-4 '},
                    roweditorinitbutton: {
                        class: ['relative', 'inline-flex items-center justify-center', 'text-left', 'w-8 h-8', 'border-0 rounded-full', 'u-txt-link', 'border-transparent', 
                        'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50', 'hover:text-surface-700 hover:bg-surface-300/20', 'transition duration-200', 
                        'overflow-hidden', 'cursor-pointer select-none']
                    },
                },
                bodyrow: ({ context, props }) => ({
                    class: [
                        { 'u-bg-pcolor text-surface-100 dark:bg-primary-400/30': context.selected },
                        { 'bg-surface-0 text-surface-600 dark:bg-surface-800': !context.selected },
                        { 'font-bold bg-surface-0 dark:bg-surface-800': props.frozenRow },
                        { 'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-transparent': context.selectable },
                        { 'hover:bg-surface-100 hover:u-txt-active': props.selectionMode && !context.selected },
                        { 'cursor-pointer': props.selectionMode }
                    ]
                })
        }"
        >

        <template #empty> <div class="text-center">No student requirement records found.</div> </template>
        <template #loading> <div class="text-center">Loading student requirement records. Please wait.</div> </template>

        <Column field="requirement_name" header="Student Requirements" sortable>
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" autofocus />
            </template>
        </Column>
        <Column :rowEditor="true" bodyStyle="text-align:center" class="sticky right-0" style="width: 5rem;" />
        <Column style="width: 2rem;">
            <template #body="slotProps">
                <Button icon="fa fa-trash" text rounded severity="danger" @click="deleteRequirement(slotProps.data.id)" />
            </template>
        </Column>
        <template #footer> 
            <Button class="u-txt-link hover:bg-surface-300/20" icon="fa fa-plus" label="Create a Student Requirement" text raised rounded @click="requirementStore.showHideAddRequirementDialog" />
            <AddRequirementDialog />
        </template>
        </DataTable>
    </div>
    </ContentPane>
</template>