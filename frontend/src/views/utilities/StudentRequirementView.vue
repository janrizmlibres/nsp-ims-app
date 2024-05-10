<script setup>
import ContentPane from '@/components/UI/ContentPane.vue';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useToast } from 'primevue/usetoast';
import { ref, watch, onMounted } from 'vue';

import { useUtilitiesStore } from '@/stores/utilities';

const requirementStore = useUtilitiesStore()
const toast = useToast()

const requirements = ref([])
const editingRows = ref([])

const onRowEditSave = async (event) => {
    let { data, newData } = event;
    console.log(newData);
    if ( JSON.stringify(data) !== JSON.stringify(newData) ) {
        try {
            

            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Student Requirement updated successfully!',
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
    }
};

onMounted(async () => {
    try {
        await requirementStore.getRequirements()
        requirements.value = requirementStore.requirements
    } catch(error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered.',
            life: 3000
        })
    } 
})

async function fetchRequirements(data) {
    requirements.value = data
}

watch(() => requirementStore.requirements, fetchRequirements, { immediate: false})
</script>

<template>
    <ContentPane header="Student Requirement" subheader="Configuration">
    <div class="bg-white shadow-xl rounded-md p-5">
        <DataTable  
            v-model:value="requirements" dataKey="id" 
            sortField="requirement_name" :sortOrder="1" removableSort 
            resizableColumns columnResizeMode="fit" showGridlines scrollable 
            v-model:editingRows="editingRows" editMode="row" @row-edit-save="onRowEditSave"
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
        <template #footer> 
            <Button class="u-txt-link" icon="fa fa-plus" label="Create a Student Requirement" text raised rounded/>
        </template>
        </DataTable>
    </div>
    </ContentPane>
</template>