import { usePassThrough } from 'primevue/passthrough'
import lara from '@/presets/lara'

const customPreset = usePassThrough(
  lara,
  {
    inputtext: {
      root: ({ props, context }) => {
        return {
          class: [
            { 'u-input-text-hover dark:u-input-text-hover': !props.invalid },
            // Invalid State
            { 'u-input-text-error dark:u-input-text-error': props.invalid },
            // States
            {
              'hover:u-input-text-hover dark:hover:u-input-text-hover':
                !context.disabled && !props.invalid,
              'focus:outline-none focus:outline-offset-0 focus:ring focus:u-input-text-focus dark:focus:u-input-text-focus focus:z-10':
                !context.disabled,
              'opacity-60 select-none pointer-events-none cursor-default': context.disabled
            }
          ]
        }
      }
    },
    datatable: {
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
            (props.sortable === '' || props.sortable) && context.sorted ? 'bg-white u-txt-active' : 'bg-white u-txt-active',
            {'hover:bg-surface-50': context.sorted}
          ]
        }),
        sorticon: ({ context }) => ({
          class: ['ml-2', context.sorted ? 'u-legend-txt-color dark:text-white/80' : 'u-txt-active dark:text-white/70']
        }),
        bodycell: {class: 'py-3 '}
      },
      bodyrow: ({ context, props }) => ({
        class: [
          { 'u-bg-pcolor text-surface-100 dark:bg-primary-400/30': context.selected },
          { 'bg-surface-0 text-surface-600 dark:bg-surface-800': !context.selected },
          { 'font-bold bg-surface-0 dark:bg-surface-800': props.frozenRow },
          // State
          { 'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-transparent': context.selectable },
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
          class: ['flex items-center justify-center flex-wrap object-bottom', 'px-4 pt-4 pb-2', 'border-0 rounded-bl-xl rounded-br-xl', 'bg-transparent dark:bg-surface-800', 'text-surface-500 dark:text-white/60']
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
            },
          ]
        }),
      }
    },
    // Added All of Pass Through Parameters of password because it won't work if it is not all, this might be a bug from Primevue itself.
    password: {
      root: ({ props }) => ({
        class: [
          'inline-flex relative',
          {
            'opacity-60 select-none pointer-events-none cursor-default': props.disabled
          },
          { '[&>input]:pr-10': props.toggleMask }
        ]
      }),
      panel: {
        class: ['p-5', 'border-0 dark:border', 'shadow-md rounded-md', 'bg-surface-0 dark:bg-surface-900', 'text-surface-700 dark:text-white/80', 'dark:border-surface-700']
      },
      meter: {
        class: ['overflow-hidden', 'relative', 'border-0', 'h-3', 'mb-2', 'bg-surface-100 dark:bg-surface-700']
      },
      meterlabel: ({ instance }) => {
        var _a, _b, _c;
        return {
          class: [
            // Size
            'h-full',
            // Colors
            {
              'bg-red-500 dark:bg-red-400/50': ((_a = instance == null ? void 0 : instance.meter) == null ? void 0 : _a.strength) == 'weak',
              'bg-orange-500 dark:bg-orange-400/50': ((_b = instance == null ? void 0 : instance.meter) == null ? void 0 : _b.strength) == 'medium',
              'bg-green-500 dark:bg-green-400/50': ((_c = instance == null ? void 0 : instance.meter) == null ? void 0 : _c.strength) == 'strong'
            },
            // Transitions
            'transition-all duration-1000 ease-in-out'
          ]
        };
      },
      showicon: {
        class: ['absolute top-1/2 right-3 -mt-2 z-10', 'text-surface-600 dark:text-white/70']
      },
      hideicon: {
        class: ['absolute top-1/2 right-3 -mt-2 z-10', 'text-surface-600 dark:text-white/70']
      },
      input: {
        root: ({ props, context, parent }) => ({
          class: [
            // Font
            'font-sans leading-none',
            // Flex
            { 'flex-1 w-[1%]': parent.instance.$name == 'InputGroup' },
            // Spacing
            'm-0',
            {
              'px-4 py-4': props.size == 'large',
              'px-2 py-2': props.size == 'small',
              'p-3': props.size == null
            },
            'w-full',
            // Shape
            { 'rounded-md': parent.instance.$name !== 'InputGroup' },
            { 'first:rounded-l-md rounded-none last:rounded-r-md': parent.instance.$name == 'InputGroup' },
            { 'border-0 border-y border-l last:border-r': parent.instance.$name == 'InputGroup' },
            { 'first:ml-0 -ml-px': parent.instance.$name == 'InputGroup' && !props.showButtons },
            // Colors
            'text-surface-600 dark:text-surface-200',
            'placeholder:text-surface-400 dark:placeholder:text-surface-500',
            'bg-surface-0 dark:bg-surface-900',
            'border',
            { 'border-surface-300 dark:border-surface-600': !parent.props.invalid },
            // Invalid State
            { 'u-input-text-error dark:u-input-text-error': parent.props.invalid },
            // States
            {
              'hover:u-input-text-hover dark:hover:u-input-text-hover':
                !context.disabled && !parent.props.invalid,
              'focus:outline-none focus:outline-offset-0 focus:ring focus:u-input-text-focus dark:focus:u-input-text-focus focus:z-10':
                !context.disabled,
              'opacity-60 select-none pointer-events-none cursor-default': context.disabled
            },
            // Misc
            'appearance-none',
            'transition-colors duration-200'
          ]
        })
      },
      transition: {
        enterFromClass: 'opacity-0 scale-y-[0.8]',
        enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
        leaveActiveClass: 'transition-opacity duration-100 ease-linear',
        leaveToClass: 'opacity-0'
      }
    }
  },
  { mergeProps: true }
)

export default customPreset
