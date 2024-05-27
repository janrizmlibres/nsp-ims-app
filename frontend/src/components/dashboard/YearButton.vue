<template>
  <Button type="button" icon="fa fa-filter" label="Year" class="bg-white border-none float-end" @click="toggle"
      :pt="buttonPt"
    />
    <OverlayPanel ref="op"
      :pt="{
        content: {
            class: 'p-3 px-2 items-center flex'
        },
      }">
      <ul class="flex flex-col gap-2">
        <li v-for="term of termsOptions" :key="term.id">
          <span class="p-2 py-1 rounded-md hover:bg-surface-200 transition-all duration-500 ease-in-out cursor-pointer"
            @click="toggle"
          >
            {{ term.academic_year }}
          </span>
        </li>
      </ul>
    </OverlayPanel>
</template>

<script setup>
import { computed, ref } from "vue";
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';
import { useUtilitiesStore } from "@/stores/utilities";

const utilitiesStore = useUtilitiesStore()

const termsOptions = computed(() => utilitiesStore.terms)
const selectedTerm = ref(termsOptions.value.find(term => term.status === true))
const op = ref();
const toggle = (event) => {
    op.value.toggle(event);
}

const buttonPt = ref({
  root: {
    class: ['u-txt-active p-2 rounded-md hover:bg-primary hover:text-white shadow-md']
  }
})
</script>

<style>
</style>