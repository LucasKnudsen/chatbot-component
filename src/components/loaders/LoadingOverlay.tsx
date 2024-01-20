import { Show } from 'solid-js'
import { Spinner, SpinnerProps } from '.'

type LoadingOverlayProps = {
  isLoading: boolean
  spinnerProps?: SpinnerProps
}

export const LoadingOverlay = (props: LoadingOverlayProps) => {
  return (
    <Show when={props.isLoading}>
      <div class='fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-50 flex justify-center items-center'>
        <Spinner {...props.spinnerProps} />
      </div>
    </Show>
  )
}
