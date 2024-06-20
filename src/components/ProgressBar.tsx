import { useTheme } from '@/features/theme'
import { createEffect, createSignal } from 'solid-js'

type Props = {
  isLoading?: boolean
}

export const ProgressBar = (props: Props) => {
  const [progress, setProgress] = createSignal<number>(0)
  const { theme } = useTheme()

  createEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev === 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 20
      })
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  createEffect(() => {
    if (!props.isLoading) {
      setProgress(100)
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
      {/* <progress class='custom-progress transition-all' value={progress()} max='100'></progress> */}

      <div class='flex max-w-[180px] m-auto'>
        <div
          class='mt-2 transition-all h-[3px] bg-[var(--primaryColor)] rounded-lg '
          style={{
            width: `${progress()}%`,
          }}
        />
      </div>
    </>
  )
}
