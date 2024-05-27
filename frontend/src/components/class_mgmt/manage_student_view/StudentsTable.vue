<script setup>
//Presets
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Dropdown from 'primevue/dropdown';
import Toolbar from 'primevue/toolbar';
import ProgressSpinner from 'primevue/progressspinner';
import { inject, onMounted, provide, ref } from 'vue';
import { useToast } from 'primevue/usetoast';

//Custom
import ViewStudentDialog from './ViewStudentDialog.vue';

//stores
import { useClassStore } from '@/stores/class';

const toast = useToast()

const classStore = useClassStore()

const classLevel = inject('classLevel')
const filters = inject('filters')
const learners = ref([])
const selectedStudent = ref()
const studentDialogState = ref(false)
const isFetching = ref(false)

provide('studentData', selectedStudent)
provide('studentDialogState', studentDialogState)

const columns = ref([
    {field: 'category', header: 'Category'},
    {field: 'civilStatus', header: 'Civil Status'},
    {field: 'contactNum', header: 'Contact Number'},
])

const statuses = ref([
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
    {label: 'Drop', value: 'Drop'},
]);

function updateStudentsTable() {
    isFetching.value = true
    learners.value.length = 0 
    
    classStore.getAllStudents(classLevel.value.id).then((enrollments) => {
        for (const enrollment of enrollments) {
            const temp = {
                id: enrollment.id,
                classLevelId: enrollment.classLevelId,
                dateEnrolled: enrollment.dateEnrolled,
                regularity: enrollment.regularity,
                status: enrollment.status,
                lrn: enrollment.student.lrn,
                lastName: enrollment.student.lastName,
                firstName: enrollment.student.firstName,
                middleName: enrollment.student.middleName,
                suffixName : enrollment.student.suffixName,
                category: enrollment.student.category,
                sex: enrollment.student.personal_info ? enrollment.student.personal_info.sex : null,
                civilStatus: enrollment.student.personal_info ? enrollment.student.personal_info.civilStatus : null,
                contactNum: enrollment.student.contact_info ? enrollment.student.contact_info.contactNum : null,
                birthday: enrollment.student.personal_info ? enrollment.student.personal_info.birthday : null,
                photoUrl: enrollment.student.photoUrl
            }

            learners.value.push(temp)
        }

        isFetching.value = false
    }).catch((error) => {
            toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response.data.message,
            life: 3000
        })

        isFetching.value = false
    })
}

onMounted(() => updateStudentsTable())

const getStatusLabel = (status) => {
    switch (status) {
        case 'Active':
        return 'success'

        case 'Inactive':
        return 'warning'

        case 'Drop':
        return 'danger'

        default:
        return null
    }
}

function viewStudent(student) {
    selectedStudent.value = student
    studentDialogState.value = true
}
</script>

<template>
    <div class="relative flex flex-col h-full">
        <Toolbar class="!rounded-none !border-x-0">
            <template #end>
                <span class="relative float-end">
                    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search" class="pl-10 font-normal w-96"/>
                </span>
            </template>
        </Toolbar>
        <DataTable 
            :value="learners" dataKey="id" scrollable class="shadow-md" :loading="isFetching"
            v-model:filters="filters" filterDisplay="menu"
            :globalFilterFields="['lastName', 'firstName', 'middleName', 'contactNum']"
            sortField="lastName" :sortOrder="1" removableSort
            paginator :rows="10" :rowsPerPageOptions="[10, 20, 30, 50]"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
        >
            <template #loading> <ProgressSpinner class="self-center" /> </template>
            <template #empty> <div class="text-center">No records found.</div> </template>
            
            <template #paginatorstart>
                    <Button type="button" icon="pi pi-refresh" text @click="updateStudentsTable" />
                </template>
                <template #paginatorend>
                    <div></div>
                </template>

            <Column header="Action" :exportable="false" frozen>
                <template #body="slotProps">
                    <Button
                        class="u-bg-scolor hover:u-bg-scolor"
                        label="View"
                        icon="fa-solid fa-eye"
                        rounded
                        raised
                        aria-label="View"
                        size="small"
                        @click="viewStudent(slotProps.data)"
                    />
                </template>
            </Column>
            <Column field="lrn" header="LRN" style="min-width: 12rem;" />
            <Column field="lastName" header="Last Name" style="min-width: 12rem;" />
            <Column field="firstName" header="First Name" style="min-width: 12rem;" />
            <Column field="middleName" header="Middle Name" style="min-width: 12rem;" />
            <Column field="suffix" header="Suffix" style="min-width: 6rem;" />
            <Column field="status" header="Status">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                </template>
                <template #filter="{ filterModel }">
                    <Dropdown v-model="filterModel.value" :options="statuses" optionLabel="label" optionValue="value"  placeholder="Select One" class="p-column-filter" showClear>
                        <template #option="slotProps">
                            <Tag :value="slotProps.option.label" :severity="getStatusLabel(slotProps.option.value)" />
                        </template>
                    </Dropdown>
                </template>
            </Column>
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" style="min-width: 10rem;" />
            <Column field="sex" header="Sex" style="min-width: 6rem;" />
            <Column field="birthday" header="Birthday">
                <template #body="slotProps">
                    {{ slotProps.data.birthday ? new Date(slotProps.data.birthday).toDateString() : slotProps.data.birthday}}
                </template>
            </Column>
            <Column field="dateEnrolled" header="Date Enrolled" style="min-width: 10rem;" />
        </DataTable>
    </div>
    <ViewStudentDialog />
</template>
