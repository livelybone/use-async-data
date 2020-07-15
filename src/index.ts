import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'
import useMounted from '@livelybone/use-mounted'

export type DataTuple<T extends any, Args extends any[]> = [
  /**
   * Data
   * */
  T,

  /**
   * A wrapped function for fetch data
   * It realized auto-updating of `data` and auto-updating of `isFetching`
   * */
  (...args: Args) => Promise<T>,

  /**
   * Is fetching
   * */
  boolean,

  /**
   * Be used to update data manually
   * */
  Dispatch<SetStateAction<T>>,
]

export type TruthyOrFalsy = any
export type ShouldResetData = Promise<TruthyOrFalsy> | TruthyOrFalsy

function useAsyncData<T extends any, Args extends any[] = []>(
  api: (...args: Args) => Promise<T>,
  initialValue: T | (() => T),
  errorCb: (err: any) => ShouldResetData,
): DataTuple<T, Args>

function useAsyncData<
  T extends any,
  ApiRes extends any,
  Args extends any[] = []
>(
  api: (...args: Args) => Promise<ApiRes>,
  initialValue: T | (() => T),
  errorCb: (err: any) => ShouldResetData,
  dealFn: (result: ApiRes, preData: T) => T,
): DataTuple<T, Args>

function useAsyncData<
  T extends any,
  ApiRes extends any,
  Args extends any[] = []
>(
  api: (...args: Args) => Promise<ApiRes>,
  initialValue: T | (() => T),
  errorCb: (err: any) => ShouldResetData,
  dealFn?: (result: ApiRes, preData: T) => T,
) {
  const [data, setData] = useState(initialValue)
  const [isFetching, setIsFetching] = useState(false)
  const mountInfo = useMounted()

  type Ref = { api: typeof api; dealFn?: (res: ApiRes) => T }
  const callbacks = useRef<Ref>({ api })
  callbacks.current.api = api
  callbacks.current.dealFn = dealFn && ((res: ApiRes) => dealFn(res, data))

  const getData = useCallback((...args: Args) => {
    const { api: $api, dealFn: $dealFn } = callbacks.current

    setIsFetching(true)
    return $api(...args)
      .then(res => ($dealFn ? $dealFn(res) : (res as any)))
      .then(res => {
        if (!mountInfo.current.unmounted) {
          setIsFetching(false)
          setData(res)
        }
        return res
      })
      .catch(e => {
        if (!mountInfo.current.unmounted) {
          setIsFetching(false)
        }
        return Promise.resolve(errorCb(e)).then(shouldResetData => {
          if (!shouldResetData) return data
          if (!mountInfo.current.unmounted) {
            setData(initialValue)
          }
          return typeof initialValue === 'function'
            ? (initialValue as () => T)()
            : initialValue
        })
      }) as Promise<T>
  }, [])

  return [data, getData, isFetching, setData]
}

export default useAsyncData
