<script setup>
// Presets
import Dialog from 'primevue/dialog';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Toolbar from 'primevue/toolbar';
import Dropdown from 'primevue/dropdown';
import Avatar from 'primevue/avatar';
import { computed, inject, provide, ref, watch } from 'vue';

import ModuleTable from './ModuleTable.vue';
import GradeTable from './GradeTable.vue';
import AttendanceTable from './AttendanceTable.vue';

//  stores
import { useClassStore } from '@/stores/class';

const classStore = useClassStore()

const studentData = inject('studentData')
const studentDialogState = inject('studentDialogState')
const learningStrandInput = ref()
const learningStrands = ref()
const studentModules = computed(() => learningStrandInput.value ? learningStrandInput.value.modules : null)
const studentAttendances = computed(() => learningStrandInput.value ? learningStrandInput.value.sessions : null)
const photoUrl = ref()

const activeTab = ref(0)

provide('studentGrades', learningStrands)
provide('studentModules', studentModules)
provide('studentAttendances', studentAttendances)

watch(() => studentData.value, (data) => {
    photoUrl.value = data.photoUrl && `http://localhost:8080/${data.photoUrl}`

    classStore.getStudent(data.classLevelId, data.id).then((data) => {
        learningStrands.value = data
    })
})
</script>

<template>
    <Dialog v-model:visible="studentDialogState" modal :style="{ width: '80%', height: '80%' }" :draggable="false"
        @after-hide="() => {
            activeTab = 0
            learningStrandInput = null
        }"
        :pt="{
            content: {
                class: ['h-full']
            }
        }" :ptOptions="{mergeProps: true}" 
    >
        <template #header>
            <div class="flex flex-row ml-4 mt-4">
                <Avatar :image="photoUrl" size="xlarge"
                    :pt="{
                        root: 'bg-white shadow-md border-2 rounded mr-4'
                    }" :ptOptions="{ mergeProps: true }"
                />
                <div>
                    <span class="font-bold text-3xl">
                        {{ 
                            studentData.lastName + 
                            (studentData.suffix ? ' ' + studentData.suffix + ', ' : ', ') + 
                            studentData.firstName + ' ' +
                            (studentData.middleName ? studentData.middleName : '')
                        }}
                    </span>
                    <p class="font-semibold text-lg">{{ studentData.category }}</p>
                </div>
            </div>
        </template>
        <div class="relative flex flex-col h-full shadow-xl">
            <Toolbar class="!p-2 h-16">
                <template #end>
                    <div v-if="activeTab !== 1" class="flex flex-row gap-4 items-center mr-4">
                        <label class="font-semibold">Learning Strand:</label>
                        <Dropdown v-model="learningStrandInput" :options="learningStrands" optionLabel="learning_strand.name" placeholder="Select a Learning Strand" style="width: 20rem;" /> 
                    </div>
                </template>
            </Toolbar>
            <TabView v-model:activeIndex="activeTab">
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