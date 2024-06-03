<script setup>
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner'
import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps(['data'])

const router = useRouter()

const isLoading = inject('isLoading')
const selectedData = inject('selectedData')

const dataOptions = ref(['Students', 'Enrollments', 'Volunteers'])
const dataset = computed(() => props.data)

const changeDataset = inject('changeDataset')
const onReset = inject('resetQuickViewTable')

function goToStudentRecords() {
    router.push({ name:'student-records'})
}

function goToEnrollmentRecords() {
    router.push({ name:'enrollment-history'})
}

function goToVolunteerRecords() {
    router.push({ name:'volunteer-records'})
}
</script>

<template>
    <Card class="!rounded-2xl shadow-2xl row-span-4 u-border-bottom"
        :pt="{root:{class:['h-full flex flex-col overflow-hidden']}, body: {class: ['grow overflow-hidden']}, content: {class:['flex flex-col h-full !py-0 overflow-hidden']}, header:{class:['u-bg-teal px-4 pt-4 pb-2']}}" :ptOptions="{mergeProps: true}"
    >
        <template #header>
            <div class="flex flex-row justify-between">
                <label class="text-white text-lg font-semibold">Quick View</label>
                <Button icon="fa fa-rotate-left" raised class="bg-white hover:bg-white u-txt-active !rounded-full mb-2" @click="onReset" />
            </div>
        </template>
        <template #content>
            <span class="flex flex-col justify-end mb-2">
                <small>Dataset</small>
                <Dropdown v-model="selectedData" :options="dataOptions" placeholder="Select a dataset..." @update:modelValue="changeDataset" />
            </span>
            <ProgressSpinner v-if="isLoading" class="h-full flex justify-center" />
            <DataTable
                v-else-if="!isLoading && selectedData === 'Students'"
                :value="dataset ? dataset.students : []" removableSort 
            >
                <template #empty> <div class="text-center">No records found.</div> </template>

                <Column field="fullname" header="Name" sortable />
                <Column field="category" header="Category" sortable />
                <Column field="personal_info.sex" header="Sex" sortable />
                <template #footer>
                    <Button
                        class="u-bg-scolor hover:u-bg-scolor float-end"
                        label="View Details"
                        icon="fa-solid fa-eye"
                        rounded
                        raised
                        aria-label="View Details"
                        size="small"
                        @click="goToStudentRecords"
                    />
                </template>
            </DataTable>
            <DataTable
                v-else-if="!isLoading && selectedData === 'Enrollments'"
                :value="dataset ? dataset.enrollments : []" removableSort 
                scrollable
            >
                <template #empty> <div class="text-center">No records found.</div> </template>

                <Column field="student.fullname" header="Name" sortable />
                <Column field="class_level.school_level" header="School Level" sortable />
                <Column field="student.personal_info.sex" header="Sex" sortable />

                <template #footer>
                    <Button
                        class="u-bg-scolor hover:u-bg-scolor float-end"
                        label="View Details"
                        icon="fa-solid fa-eye"
                        rounded
                        raised
                        aria-label="View Details"
                        size="small"
                        @click="goToEnrollmentRecords"
                    />
                </template>
            </DataTable>
            <DataTable
                v-else-if="!isLoading && selectedData === 'Volunteers'"
                :value="dataset ? dataset.volunteers : []" removableSort 
            >
                <template #empty> <div class="text-center">No records found.</div> </template>

                <Column field="fullname" header="Name" sortable />
                <Column field="affiliation" header="Affiliation" sortable />
                <Column field="volunteer_personal_information.sex" header="Sex" sortable />
                <template #footer>
                    <Button
                        class="u-bg-scolor hover:u-bg-scolor float-end"
                        label="View Details"
                        icon="fa-solid fa-eye"
                        rounded
                        raised
                        aria-label="View Details"
                        size="small"
                        @click="goToVolunteerRecords"
                    />
                </template>
            </DataTable>
        </template>
    </Card>
</template>