import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'

export interface DataObject<T extends any, Args extends any[]> {
  data: T
  /**
   * A wrapped function for fetch data
   * It realized auto-updating of `data` and auto-updating of `isFetching`
   * */
  getData: (...args: Args) => Promise<T>
  isFetching: boolean
  /**
   * Be used to update data manually
   * */
  setData: Dispatch<SetStateAction<T>>
}

function useAsyncData<T extends any, Args extends any[] = []>(
  api: (...args: Args) => Promise<T>,
  initialValue: T,
): DataObject<T, Args>

function useAsyncData<
  T extends any,
  ApiRes extends any,
  Args extends any[] = []
>(
  api: (...args: Args) => Promise<ApiRes>,
  initialValue: T,
  dealFn: (result: ApiRes) => T,
): DataObject<T, Args>

function useAsyncData<
  T extends any,
  ApiRes extends any,
  Args extends any[] = []
>(
  api: (...args: Args) => Promise<ApiRes>,
  initialValue: T,
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
      }) as Promise<T>
  }, [])

  return { data, getData, isFetching, setData }
}

export default useAsyncData
