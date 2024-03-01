import { Accessor, createSignal } from 'solid-js'

// Define types for the mutation function and the hook return value
type MutationFunction<T, R> = (input?: T) => Promise<R>

interface MutationOptions<T, R> {
  mutationFn: MutationFunction<T, R>
  onSuccess?: (data: R) => void
  onError?: (error: any) => void
}

interface MutationState<T, R> {
  mutate: (input?: T) => Promise<void>
  isLoading: Accessor<boolean>
  isSuccess: Accessor<boolean>
  error: Accessor<any>
  data: Accessor<R | null>
}

/**
 * Creates a mutation hook.
 * @param options Options including mutationFn, onSuccess and onError callbacks.
 */
const createMutation = <T, R>(options: MutationOptions<T, R>): MutationState<T, R> => {
  const [isLoading, setIsLoading] = createSignal<boolean>(false)
  const [isSuccess, setIsSuccess] = createSignal<boolean>(false)
  const [error, setError] = createSignal<any>(null)
  const [data, setData] = createSignal<R | null>(null)

  const mutate = async (input?: T) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await options.mutationFn(input)

      setData(() => result)
      options.onSuccess?.(result)
      setIsSuccess(true)
    } catch (err) {
      setError(err)
      options.onError?.(err)
    } finally {
      setIsLoading(false)
    }
  }

  return { mutate, isLoading, error, data, isSuccess }
}

export { createMutation }
export type { MutationFunction, MutationOptions, MutationState }
