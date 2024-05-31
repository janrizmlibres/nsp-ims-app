<template>
  <Button label="View List" severity="info" class="total-button" @click="visible = !visible" />
  <div class="card flex justify-content-center">
    <Dialog v-model:visible="visible" modal :header="header" :style="{ width: 'auto' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <DataTable :value="values" tableStyle="min-width: 50rem">
        <Column v-for="(column, index) in columns" :key="index" :field="column.field" :header="column.header"></Column>
      </DataTable>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const { values, header } = defineProps({
  values: {
    type: Array,
    required: true
  },
  header: {
    type: String,
    required: true
  }
})

const columns = [
  { field: 'lrn', header: 'LRN' },
  { field: 'fullName', header: 'Full Name' },
  { field: 'status', header: 'Status' }
];

const visible = ref(false);
</script>

<style scoped>
.total-button {
  margin-top: 1.875rem;
  margin-left: 5.625rem;
  background-color: #265492;
  padding: 0.5rem;
  color: white;
  border-radius: 0.625rem;
  font-size: 0.75rem;
}
</style>