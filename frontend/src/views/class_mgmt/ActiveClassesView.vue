<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import ActiveClassesTable from '@/components/class_mgmt/create_class_view/ActiveClassesTable.vue'; 

import { ref } from 'vue';

const menu = ref();
const items = ref([
{
        label: 'Grade School',
        route: '/Create Class/Grade School'
    },
    {
        label: 'Junior High School',
        route: '/Create Class/Junior High School'
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};
</script>

<template>
    <ContentPane header="Active Classes">
        <div class="bg-transparent border-none flex justify-between py-2">
            <div class="pt-4 text-surface-600">Select a class</div>
            <div class="relative mr-2">
                <Button type="button" icon="fa fa-plus" label="Add a Class" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
                <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
                    <template #item="{ item, props }">
                        <router-link v-slot="{ href, navigate }" :to="item.route" custom>
                            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                                <span :class="item.icon" />
                                <span class="ml-2">{{ item.label }}</span>
                            </a>
                        </router-link>
                    </template>
                </Menu>
            </div>
        </div>

        <ActiveClassesTable />
    </ContentPane>
</template>