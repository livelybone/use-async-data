import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'

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
  initialValue: T,
  errorCb: (err: any) => ShouldResetData,
): DataTuple<T, Args>

function useAsyncData<
  T extends any,
  ApiRes extends any,
  Args extends any[] = []
>(
  api: (...args: Args) => Promise<ApiRes>,
  initialValue: T,
  errorCb: (err: any) => ShouldResetData,
  dealFn: (result: ApiRes) => T,
): DataTuple<T, Args>

function useAsyncData<
  T extends any,
  ApiRes extends any,
  Args extends any[] = []
>(
  api: (...args: Args) => Promise<ApiRes>,
  initialValue: T,
  errorCb: (err: any) => ShouldResetData,
  dealFn?: (result: ApiRes) => T,
) {
  const [data, setData] = useState<T>(initialValue)
  const [isFetching, setIsFetching] = useState(false)

  const callbacks = useRef({ api, dealFn })
  callbacks.current.api = api
  callbacks.current.dealFn = dealFn

  const getData = useCallback((...args: Args) => {
    const { api: $api, dealFn: $dealFn } = callbacks.current

    setIsFetching(true)
    return $api(...args)
      .then(res => ($dealFn ? $dealFn(res) : (res as any)))
      .then(res => {
        setIsFetching(false)
        setData(res)
        return res
      })
      .catch(e => {
        setIsFetching(false)
        return Promise.resolve(errorCb(e)).then(shouldResetData => {
          if (!shouldResetData) return data
          setData(initialValue)
          return initialValue
        })
      }) as Promise<T>
  }, [])

  return [data, getData, isFetching, setData]
}

export default useAsyncData
