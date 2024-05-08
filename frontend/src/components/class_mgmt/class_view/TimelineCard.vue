<script setup>
import Card from 'primevue/card';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const props = defineProps(['data', 'subdata'])
const data = ref(props.data)
const subdata = ref(props.subdata)

function showModule() {
    router.push({ name: 'module-info', query: { id: props.data.id} })
}

const retriDate = ref()
const title = ref()
const learningStrand = ref()

if (data.value != null) {
    let date = new Date(data.value.retrieval_date)
    retriDate.value = date.toDateString()
    title.value = data.value.title
    learningStrand.value = subdata.value.name
}
const customPt = {
    root: {
        class: ['mx-12 rounded-md', 'shadow-md', 'bg-surface-0', 'u-txt-active',
            'hover:cursor-pointer hover:cursor-pointer transition-all duration-500 hover:transform hover:scale-105'
        ]
    },
    body: {
        class: 'p-5 px-8'
    },
    title: {
        class: 'text-md font-semibold mb-2'
    },
    subtitle: {
        class: ['text-sm', 'mb-2', 'text-surface-600 dark:text-surface-0/60']
    },
    content: {
        class: 'py-none'
    },
    footer: {
        class: 'pt-5'
    }
}
</script>

<template>
    <Card 
    @click="showModule"
    :pt="customPt">
    <template #title>{{ retriDate }}</template>
    <template #subtitle>
        <div class="flex flex-row justify-between">
            <div class="flex flex-row">
                <i class="fa-solid fa-file-circle-exclamation fa-lg mr-4 pt-2" />
                <div class="flex flex-col">
                    <p>{{ title }}</p>
                    <p>{{ learningStrand  }}</p>
                </div>
            </div>
            <div>
                View
            </div>
        </div>
    </template>
</Card>
</template>