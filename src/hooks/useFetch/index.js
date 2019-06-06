import { useEffect, useMemo, useRef } from 'react'

export default function useFetch() {
  const abortControllers = useRef([])
  const isDestroyed = useRef(false)
  const createAbortControllerSignal = () => {
    const controller = new AbortController()
    abortControllers.current = [
      ...abortControllers.current,
      controller,
    ]
    return controller.signal
  }
  const abort = () => {
    abortControllers.current.forEach((controller) => controller.abort())
    abortControllers.current = []
  }
  useEffect(() => function cleanup() {
    abort()
    isDestroyed.current = true
  })

  return useMemo(
    () => ({
      abort,
      abortAndFetch: (url, options) => {
        abort()
        return fetch(
          url,
          {
            ...options,
            signal: createAbortControllerSignal(),
          }
        )
      },
      resolveAbortionErrors: (error) => {
        if (!error || error.name !== 'AbortError') {
          throw error
        }
        return error
      },
    }),
    []
  )
}
