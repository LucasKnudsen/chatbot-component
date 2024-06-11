import { createEffect, createSignal } from 'solid-js'
import { Subscription, interval } from 'rxjs'
import { useTheme } from '@/features/theme'

type Props = {
  isLoading?: boolean
}

export const ProgressBar = (props: Props) => {
  const [progress, setProgress] = createSignal<number>(0)
  const { theme } = useTheme();

  createEffect(() => {
    let subscription: Subscription
    if (!props.isLoading) {
      subscription = interval(10).subscribe((value) => {
        setProgress((value + 1) * 10)
        if (value === 9) {
          subscription.unsubscribe()
        }
      })
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [props.isLoading])

  return (
    <>
      <style>
        {`
        .custom-progress {
          height: 3px;
        }

        .custom-progress[value]::-webkit-progress-bar {
          border-radius: 10px;
          background-color: ${theme().borderColor};
        }

        .custom-progress[value]::-webkit-progress-value {
          background-color: ${theme().primaryColor};
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
      `}
      </style>
      <progress class='custom-progress' value={progress()} max='100'></progress>
    </>
  )
}
