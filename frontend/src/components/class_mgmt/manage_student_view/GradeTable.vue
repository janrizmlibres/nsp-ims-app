<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';
import { inject } from 'vue';

const studentGrades = inject('studentGrades')
</script>

<template>
    <div class="flex flex-col h-full w-full">
        <DataTable 
            :value="studentGrades" dataKey="id" scrollable style=" overflow: auto;"
            sortField="lsCode" :sortOrder="1" removableSort
        >
            <template #empty> <div class="text-center">No records found.</div> </template>

            <Column field="lsCode" header="Code" />
            <Column field="title" header="Title" />
            <Column field="first_quarter" header="Q1">
                <template #body="slotProps">
                    <Checkbox v-model="slotProps.data.first_quarter" disabled :binary="true" />
                </template>
            </Column>
            <Column field="second_quarter" header="Q2">
                <template #body="slotProps">
                    <Checkbox v-model="slotProps.data.second_quarter" disabled :binary="true" />
                </template>
            </Column>
            <Column field="third_quarter" header="Q3">
                <template #body="slotProps">
                    <Checkbox v-model="slotProps.data.third_quarter" disabled :binary="true" />
                </template>
            </Column>
            <Column field="fourth_quarter" header="Q4">
                <template #body="slotProps">
                    <Checkbox v-model="slotProps.data.fourth_quarter" disabled :binary="true" />
                </template>
            </Column>
            <Column field="remarks" header="Remarks" />
        </DataTable>
    </div>
</template>