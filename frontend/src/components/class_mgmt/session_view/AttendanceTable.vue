<script setup>
// Presets
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputSwitch from 'primevue/inputswitch'
import Textarea from 'primevue/textarea'
import Tag from 'primevue/tag'
import { computed, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand'

const classLearningStrandStore = useClassLearningStrandStore()

const route = useRoute()
const toast = useToast()
const confirm = useConfirm()
const router = useRouter()

const props = defineProps(['modelValue', 'filters', 'isNotActive'])
const emit = defineEmits(['onUpdate'])
const filters = computed(() => props.filters)
const isNotActive = computed(() => props.isNotActive)
const isFetching = ref(false)
const learners = ref([])
const noChanges = ref(true)
const startingData = []
const updatedData = new Set([])
const leave = ref(true)
const edit = ref(false)

watch(
  () => props.modelValue,
  (data) => {
    isFetching.value = true
    learners.value.length = 0
    startingData.length = 0

    for (const attendance of data) {
      const temp = {
        id: attendance.id,
        lastName: attendance.enrollment.student.lastName,
        firstName: attendance.enrollment.student.firstName,
        middleName: attendance.enrollment.student.middleName,
        status: attendance.status,
        remarks: attendance.remarks,
        updatedAt: new Date(attendance.updatedAt)
      }

      const len = learners.value.push(temp)
      startingData.push(structuredClone(temp))

      watch(learners.value[len - 1], (newData) => {
        updatedData.add(newData)
        leave.value = false
        noChanges.value = false
      })
    }

    isFetching.value = false
  },
  { immediate: true }
)

const getStatusLabel = (status) => {
  switch (status) {
    case 'Present':
      return 'success'

    case 'Absent':
      return 'danger'

    default:
      return null
  }
}

async function updateAttendances() {
  try {
    await classLearningStrandStore.updateAttendances({ updatedData: Array.from(updatedData) })
    classLearningStrandStore.getSession(route.query.id).then((data) => {
      emit('onUpdate', data)
    })

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Updated Grades Successfully',
      life: 5000
    })

    noChanges.value = true
    changeMode()
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  }
}

function resetData() {
  confirm.require({
    message: 'Do you really want to discard the unsaved changes?',
    header: 'Redirect Confirmation',
    accept: async () => {
      learners.value = structuredClone(startingData)
      updatedData.clear()

      for (const datum of learners.value) {
        watch(datum, (newData) => {
          updatedData.add(newData)
          leave.value = false
          noChanges.value = false
        })
      }

      noChanges.value = true
      changeMode()
    }
  })
}

function changeMode() {
  edit.value = !edit.value
  leave.value = !leave.value
}

onBeforeRouteLeave((to) => {
  if (leave.value) {
    return true
  }

  confirm.require({
    message: 'Do you really want to leave? you have unsaved changes!',
    header: 'Redirect Confirmation',
    accept: async () => {
      leave.value = true
      await router.push(to)
    }
  })

  return false
})
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <DataTable
      :value="learners"
      dataKey="id"
      scrollable
      style="overflow: auto"
      sortField="lastName"
      :sortOrder="1"
      removableSort
      v-model:filters="filters"
      :users="['lastName', 'firstName', 'status', 'remarks']"
    >
      <template #empty> <div class="text-center">No records found.</div> </template>
      <template #loading>
        <div class="text-center">Loading class records. Please wait.</div>
      </template>

      <Column field="lastName" header="Last Name" frozen sortable />
      <Column field="firstName" header="First Name" frozen sortable />
      <Column field="middleName" header="Middle Name" />
      <Column field="status" header="Status" sortable>
        <template #body="slotProps" v-if="!edit">
          <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
        </template>
        <template #body="slotProps" v-else>
          <InputSwitch v-model="slotProps.data.status" trueValue="Present" falseValue="Absent" />
        </template>
      </Column>
      <Column field="remarks" header="Remarks" style="width: 20rem">
        <template #body="slotProps" v-if="!edit">
          {{ slotProps.data.remarks }}
        </template>
        <template #body="slotProps" v-else>
          <Textarea v-model="slotProps.data.remarks" rows="5" cols="30" />
        </template>
      </Column>
      <Column field="updatedAt" header="Updated At" style="width: 10rem" sortable>
        <template #body="slotProps">
          {{ slotProps.data.updatedAt.toLocaleString() }}
        </template>
      </Column>
      <template #footer>
        <div class="flex flex-row justify-end items-center">
          <div v-if="edit" class="flex flex-row gap-4">
            <Button
              icon="fa fa-check"
              label="Save"
              aria-label="Save Grades"
              iconClass="['mr-4']"
              size="small"
              rounded
              outlined
              @click="updateAttendances"
            />
            <Button
              icon="fa fa-xmark"
              label="Discard"
              severity="danger"
              aria-label="Discard Changes"
              iconClass="['mr-4']"
              size="small"
              rounded
              outlined
              @click="resetData"
            />
          </div>
          <Button
            v-else-if="!isNotActive"
            icon="fa fa-pencil"
            label="Edit Attendances"
            aria-label="Edit Grades"
            iconClass="['mr-4']"
            size="small"
            rounded
            outlined
            @click="changeMode"
          />
        </div>
      </template>
    </DataTable>
  </div>
</template>

<style></style>
