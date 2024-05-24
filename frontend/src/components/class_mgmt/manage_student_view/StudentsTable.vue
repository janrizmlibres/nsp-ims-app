<script setup>
//Presets
import Toolbar from 'primevue/toolbar';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Dropdown from 'primevue/dropdown';
import { inject, onMounted, provide, ref } from 'vue';

//Custom
import ViewStudentDialog from './ViewStudentDialog.vue';

//stores
import { useClassStore } from '@/stores/class';

const classStore = useClassStore()

const classLevel = inject('classLevel')
const filters = inject('filters')
const learners = ref([])
const selectedStudent = ref()

const studentDialogState = ref(false)

provide('studentData', selectedStudent)
provide('studentDialogState', studentDialogState)

const nameColumns = ref([
    {field: 'lrn', header: 'LRN'},
    {field: 'lastName', header: 'Last Name'},
    {field: 'firstName', header: 'First Name'},
    {field: 'middleName', header: 'Middle Name'},
    {field: 'suffix', header: 'Suffix'},
])

const otherColumns = ref([
    {field: 'category', header: 'Category'},
    {field: 'sex', header: 'Sex'},
    {field: 'civilStatus', header: 'Civil Status'},
    {field: 'contactNum', header: 'Contact Number'},
])

const statuses = ref([
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
    {label: 'Drop', value: 'Drop'},
]);

onMounted(() => {
    classStore.getAllStudents(classLevel.value.id).then((data) => {
        for (const enrollment of data) {
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
    })
})

const getStatusLabel = (status) => {
    switch (status) {
        case 'Active':
            return 'success';

        case 'Inactive':
            return 'warning';

        case 'Drop':
            return 'danger';

        default:
            return null;
    }
};

function showStudentDialog() {
    studentDialogState.value = !studentDialogState.value
}

function viewStudent(student) {
    selectedStudent.value = student
    showStudentDialog()
}
</script>

<template>
    <div class="relative flex flex-col h-full">
        <Toolbar class="!p-2">
            <template #end>
                <span class="relative">
                    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search"  class="pl-10 font-normal" />
                </span>
            </template>
        </Toolbar>
        <DataTable 
            :value="learners" dataKey="id" scrollable style=" overflow: auto;"
            v-model:filters="filters" filterDisplay="menu"
            :globalFilterFields="['lastName', 'firstName', 'middleName', 'contactNum']"
            sortField="lastName" :sortOrder="1" removableSort
        >
            <template #empty> <div class="text-center">No records found.</div> </template>

            <Column :exportable="false" style="width:2rem">
                <template #body="slotProps">
                    <Button icon="fa fa-eye" label="view" text @click="viewStudent(slotProps.data)" />
                </template>
            </Column>
            <Column v-for="col of nameColumns" :key="col.field" :field="col.field" :header="col.header" sortable />
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
            <Column v-for="col of otherColumns" :key="col.field" :field="col.field" :header="col.header" />
            <Column field="birthday" header="Birthday">
                <template #body="slotProps">
                    {{ slotProps.data.birthday ? new Date(slotProps.data.birthday).toDateString() : slotProps.data.birthday}}
                </template>
            </Column>
            <Column field="dateEnrolled" header="Date Enrolled" />
        </DataTable>
    </div>
    <ViewStudentDialog />
</template>