<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

import { useStaffsStore } from '@/stores/staffs'
import { onBeforeMount, ref } from 'vue'
import { RouterLink } from 'vue-router'

const custom_pt = {
  root: {
    class: ['flex flex-col h-full pt-2 justify-between overflow-auto']
  },
  column: {
    headercell: ({ context, props }) => ({
      class: [
        'font-medium',
        {
          'space-nowrap border-y bg-clip-padding': context.resizable
          // Resizable
        },
        // Color
        (props.sortable === '' || props.sortable) && context.sorted
          ? 'bg-white u-txt-active'
          : 'bg-white u-txt-active',
        { 'hover:bg-surface-50': context.sorted }
      ]
    }),
    sorticon: ({ context }) => ({
      class: [
        'ml-2',
        context.sorted ? 'u-legend-txt-color dark:text-white/80' : 'u-txt-active dark:text-white/70'
      ]
    }),
    bodycell: { class: 'py-3 ' }
  },
  bodyrow: ({ context, props }) => ({
    class: [
      { 'u-bg-pcolor text-surface-100 dark:bg-primary-400/30': context.selected },
      { 'bg-surface-0 text-surface-600 dark:bg-surface-800': !context.selected },
      { 'font-bold bg-surface-0 dark:bg-surface-800': props.frozenRow },
      // State
      {
        'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-transparent':
          context.selectable
      },
      { 'hover:bg-surface-100 hover:u-txt-active': props.selectionMode && !context.selected },
      // Misc
      { 'cursor-pointer': props.selectionMode }
    ]
  }),
  rowexpansion: {
    class: 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-white/80 flex-1'
  },
  paginator: {
    root: {
      class: [
        'flex items-center justify-center flex-wrap object-bottom',
        'px-4 pt-4 pb-2',
        'border-0 rounded-bl-xl rounded-br-xl',
        'bg-transparent dark:bg-surface-800',
        'text-surface-500 dark:text-white/60'
      ]
    },
    pagebutton: ({ context }) => ({
      class: [
        'relative',
        // Flex & Alignment
        'inline-flex items-center justify-center',
        // Shape
        'border-0 rounded-full dark:rounded-md',
        // Size
        'min-w-[3rem] h-12 m-[0.143rem]',
        'leading-none',
        // Color
        'text-surface-500 dark:text-white/80',
        {
          'u-bg-scolor-2 border-primary-50 text-white font-semibold': context.active
        },
        // State
        {
          'hover:bg-surface-50': !context.disabled && !context.active,
          'focus:u-ring-scolor': !context.disabled
        }
      ]
    })
  }
}
</script>