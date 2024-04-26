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
    }
  },
  { mergeProps: true }
)

export default customPreset
