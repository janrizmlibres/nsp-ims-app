<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import ActiveClassesTable from '@/components/class_mgmt/create_class_view/ActiveClassesTable.vue';
import { useToast } from 'primevue/usetoast'; 
import { useTermStore } from '@/stores/term';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import axios from 'axios';

const termStore = useTermStore()
const authStore = useAuthStore
const toast = useToast()

const data = ref(termStore.active_year.class_levels)
const menu = ref();
const items = ref([
    {
        label: 'Grade School',
        command: () => {
            add_class({
                school_level: 'Grade School'
            })
        }
    },
    {
        label: 'Junior High School',
        command: () => {
            add_class({
                school_level: 'Junior High School'
            })
        }
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};

async function add_class(form) {
    try {
        const result = await axios.post(
        'http://localhost:8080/term/add_class',
        { ...form },
        {
            headers: { Authorization: 'Bearer ' + authStore.token }
        }
        )
        console.log(result.data.message)
        toast.add({
            severity: 'success',
            summary: 'Class Added',
            detail: 'Added a Class Successfully',
            life: 3000
        })
        
        try {
            const result = await axios.get('http://localhost:8080/term/active_year', {
                headers: { Authorization: 'Bearer ' + authStore.token }
            })
            console.log(result.data.data)
            termStore.setActiveYear(result.data.data)
        } catch (error) {
            console.log(error.response.data.message)
            toast.add({
                severity: 'error',
                summary: 'Error Parsing Active Year',
                detail: error.response.data.message,
                life: 3000
            })
        }
    } catch (error) {
        console.log(error)
        toast.add({
            severity: 'error',
            summary: 'Failed to Add Class',
            detail: error.response.data.message,
            life: 3000
        })
    }
}
</script>

<template>
    <ContentPane header="Active Classes">
        <div class="bg-transparent border-none flex justify-between pb-4">
            <div class="pt-4 text-surface-600">Select a class</div>
            <div class="relative mr-2">
                <Button type="button" icon="fa fa-plus" label="Add a Class" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
                <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
            </div>
        </div>

        <div class="bg-white shadow-xl rounded-md p-5">
            <ActiveClassesTable :data="termStore.active_year.class_levels" />
        </div>
    </ContentPane>
</template>