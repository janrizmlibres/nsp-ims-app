<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import ToggleButton from 'primevue/togglebutton'
import { computed, ref } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import { useEnrollmentStore } from '@/stores/enrollment.js'

const enrollmentStore = useEnrollmentStore()

const learnersData = computed(() => enrollmentStore.learners)

const getSeverity = (data) => {
  switch (data) {
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

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  lrn: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  lastName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  firstName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  middleName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  schoolLevel: { value: null, matchMode: FilterMatchMode.EQUALS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const statuses = ref(['Active', 'Inactive', 'Drop']);
const schoolLevels = ref(['Grade School', 'Junior High School'])

</script>

<template>
  <DataTable v-model:filters="filters" 
             :value="learnersData" paginator 
             :rows="10" dataKey="id" 
             filterDisplay="menu"
             :globalFilterFields="['lrn', 'lastName', 'firstName', 'middleName', 'schoolLevel', 'status']" 
             removableSort> 
    <column field="lrn" header="LRN" sortable>
      <template #body="{ data }">
        {{ data.lrn }}
      </template>
      <template #filter="{ filterModel }">
        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
      </template>
    </column>
    <column field="lastName" header="Last Name" sortable>
      <template #body="{ data }">
        {{ data.lastName }}
      </template>
      <template #filter="{ filterModel }">
        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
      </template>
    </column>
    <column field="firstName" header="First Name" sortable>
      <template #body="{ data }">
        {{ data.firstName }}
      </template>
      <template #filter="{ filterModel }">
        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
      </template>
    </column>
    <column field="middleName" header="Middle Name" sortable>
      <template #body="{ data }">
        {{ data.middleName }}
      </template>
      <template #filter="{ filterModel }">
        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
      </template>
    </column>
    <column header="School Level" filterField="schoolLevel" :showFilterMatchModes="false" :filterMenuStyle="{ width: '9rem' }" style="min-width: 9rem">
      <template #body="{ data }">
        <div class="flex align-items-center gap-2">
          <span>{{ data.schoolLevel }}</span>
        </div>
      </template>
      <template #filter="{ filterModel }">
        <Dropdown v-model="filterModel.value" :options="schoolLevels" placeholder="Select One" class="p-column-filter">
          <template #option="slotProps">
            <div class="flex align-items-center gap-2">
              <span>{{ slotProps.option }}</span>
            </div>
          </template>
        </Dropdown>
      </template>
    </column>
    <column field="dateEnrolled" header="Date Enrolled" sortable></column>
    <Column header="Status" filterField="status" :showFilterMatchModes="false" :filterMenuStyle="{ width: '7rem' }" style="min-width: 7rem">
      <template #body="{ data }">
        <div class="flex align-items-center gap-2">
          <Tag :value="data.status" :severity="getSeverity(data.status)" />
        </div>
      </template>
      <template #filter="{ filterModel }">
        <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Select One" class="p-column-filter">
          <template #option="slotProps">
            <div class="flex align-items-center gap-2">
              <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
            </div>
          </template>
        </Dropdown>
      </template>
    </Column>
    <Column headerStyle="width: 5rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
      <template #body="{ data }">
        <Button icon="pi pi-pencil" label="Edit" @click="editEnrolled(data)"/>
      </template>
    </Column>
    <Column headerStyle="width: 5rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
      <template #body>
        <Button type="button" icon="pi pi-angle-down" label="Drop" />
      </template>
    </Column>
    <Column headerStyle="width: 5rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
      <template #body>
        <ToggleButton onLabel="Activate" offLabel="Deactivate" icon="pi pi-angle-down" label="Drop" />
      </template>
    </Column>
  </DataTable>
</template>