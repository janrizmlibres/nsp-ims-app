<script setup>
import Breadcrumb from 'primevue/breadcrumb'

// import { ref } from "vue";

// const home = ref({
//     icon: 'pi pi-home',
//     route: '/introduction'
// });
// const items = ref([
//     { label: 'Components' },
//     { label: 'Form' },
//     { label: 'InputText', route: '/inputtext' }
// ]);
</script>

<template>
  <div class="card flex justify-content-center">
    <Breadcrumb>
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="[item.icon, 'text-color']" />
            <span class="text-primary font-semibold">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span class="text-color">{{ item.label }}</span>
        </a>
      </template>
    </Breadcrumb>
  </div>
</template>
