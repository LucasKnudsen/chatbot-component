import { createEffect, createSignal } from 'solid-js'
import { Subscription, interval } from 'rxjs'

type Props = {
  isLoading?: boolean
}

export const ProgressBar = (props: Props) => {
  const [progress, setProgress] = createSignal<number>(0)

  createEffect(() => {
    let subscription: Subscription;
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

  return <progress class='custom-progress' value={progress()} max='100'></progress>
}
