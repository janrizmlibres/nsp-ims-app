<template>
  <div>
    <div class="h-fit flex place-items-center bg-white rounded-md shadow-xl p-2 px-4 mb-2 gap-5">
      <p>A.Y.</p>
      <Dropdown v-model="selectedTerm" :options="termsOptions" optionLabel="academic_year" placeholder="Academic Year" class="w-auto"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from 'primevue/button';
import { useTermStore } from '@/stores/term.js'
import Dropdown from 'primevue/dropdown';

const termStore = useTermStore()
const selectedTerm = ref(null)
const termsOptions = ref([])

const showDropdown = ref(false);
const selectedYear = ref();
const years = ref([
  { name: '2010-2011', code: '2010-2011' },
  { name: '2011-2012', code: '2011-2012' },
  { name: '2012-2013', code: '2012-2013' },
  { name: '2013-2014', code: '2013-2014' },
  { name: '2014-2015', code: '2014-2015' },
  { name: '2015-2016', code: '2015-2016' },
  { name: '2016-2017', code: '2016-2017' },
  { name: '2017-2018', code: '2017-2018' },
  { name: '2018-2019', code: '2018-2019' },
  { name: '2019-2020', code: '2019-2020' },
  { name: '2020-2021', code: '2020-2021' },
  { name: '2021-2022', code: '2021-2022' },
  { name: '2022-2023', code: '2022-2023' },
  { name: '2023-2024', code: '2023-2024' }
]);

async function getAllTerms()  {
  try {
    await termStore.getTerms()
    termsOptions.value = termStore.terms
    
    if (enrollmentStore.editedTerm) {
      selectedTerm.value = termStore.terms.find(term => term.academic_year === enrollmentStore.editedTerm)
      enrollmentStore.setEditedTerm(null)
    } else  {
      selectedTerm.value = termStore.terms[termStore.terms.length - 1]
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  }
}

getAllTerms()
</script>

<style scoped>
.button {
  background-color: white;
  color: black;
  padding: 0.625rem;
  cursor: pointer;
  border-radius: 0.625rem;
  width: 6rem;
}

/* New CSS class for Listbox highlight */
.custom-listbox .p-highlight {
  background-color: #265492;
}
</style>