<script setup>
// Presets
import Dialog from 'primevue/dialog'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Toolbar from 'primevue/toolbar'
import Dropdown from 'primevue/dropdown'
import Avatar from 'primevue/avatar'
import { computed, inject, provide, ref } from 'vue'

import ModuleTable from './ModuleTable.vue'
import GradeTable from './GradeTable.vue'
import AttendanceTable from './AttendanceTable.vue'

//  stores
import { useClassStore } from '@/stores/class'
import { format } from 'date-fns'

const classStore = useClassStore()

const studentData = inject('studentData')
const studentDialogState = inject('studentDialogState')
const learningStrandInput = ref()
const learningStrands = ref()

const studentModules = computed(() =>
  learningStrandInput.value
    ? learningStrandInput.value.modules.reduce((arr, obj) => {
        const modules = arr.concat({
          id: obj.module_submissions[0].id,
          title: obj.title,
          distribution_date: new Date(obj.distribution_date).toDateString(),
          retrieval_date: new Date(obj.retrieval_date).toDateString(),
          status: obj.module_submissions[0].status,
          date_submitted: obj.module_submissions[0].date_submitted
            ? new Date(obj.module_submissions[0].date_submitted).toDateString()
            : null,
          score: obj.module_submissions[0].score,
          remarks: obj.module_submissions[0].remarks
        })

        return modules
      }, [])
    : null
)

const studentGrades = computed(() =>
  learningStrands.value
    ? learningStrands.value.reduce((arr, obj) => {
        const grades = arr.concat({
          id: obj.grades[0].id,
          lsCode: obj.learning_strand.code,
          title: obj.learning_strand.name,
          first_quarter: obj.grades[0].first_quarter,
          second_quarter: obj.grades[0].second_quarter,
          third_quarter: obj.grades[0].third_quarter,
          fourth_quarter: obj.grades[0].fourth_quarter,
          remarks: obj.grades[0].remarks
        })

        return grades
      }, [])
    : null
)

const studentAttendances = computed(() =>
  learningStrandInput.value
    ? learningStrandInput.value.sessions.reduce((arr, obj) => {
        const attendances = arr.concat({
          month: format(new Date(obj.date), 'MMMM yyyy'),
          date: new Date(obj.date).toDateString(),
          status: obj.attendances[0].status,
          attendanceRemarks: obj.attendances[0].remarks,
          sessionRemarks: obj.remarks
        })

        return attendances
      }, [])
    : null
)

const photoUrl = ref()
const isAvatarHovered = ref(false)
const isImgModalVisible = ref(false)
const activeTab = ref(0)

provide('studentModules', studentModules)
provide('studentGrades', studentGrades)
provide('studentAttendances', studentAttendances)

function updateStudentData(data) {
  photoUrl.value = data.photoUrl && import.meta.env.VITE_API_ENDPOINT + `/${data.photoUrl}`

  classStore.getStudent(data.classLevelId, data.id).then((data) => {
    learningStrands.value = data
  })
}

function setAvatarHover(value) {
  isAvatarHovered.value = value
}

function setImageModal(value) {
  isImgModalVisible.value = value
}
</script>

<template>
  <div
    class="fixed flex items-center !z-[999999999] top-0 left-0 w-full h-full overflow-auto bg-black/90"
    :class="isImgModalVisible ? 'block' : 'hidden'"
  >
    <span
      class="absolute top-3.5 right-9 text-5xl font-bold duration-300 text-[#f1f1f1] hover:no-underline hover:cursor-pointer hover:text-[#bbb]"
      @click="setImageModal(false)"
    >
      &times;
    </span>
    <img :src="photoUrl" class="m-auto block w-5/6 max-w-3xl item" />
  </div>
  <Dialog
    v-model:visible="studentDialogState"
    modal
    :draggable="false"
    @show="updateStudentData(studentData)"
    @after-hide="
      () => {
        activeTab = 0
        learningStrandInput = null
      }
    "
    :pt="{
      root: {
        class: ['h-[80%] w-[80%] !rounded-2xl']
      },
      header: {
        class: ['!rounded-t-2xl !items-start']
      },
      content: {
        class: ['h-full !rounded-b-2xl']
      }
    }"
    :ptOptions="{ mergeProps: true }"
  >
    <template #header>
      <div class="flex flex-row gap-4 ml-4 mt-4">
        <div
          class="relative flex items-center hover:cursor-pointer hover:scale-105 transition-transform ease-out duration-300"
          @mouseenter="setAvatarHover(true)"
          @mouseleave="setAvatarHover(false)"
          @click="setImageModal(true)"
        >
          <Avatar
            :image="photoUrl"
            size="xlarge"
            :pt="{
              root: 'w-24 h-24 bg-white shadow-md border-2 rounded'
            }"
            :ptOptions="{ mergeProps: true }"
          />

          <div
            class="absolute w-full h-full flex items-center justify-center transition-opacity ease-in duration-300 bg-white shadow-md border-2 rounded"
            :class="{
              'opacity-0': isAvatarHovered || (photoUrl && !isAvatarHovered),
              'opacity-50': isAvatarHovered && photoUrl
            }"
          >
            <font-awesome-icon icon="fa-solid fa-user" size="lg" />
          </div>
        </div>

        <div>
          <span class="font-bold text-3xl">
            {{
              studentData.lastName +
              (studentData.suffix ? ' ' + studentData.suffix + ', ' : ', ') +
              studentData.firstName +
              ' ' +
              (studentData.middleName ? studentData.middleName : '')
            }}
          </span>
          <p class="font-semibold text-lg">{{ studentData.category }}</p>
        </div>
      </div>
    </template>
    <div class="relative flex flex-col h-full shadow-xl rounded-b-2xl">
      <Toolbar class="!u-gradient-bg-pcolor !rounded-t-2xl !rounded-b-none !border-none">
        <template #end>
          <div v-if="activeTab !== 1" class="flex flex-row gap-4 items-center mr-4">
            <label class="font-semibold text-white">Learning Strand:</label>
            <Dropdown
              v-model="learningStrandInput"
              :options="learningStrands"
              optionLabel="learning_strand.name"
              placeholder="Select a Learning Strand"
              style="width: 20rem"
            />
          </div>
        </template>
      </Toolbar>
      <TabView v-model:activeIndex="activeTab" class="!rounded-b-2xl">
        <TabPanel>
          <template #header>
            <div class="flex items-center gap-2">
              <i class="fa fa-note-sticky" />
              <span class="u-txt-active">Modules</span>
            </div>
          </template>
          <ModuleTable />
        </TabPanel>
        <TabPanel>
          <template #header>
            <div class="flex items-center gap-2">
              <i class="fa fa-star" />
              <span class="u-txt-active">Grades</span>
            </div>
          </template>
          <GradeTable />
        </TabPanel>
        <TabPanel>
          <template #header>
            <div class="flex items-center gap-2">
              <i class="fa fa-calendar-days" />
              <span class="u-txt-active">Attendances</span>
            </div>
          </template>
          <AttendanceTable />
        </TabPanel>
      </TabView>
    </div>
  </Dialog>
</template>
