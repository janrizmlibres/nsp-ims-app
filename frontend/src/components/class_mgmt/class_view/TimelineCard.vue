<script setup>
import Card from 'primevue/card';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const props = defineProps(['data'])
const data = ref(props.data)

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
    learningStrand.value = data.value.class_learning_strand.learning_strand.name
}
const customPt = {
    root: {
        class: ['rounded-md', 'shadow-md', 'bg-surface-0', 'u-txt-active', 'hover: hover:bg-surface-100 hover:cursor-pointer transition-all duration-500']
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