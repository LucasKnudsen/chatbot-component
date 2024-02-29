import { Accessor, createSignal, onMount } from 'solid-js'

// Define types for the query function and the hook return value
type QueryFunction<T, R> = (input?: T) => Promise<R>

interface QueryOptions<T, R> {
  queryFn: QueryFunction<T, R>
  onSuccess?: (data: R) => void
  onError?: (error: any) => void
}

interface QueryState<R> {
  refetch: () => Promise<void>
  isLoading: Accessor<boolean>
  isSuccess: Accessor<boolean>
  error: Accessor<any>
  data: Accessor<R | null>
}

/**
 * Creates a query hook with refetch functionality.
 * @param options Options including queryFn, onSuccess and onError callbacks.
 * @returns A query hook with refetch functionality.
 */
const createQuery = <T, R>(options: QueryOptions<T, R>): QueryState<R> => {
  const [isLoading, setIsLoading] = createSignal<boolean>(false)
  const [isSuccess, setIsSuccess] = createSignal<boolean>(false)
  const [error, setError] = createSignal<any>(null)
  const [data, setData] = createSignal<R | null>(null)
  const [lastInput, setLastInput] = createSignal<T | undefined>(undefined)

  const query = async (input?: T) => {
    setIsLoading(true)
    setError(null)
    setIsSuccess(false)

    try {
      const result = await options.queryFn(input)

      setData(() => result)
      setLastInput(() => input) // Store the last input used
      options.onSuccess?.(result)
      setIsSuccess(true)
    } catch (err) {
      setError(err)
      options.onError?.(err)
    } finally {
      setIsLoading(false)
    }
  }

  const refetch = async (newInput?: T) => {
    await query(newInput || lastInput())
  }

  onMount(() => {
    query()
  })

  return { refetch, isLoading, error, data, isSuccess }
}

export { createQuery }
export type { QueryFunction, QueryOptions, QueryState }
