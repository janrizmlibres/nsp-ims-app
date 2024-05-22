<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';
import { ref, watch } from 'vue';

const props = defineProps(['data'])

const grades = ref([])

watch(() => props.data, (data) => {
    grades.value = []
    for (const learningStrand of data) {
        const temp = {
            id: learningStrand.grades[0].id,
            lsCode: learningStrand.learning_strand.code,
            title: learningStrand.learning_strand.name,
            first_quarter: learningStrand.grades[0].first_quarter,
            second_quarter: learningStrand.grades[0].second_quarter,
            third_quarter: learningStrand.grades[0].third_quarter,
            fourth_quarter: learningStrand.grades[0].fourth_quarter,
            remarks: learningStrand.grades[0].remarks,
        }

        grades.value.push(temp)
    }
})
</script>

<template>
    <div class="flex flex-col h-full w-full">
        <DataTable 
            :value="grades" dataKey="id" scrollable style=" overflow: auto;"
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