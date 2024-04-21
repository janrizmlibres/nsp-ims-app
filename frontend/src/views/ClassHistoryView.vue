
<script setup>
import { ref, onMounted, reactive } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import { ProductService } from '@/service/ProductService';


const state = reactive({
  yearList: [],
  expandedRows: {}
})

onMounted(() => {
    state.yearList = years.value;
});

const years = ref([
    {
        id: 1,
        batchnumber: '7',
        academicyear: '2022-2023',
        startdate: 'August 01, 2022',
        enddate: 'May 31, 2023',
        schoollevels: 
            [
                {
                    id: '1001-1',
                    schoollevel: 'Grade School',
                    totalstudents: 12,
                    active: 10,
                    inactive: 1,
                    drop: 1
                },
                {
                    id: '1001-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 9,
                    active: 4,
                    inactive: 4,
                    drop: 1
                }
            ]
    },
    {
        id: 2,
        batchnumber: '8',
        academicyear: '2023-2024',
        startdate: 'August 01, 2023',
        enddate: 'May 31, 2024',
        schoollevels: 
            [
                {
                    id: '1002-1',
                    schoollevel: 'Grade School',
                    totalstudents: 13,
                    active: 10,
                    inactive: 2,
                    drop: 1
                },
                {
                    id: '1002-2',
                    schoollevel: 'Junior High School',
                    totalstudents: 20,
                    active: 13,
                    inactive: 4,
                    drop: 3
                }
            ]
    }
]);
</script>

<template>
    <div class="card u-max-height bg-surface-100 shadow-xl">
        <DataTable v-model:expandedRows="state.expandedRows" :value="state.yearList" dataKey="id"
                @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" tableStyle="min-width: 60rem">
            <Column expander style="width: 5rem" />
            <Column field="batchnumber" header="Batch Number" sortable></Column>
            <Column field="academicyear" header="Academic Year" sortable></Column>
            <Column field="startdate" header="Start Date" sortable></Column>
            <Column field="enddate" header="End Date" sortable></Column>
            <template #expansion="slotProps">
                <div class="p-3">
                    <h5>Classes of Academic Year {{ slotProps.data.academicyear }}</h5>
                    <DataTable :value="slotProps.data.schoollevels">
                        <Column field="id" header="Id" sortable></Column>
                        <Column field="schoollevel" header="School Level" sortable></Column>
                        <Column field="active" header="Active" sortable>
                        </Column>
                        <Column field="inactive" header="Inactive" sortable>
                        </Column>
                        <Column field="drop" header="Drop" sortable>
                        </Column>
                        <Column field="totalstudents" header="Total Students" sortable></Column>
                        <Column headerStyle="width:4rem">
                            <template #body>
                                <Button icon="pi pi-search" />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </DataTable>
        <Toast />
    </div>
</template>

<!-- <template>
    <div class="u-max-height bg-surface-100 shadow-lg">
        <h1>Class History Page</h1>
    </div>
</template> -->

<style scoped>
    .u-max-height {
        height: calc(100vh - var(--topbar-max-height) - 2rem);
    }
</style>