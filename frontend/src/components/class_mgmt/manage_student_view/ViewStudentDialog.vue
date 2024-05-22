<script setup>
// Presets
import Dialog from 'primevue/dialog';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Toolbar from 'primevue/toolbar';
import Dropdown from 'primevue/dropdown';
import { ref, watch } from 'vue';

//  stores
import { useClassStore } from '@/stores/class';

const props = defineProps(['data', 'state'])
const emit = defineEmits(['onUpdateDisplay'])
const classStore = useClassStore()
const dialogState = ref()
const student = ref()
const learningStrandInput = ref()
const learningStrands = ref()
const modules = computed(() => learningStrandInput.value ? learningStrandInput.value.modules : null)
const attendances = computed(() => learningStrandInput.value ? learningStrandInput.value.sessions : null)
const activeTab = ref(0)

watch(() => props.data, (data) => {
    classStore.getStudent(data.classLevelId, data.id).then((data) => {
        learningStrands.value = data
    })
})
watch(() => props.state, (data) => dialogState.value = data)
</script>

<template>
    <Dialog v-model:visible="dialogState" modal :style="{ width: '80%', height: '80%' }" 
        @after-hide="() => {
            activeTab = 0
            learningStrandInput = null
            emit('onUpdateDisplay')
        }"
        :pt="{
            content: {
                class: ['h-full']
            }
        }" :ptOptions="{mergeProps: true}" 
    >
        <template #header>
            <div class="ml-4 mt-4">
                <span class="font-bold text-3xl">
                    {{ 
                        props.data.lastName + 
                        (props.data.suffix ? ' ' + props.data.suffix + ', ' : ', ') + 
                        props.data.firstName + ' ' +
                        (props.data.middleName ? props.data.middleName : '')
                    }}
                </span>
                <p class="font-semibold text-lg">{{ props.data.category }}</p>
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
                    <ModuleTable :data="modules" />
                </TabPanel>
                <TabPanel>
                    <template #header>
                        <div class="flex items-center gap-2">
                            <i class="fa fa-star" />
                            <span class="u-txt-active">Grades</span>
                        </div>
                    </template>
                    <GradeTable :data="learningStrands" />
                </TabPanel>
                <TabPanel>
                    <template #header>
                        <div class="flex items-center gap-2">
                            <i class="fa fa-calendar-days" />
                            <span class="u-txt-active">Attendances</span>
                        </div>
                    </template>
                    <AttendanceTable :data="attendances" />
                </TabPanel>
            </TabView>
        </div>
    </Dialog>
</template>