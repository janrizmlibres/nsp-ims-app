<script setup>
import ContentPane from '@/components/UI/ContentPane.vue';
import AddCategoryDialog from '@/components/utilities_view/AddCategoryDialog.vue';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import { ref, onMounted, computed } from 'vue';

import { useUtilitiesStore } from '@/stores/utilities';

const categoryStore = useUtilitiesStore()
const confirm = useConfirm();
const toast = useToast()

const categories = computed(() => categoryStore.categories)

onMounted(async () => {
    try {
        await categoryStore.getCategories()
    } catch(error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered. Please refresh this page.',
            life: 3000
        })
    } 
})

const confirmDelete = (id) => {
    confirm.require({
        message: '      Are you sure you want to delete this Student Category?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            handleDelete(id)
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Student Category deleted successfully!',
                life: 3000
            })
        }
    });
};

async function handleDelete(id) {
    try {
        await categoryStore.deleteCategory(id)
        await categoryStore.getCategories()
    } catch (error) {
        console.log(error);
    }
}

const editingRows = ref([])

const onRowEditSave = async (event) => {
    let { data, newData } = event;
    if ( JSON.stringify(data) !== JSON.stringify(newData) ) {
        if (!newData.category_name.trim()) {
            toast.add({
                severity: 'error',
                summary: 'Incomplete Form',
                detail: "The field cannot be empty. Please provide a category.",
                life: 3000
            })
            return
        }

        if (categoryStore.categories.some(category => category.category_name === newData.category_name.trim() && category.id !== newData.id)) {
            toast.add({
                severity: 'error',
                summary: 'Duplicate Category',
                detail: "Please provide a unique student category.",
                life: 3000
            })
            return
        }

        if (newData.category_name.trim().length > 100) {
            toast.add({
                severity: 'error',
                summary: 'Category Too Long',
                detail: 'The category should not exceed 100 characters.',
                life: 3000
            })
            return
        }

        if (newData.category_name.trim().length < 3) {
            toast.add({
                severity: 'error',
                summary: 'Category Too Short',
                detail: 'The category should be at least 3 characters.',
                life: 3000
            })
            return
        }
        
        try {
            await categoryStore.updateCategory(newData.id, {
                category_name: newData.category_name.trim()
            })

            await categoryStore.getCategories()

            toast.add({
                severity: 'success',
                summary: 'Update Successful',
                detail: 'Student Category updated successfully!',
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
        detail: 'Student Category update cancelled.',
        life: 3000
    })
}
</script>

<template>
    <ContentPane :breadcrumb="[{label: 'Management'}, {label: 'Student Categories'}]">
    <div class="bg-white shadow-xl rounded-2xl h-full p-5">
        <DataTable
            v-model:value="categories" dataKey="id" 
            sortField="category_name" :sortOrder="1" removableSort 
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
                        class: ['ml-2', context.sorted ? 'u-txt-scolor dark:text-white/80' : 'u-txt-active dark:text-white/70']
                    }),
                    bodycell: {class: 'py-4 '},
                    roweditorinitbutton: {
                        class: ['relative', 'inline-flex items-center justify-center', 'text-left', 'w-8 h-8', 'border-0 rounded-full', 'u-txt-pcolor', 'border-transparent', 
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

        <template #empty> <div class="text-center">No student category records found.</div> </template>
        <template #loading> <div class="text-center">Loading student category records. Please wait.</div> </template>

        <Column field="category_name" header="Student Categories" sortable>
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" autofocus />
            </template>
        </Column>
        <Column :rowEditor="true" bodyStyle="text-align:center" class="sticky right-0" style="width: 5rem;" />
        <Column style="width: 2rem;">
            <template #body="slotProps">
                <Button icon="fa fa-trash" text rounded severity="danger" @click="confirmDelete(slotProps.data.id)" />
            </template>
        </Column>
        <template #footer> 
            <Button class="u-txt-pcolor hover:bg-surface-300/20" icon="fa fa-plus" label="Create a Student Category" text raised rounded @click="categoryStore.showHideAddCategoryDialog" />
            <AddCategoryDialog />
        </template>
        </DataTable>
    </div>
    </ContentPane>
</template>