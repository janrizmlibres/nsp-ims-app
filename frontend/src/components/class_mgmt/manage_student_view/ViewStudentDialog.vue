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

watch(() => props.data, (data) => {
    classStore.getStudent(data.classLevelId, data.id).then((data) => {
        student.value = data
        console.log(student.value);
    })
})
watch(() => props.state, (data) => dialogState.value = data)
</script>

<template>
    <Dialog v-model:visible="dialogState" modal :style="{ width: '80%', height: '80%' }" @after-hide="emit('onUpdateDisplay')"
        :pt="{
            content: {
                class: ['h-full']
            }
        }" :ptOptions="{mergeProps: true}" 
    >
        <template #header>
            <div class="flex flex-col gap-2 ml-4 mt-4">
                <span class="font-bold text-3xl">{{ props.data.lastName + (props.data.suffix ? ' ' + props.data.suffix + ',' : ',') }}</span>
                <p class="font-bold text-xl">{{ 
                    props.data.firstName + 
                    (props.data.middleName ? ', ' + props.data.middleName + ' ' : '') }}</p>
            </div>
        </template>
        <div class="relative flex flex-col h-full">
            <Toolbar class="!p-2">
                <template #end>
                    <div class="flex flex-row gap-4 items-center mr-4">
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
                </TabPanel>
                <TabPanel>
                    <template #header>
                        <div class="flex items-center gap-2">
                            <i class="fa fa-calendar-days" />
                            <span class="u-txt-active">Attendances</span>
                        </div>
                    </template>
                </TabPanel>
            </TabView>
        </div>
    </Dialog>
</template>