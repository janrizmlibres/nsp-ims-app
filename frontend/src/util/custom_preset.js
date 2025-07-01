import { usePassThrough } from 'primevue/passthrough'
import lara from '@/presets/lara'

const customPreset = usePassThrough(
  lara,
  {
    inputnumber: {
      input: {
        root: ({ parent, context }) => {
              var _a, _b, _c;
              return {
                class: [
                  // Display
                  'flex flex-auto',
                  // Font
                  'leading-[normal]',
                  //Text
                  { 'text-center': parent.props.showButtons && parent.props.buttonLayout == 'vertical' },
                  // Spacing
                  'p-3',
                  'm-0',
                  // Shape
                  'rounded-lg',
                  { 'rounded-tr-none rounded-br-none': parent.props.showButtons },
                  { 'rounded-tl-none rounded-bl-none': parent.props.showButtons && parent.props.buttonLayout == 'horizontal' },
                  { 'rounded-none': parent.props.showButtons && parent.props.buttonLayout == 'vertical' },
                  { 'border-0': ((_a = parent.instance.$parentInstance) == null ? void 0 : _a.$name) == 'InputGroup' && !parent.props.showButtons },
                  // Colors
                  'text-surface-800 dark:text-white/80',
                  'placeholder:text-surface-400 dark:placeholder:text-surface-500',
                  'bg-surface-0 dark:bg-surface-900',
                  'border',
                  { 'border-surface-300 dark:border-surface-600': !parent.props.invalid },
                  // Invalid State
                  'invalid:focus:ring-red-200',
                  'invalid:hover:border-red-500',
                  { 'border-red-500 dark:border-red-400': parent.props.invalid },
                  // States
                  { 'hover:u-border-pcolor': !parent.props.invalid },
                  'focus:outline-none focus:outline-offset-0 focus:ring focus:u-ring-pcolor',
                  { 'opacity-60 select-none pointer-events-none cursor-default': context.disabled },
                  // Filled State *for FloatLabel
                  { filled: ((_c = (_b = parent.instance) == null ? void 0 : _b.$parentInstance) == null ? void 0 : _c.$name) == 'FloatLabel' && parent.state.d_modelValue !== null },
                  //Position
                  { 'order-2': parent.props.buttonLayout == 'horizontal' || parent.props.buttonLayout == 'vertical' }
                ]
              };
      }
    },
    },
    inputtext: {
      root: ({ props, context }) => {
        return {
          class: [
            // States
            {
              'hover:u-border-pcolor-darker':
                !context.disabled && !props.invalid,
              'focus:outline-none focus:outline-offset-0 focus:ring focus:u-ring-pcolor dark:focus:u-ring-pcolor focus:z-10':
                !context.disabled,
              'opacity-60 select-none pointer-events-none cursor-default': context.disabled
            }
          ]
        }
      }
    },
    tabview: {
      root: {
          class: ['relative flex flex-col h-full overflow-hidden']
      },
      panelContainer: {
          class: ['relative h-full overflow-hidden']
      },
      tabpanel: {
          content: {
              class: ['h-full overflow-hidden']
          }
      }
    },
    datatable: {
      root: {
        class: ['flex flex-col h-full overflow-auto']
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
          class: ['ml-2', context.sorted ? 'u-txt-scolor dark:text-white/80' : 'u-txt-active dark:text-white/70']
        }),
        bodycell: {class: 'py-3 '},
        filtermenubutton: {
          class: ['focus:u-ring-pcolor']
        },
        filtermatchmodedropdown: {
          root: ({ state }) => ({
                  class: [
                    // Display and Position
                    'flex',
                    'relative',
                    // Spacing
                    'my-2',
                    // Shape
                    'w-full',
                    'rounded-md',
                    // Color and Background
                    'bg-surface-0 dark:bg-surface-900',
                    'border border-surface-300 dark:border-surface-700',
                    'text-surface-800 dark:text-white/80',
                    'placeholder:text-surface-400 dark:placeholder:text-surface-500',
                    // Transitions
                    'transition-all',
                    'duration-200',
                    // States
                    'hover:border-primary',
                    { 'ring u-ring-pcolor': state.focused },
                    // Misc
                    'cursor-pointer',
                    'select-none'
                  ]
          })
        },
        filteroperatordropdown: {
          root: ({ state }) => ({
                    class: [
                      // Display and Position
                      'inline-flex',
                      'relative',
                      // Shape
                      'w-full',
                      'rounded-md',
                      // Color and Background
                      'bg-surface-0 dark:bg-surface-900',
                      'border border-surface-300 dark:border-surface-700',
                      // Transitions
                      'transition-all',
                      'duration-200',
                      // States
                      'hover:border-primary',
                      { 'outline-none outline-offset-0 ring u-ring-pcolor': state.focused },
                      // Misc
                      'cursor-pointer',
                      'select-none'
                    ]
        }),
            input: ({ props }) => ({
                    class: [
                      //Font
                      'leading-[normal]',
                      // Display
                      'block',
                      'flex-auto',
                      // Color and Background
                      'bg-transparent',
                      'border-0',
                      { 'text-surface-800 dark:text-white/80': props.modelValue, 'text-surface-400 dark:text-surface-500': !props.modelValue },
                      'placeholder:text-surface-400 dark:placeholder:text-surface-500',
                      // Sizing and Spacing
                      'w-[1%]',
                      'p-3',
                      //Shape
                      'rounded-none',
                      // Transitions
                      'transition',
                      'duration-200',
                      // States
                      'focus:outline-none focus:shadow-none',
                      // Misc
                      'relative',
                      'cursor-pointer',
                      'overflow-hidden overflow-ellipsis',
                      'whitespace-nowrap',
                      'appearance-none'
                    ]
        }),
            trigger: {
                class: ['flex items-center justify-center', 'shrink-0', 'bg-transparent', 'text-surface-500', 'w-12', 'rounded-tr-md', 'rounded-br-md']
            },
            panel: {
                class: ['absolute top-0 left-0', 'border-0 dark:border', 'rounded-md', 'shadow-md', 'bg-surface-0 dark:bg-surface-800', 'text-surface-800 dark:text-white/80', 'dark:border-surface-700']
            },
            item: ({ context }) => ({
                    class: [
                      // Font
                      'font-normal',
                      'leading-none',
                      // Position
                      'relative',
                      // Shape
                      'border-0',
                      'rounded-none',
                      // Spacing
                      'm-0',
                      'py-3 px-5',
                      // Color
                      {
                        'text-surface-700 dark:text-white/80': !context.focused && !context.selected,
                        'bg-surface-200 dark:bg-surface-600/60': context.focused && !context.selected,
                        'text-white': context.selected,
                        'u-bg-pcolor-2': context.selected
                      },
                      //States
                      { 'hover:bg-surface-100 dark:hover:bg-surface-600/80': !context.focused && !context.selected },
                      { 'hover:text-white': context.selected },
                      'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50',
                      // Transitions
                      'transition-shadow',
                      'duration-200',
                      // Misc
                      { 'pointer-events-none cursor-default': context.disabled },
                      { 'cursor-pointer': !context.disabled },
                      'overflow-hidden',
                      'whitespace-nowrap',
                      // Transitions
                      'transition-shadow',
                      'duration-200',
                      // Misc
                      'cursor-pointer',
                      'overflow-hidden',
                      'whitespace-nowrap'
                    ]
        })
        },
        filteraddrulebutton: {
            root: {
                class: ['relative', 'items-center inline-flex text-center align-bottom justify-center', 'text-sm py-2 px-3 w-full', 'rounded-md', 'bg-transparent border-transparent', 'u-txt-pcolor', 'hover:u-bg-pcolor hover:text-white', 'transition duration-200 ease-in-out', 'cursor-pointer overflow-hidden select-none']
            },  
            label: {
                class: 'flex-auto grow-0'
            },
            icon: {
                class: 'mr-2'
            }
        },
        filterclearbutton: {
          root: {
              class: ['relative', 'items-center inline-flex text-center align-bottom justify-center', 'text-sm py-2 px-3', 'rounded-xl', 'u-txt-pcolor border u-border-pcolor', 'hover:text-white', 'hover:u-bg-pcolor', 'transition duration-200 ease-in-out', 'cursor-pointer overflow-hidden select-none']
          }
        },
        filterapplybutton: {
            root: {
                class: ['relative', 'items-center inline-flex text-center align-bottom justify-center', 'text-sm py-2 px-3', 'rounded-xl', 'text-white', 'u-bg-pcolor', 'hover:transform hover:scale-[1.10]', 'hover:u-bg-pcolor hover:border-none', 'transition duration-200 ease-in-out', 'cursor-pointer overflow-hidden select-none']
            }
        },
      },
      wrapper: {
        class: ['flex-1']
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
      rowexpansioncell: {
        class: ['!p-0']
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
    dropdown: {
        root: ({ props, state, parent }) => ({
            class: [
              // Display and Position
              'inline-flex',
              'relative',
              // Shape
              { 'rounded-md': parent.instance.$name !== 'InputGroup' },
              { 'first:rounded-l-md rounded-none last:rounded-r-md': parent.instance.$name == 'InputGroup' },
              { 'border-0 border-y border-l last:border-r': parent.instance.$name == 'InputGroup' },
              { 'first:ml-0 ml-[-1px]': parent.instance.$name == 'InputGroup' && !props.showButtons },
              // Color and Background
              'bg-surface-0 dark:bg-surface-900',
              'border border-surface-300',
              { 'dark:border-surface-700': parent.instance.$name != 'InputGroup' },
              { 'dark:border-surface-600': parent.instance.$name == 'InputGroup' },
              { 'border-surface-300 dark:border-surface-600': !props.invalid },
              // Invalid State
              { 'border-red-500 dark:border-red-400': props.invalid },
              // Transitions
              'transition-all',
              'duration-200',
              // States
              { 'hover:u-border-pcolor': !props.invalid },
              { 'outline-none outline-offset-0 ring u-ring-pcolor': state.focused },
              // Misc
              'cursor-pointer',
              'select-none',
              { 'opacity-60': props.disabled, 'pointer-events-none': props.disabled, 'cursor-default': props.disabled }
            ]
        }),
        input: ({ props, parent }) => {
            var _a;
            return {
              class: [
                'text-pretty',
                //Font
                'leading-[normal]',
                // Display
                'block',
                'flex-auto',
                // Color and Background
                'bg-transparent',
                'border-0',
                { 'text-surface-800 dark:text-white/80': props.modelValue != null, 'text-surface-400 dark:text-surface-500': props.modelValue == null },
                'placeholder:text-surface-400 dark:placeholder:text-surface-500',
                // Sizing and Spacing
                'w-[1%]',
                'p-3',
                { 'pr-7': props.showClear },
                //Shape
                'rounded-none',
                // Transitions
                'transition',
                'duration-200',
                // States
                'focus:outline-none focus:shadow-none',
                // Filled State *for FloatLabel
                { filled: ((_a = parent.instance) == null ? void 0 : _a.$name) == 'FloatLabel' && props.modelValue !== null },
                // Misc
                'relative',
                'cursor-pointer',
                'overflow-hidden overflow-ellipsis',
                'whitespace-nowrap',
                'appearance-none'
              ]
            };
        },
        trigger: {
            class: ['flex items-center justify-center', 'shrink-0', 'bg-transparent', 'text-surface-500', 'w-12', 'rounded-tr-md', 'rounded-br-md']
        },
        panel: {
            class: ['absolute top-0 left-0', 'border-0 dark:border', 'rounded-md', 'shadow-md', 'bg-surface-0 dark:bg-surface-800', 'text-surface-800 dark:text-white/80', 'dark:border-surface-700']
        },
        wrapper: {
            class: ['max-h-[200px]', 'overflow-auto']
        },
        list: {
            class: 'py-3 list-none m-0'
        },
        item: ({ context }) => ({
            class: [
              'text-pretty',
              // Font
              'font-normal',
              'leading-none',
              // Position
              'relative',
              // Shape
              'border-0',
              'rounded-none',
              // Spacing
              'm-0',
              'py-3 px-5',
              // Colors
              {
                'text-surface-700 dark:text-white/80': !context.focused && !context.selected,
                'bg-surface-200 dark:bg-surface-600/60': context.focused && !context.selected,
                'text-white': context.selected,
                'u-bg-pcolor-2': context.selected
              },
              //States
              { 'hover:bg-surface-100 dark:hover:bg-surface-600/80': !context.focused && !context.selected },
              { 'hover:text-white': context.selected },
              'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50',
              // Transitions
              'transition-shadow',
              'duration-200',
              // Misc
              { 'pointer-events-none cursor-default': context.disabled },
              { 'cursor-pointer': !context.disabled },
              'overflow-hidden',
              'whitespace-nowrap'
            ]
        }),
        itemgroup: {
            class: ['font-bold', 'm-0', 'py-3 px-5', 'text-surface-800 dark:text-white/80', 'bg-surface-0 dark:bg-surface-600/80', 'cursor-auto']
        },
        emptymessage: {
            class: ['leading-none', 'py-3 px-5', 'text-surface-800 dark:text-white/80', 'bg-transparent']
        },
        header: {
            class: ['py-3 px-5', 'm-0', 'border-b', 'rounded-tl-md', 'rounded-tr-md', 'text-surface-700 dark:text-white/80', 'bg-surface-100 dark:bg-surface-800', 'border-surface-300 dark:border-surface-700']
        },
        filtercontainer: {
            class: 'relative'
        },
        filterinput: {
            class: ['leading-[normal]', 'pr-7 py-3 px-3', '-mr-7', 'w-full', 'text-surface-700 dark:text-white/80', 'bg-surface-0 dark:bg-surface-900', 'border-surface-200 dark:border-surface-700', 'border', 'rounded-lg', 'appearance-none', 'transition', 'duration-200', 'hover:border-primary', 'focus:ring focus:outline-none focus:outline-offset-0', 'focus:u-ring-pcolor', 'appearance-none']
        },
        filtericon: {
            class: ['absolute', 'top-1/2 right-3', '-mt-2']
        },
        clearicon: {
            class: ['text-surface-500', 'absolute', 'top-1/2', 'right-12', '-mt-2']
        },
        loadingicon: {
            class: 'text-surface-400 dark:text-surface-500 animate-spin'
        },
        transition: {
            enterFromClass: 'opacity-0 scale-y-[0.8]',
            enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
            leaveActiveClass: 'transition-opacity duration-100 ease-linear',
            leaveToClass: 'opacity-0'
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
            { 'u-border-red dark:u-border-red': parent.props.invalid },
            // States
            {
              'hover:u-input-text-hover dark:hover:u-input-text-hover':
                !context.disabled && !parent.props.invalid,
              'focus:outline-none focus:outline-offset-0 focus:ring focus:u-ring-pcolor dark:focus:u-ring-pcolor focus:z-10':
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
    },
    textarea: {
      root: {
        class: ['focus:u-ring-pcolor hover:u-border-pcolor']
      }
    },
    autocomplete: {
      container: ({ state }) => ({
        class: [
          { 'ring u-ring-pcolor': state.focused },
          { 'ring u-ring-pcolor': state.hovered },
        ]
      }),
      dropdownbutton: {
          root: {
              class: ['relative', 'items-center inline-flex text-center align-bottom', 'rounded-r-md', 'px-4 py-3 leading-[normal]', 'text-white', 'u-bg-pcolor', 'border u-border-pcolor', 'focus:outline-none focus:outline-offset-0 focus:ring', 'hover:u-bg-pcolor hover:u-border-pcolor', 'focus:u-ring-pcolor dark:focus:ring-primary-300/50']
          }
      },
      input: ({ props, parent }) => {
        var _a;
        return {
            class: [
              // Font
              'text-base leading-[normal]',
              // Shape
              'appearance-none rounded-md',
              { 'rounded-tr-none rounded-br-none': props.dropdown },
              { 'outline-none shadow-none rounded-none': props.multiple },
              // Size
              { 'w-full': props.multiple },
              // Spacing
              'm-0',
              { 'p-3': !props.multiple, 'p-0': props.multiple },
              // Colors
              'text-surface-700 dark:text-white/80',
              'border',
              {
                'bg-surface-0 dark:bg-surface-900': !props.multiple,
                ' border-surface-300 dark:border-surface-700': !props.multiple && !props.invalid,
                'border-0 bg-transparent': props.multiple
              },
              // Invalid State
              { 'border-red-500 dark:border-red-400': props.invalid },
              // States
              { 'focus:outline-none focus:outline-offset-0 focus:ring focus:u-ring-pcolor': !props.multiple },
              // Filled State *for FloatLabel
              { filled: ((_a = parent.instance) == null ? void 0 : _a.$name) == 'FloatLabel' && props.modelValue !== '' },
              // Transition
              'transition-colors duration-200'
            ]
          };
      },
    },
    button: {
      root: ({ props }) => ({
        class :[
          'focus:ring-transparent !rounded-2xl transition-all duration-300 ease-in-out hover:transform hover:scale-[1.05]',
          {
            'border border-none': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
          },
        ]
      })
    },
    calendar: {
      input: ({ props, parent }) => {
          var _a;
          return {
            class: [
              // Display
              'flex flex-auto',
              // Font
              'leading-none',
              // Colors
              'text-surface-600 dark:text-surface-200',
              'placeholder:text-surface-400 dark:placeholder:text-surface-500',
              'bg-surface-0 dark:bg-surface-900',
              'border',
              { 'border-surface-300 dark:border-surface-600': !props.invalid },
              // Invalid State
              { 'border-red-500 dark:border-red-400': props.invalid },
              // Spacing
              'm-0 p-3',
              // Shape
              'appearance-none',
              { 'rounded-md': !props.showIcon || props.iconDisplay == 'input' },
              { 'rounded-l-md  flex-1 pr-9': props.showIcon && props.iconDisplay !== 'input' },
              { 'rounded-md flex-1 pr-9': props.showIcon && props.iconDisplay === 'input' },
              // Transitions
              'transition-colors',
              'duration-200',
              // States
              { 'hover:u-border-pcolor': !props.invalid },
              'focus:outline-none focus:outline-offset-0 focus:ring focus:u-ring-pcolor',
              // Filled State *for FloatLabel
              { filled: ((_a = parent.instance) == null ? void 0 : _a.$name) == 'FloatLabel' && props.modelValue !== null }
            ]
          };
      },
    }
  },
  { mergeProps: true }
)

export default customPreset
