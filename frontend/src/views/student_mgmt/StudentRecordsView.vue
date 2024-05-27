<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Dropdown from 'primevue/dropdown'

import ContentPane from '@/components/UI/ContentPane.vue'
import StudentHeader from '@/components/student_mgmt/StudentHeader.vue'

import { useStudentsStore } from '@/stores/students'
import { useUtilitiesStore } from '@/stores/utilities'

import { onMounted, ref, computed } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'

const studentsStore = useStudentsStore()
const utilitiesStore = useUtilitiesStore()

const dt = ref(null)
const filters = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } })
const sexValues = ref(['M', 'F'])
const categories = computed(() => utilitiesStore.categories.map((cat) => cat.category_name))

const columns = [
  { field: 'lrn', header: 'LRN' },
  { field: 'firstName', header: 'First Name' },
  { field: 'lastName', header: 'Last Name' },
  { field: 'sex', header: 'Sex' },
  { field: 'contactNum', header: 'Contact Number' },
  { field: 'category', header: 'Category' }
]

function updateGlobalFilter(newValue) {
  filters.value.global.value = newValue
}

function initFilters() {
  filters.value.sex = { value: null, matchMode: FilterMatchMode.EQUALS }
  filters.value.category = {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
  }
}

const clearFilter = () => initFilters()
initFilters()

onMounted(async () => {
  try {
    await studentsStore.getStudents()
    await utilitiesStore.getCategories()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <ContentPane :breadcrumb="[{label: 'Records'}, {label: 'Students'}]">
    <StudentHeader
      :dt="dt"
      :globalFilter="filters.global.value"
      @filterChanged="updateGlobalFilter"
    />

    <Card :pt="{ content: 'h-full', body: 'h-full px-4 pt-1' }" class="!rounded-2xl h-full overflow-hidden inline-block">
      <template #content>
        <DataTable
          ref="dt"
          :value="studentsStore.studentsNormalized"
          v-model:filters="filters"
          dataKey="id"
          filterDisplay="menu"
          paginator :rows="15" :rowsPerPageOptions="[15, 20, 30, 50]"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          :globalFilterFields="['lrn', 'firstName', 'lastName']"
          scrollable
          removableSort
        >
          <template #header>
            <Button
              class="u-txt-pcolor hover:text-white hover:u-bg-pcolor-2"
              type="button"
              icon="pi pi-filter-slash"
              label="Clear"
              text
              size="small"
              @click="clearFilter"
            />
          </template>

          <template #empty> No students found. </template>
          <template #loading> Loading students data. Please wait. </template>

          <Column header="" class="max-w-24">
            <template #body="slotProps">
              <RouterLink :to="{ name: 'view-student', params: { studentId: slotProps.data.id } }">
                <Button
                  class="u-bg-scolor hover:u-bg-scolor"
                  label="View"
                  icon="fa-solid fa-eye"
                  rounded
                  raised
                  aria-label="View"
                  size="small"
                />
                <!-- <Button icon="fa-solid fa-eye" text rounded aria-label="View" /> -->
              </RouterLink>
            </template>
          </Column>

          <template v-for="col of columns" :key="col.field">
            <Column
              v-if="!['sex', 'category'].includes(col.field)"
              :field="col.field"
              :header="col.header"
              sortable
            ></Column>
            <Column v-else :field="col.field" :header="col.header" sortable>
              <template #filter="{ filterModel }">
                <Dropdown
                  v-model="filterModel.value"
                  :options="col.field === 'category' ? categories : sexValues"
                  placeholder="Select One"
                  class="p-column-filter"
                  style="min-width: 12rem"
                  :showClear="true"
                />
              </template>
            </Column>
          </template>

          <template #footer>
            <span class="font-medium">
              Record(s) count:
              <span class="u-txt-red">
                {{ studentsStore.students.length }}
              </span>
            </span>
          </template>
        </DataTable>
      </template>
    </Card>
  </ContentPane>
</template>
