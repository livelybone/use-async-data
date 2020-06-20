import { Dispatch, SetStateAction } from 'react'

interface DataObject<T extends any, Args extends any[]> {
  data: T

  /**
   * A wrapped function for fetch data
   * It realized auto-updating of `data` and auto-updating of `isFetching`
   * */
  getData(...args: Args): Promise<T>

  isFetching: boolean
  /**
   * Be used to update data manually
   * */
  setData: Dispatch<SetStateAction<T>>
}

declare type ShouldResetData = Promise<boolean | void> | boolean | void

declare function useAsyncData<T extends any, Args extends any[] = []>(
  api: (...args: Args) => Promise<T>,
  initialValue: T,
  errorCb: (err: any) => ShouldResetData,
): DataObject<T, Args>
declare function useAsyncData<
  T extends any,
  ApiRes extends any,
  Args extends any[] = []
>(
  api: (...args: Args) => Promise<ApiRes>,
  initialValue: T,
  errorCb: (err: any) => ShouldResetData,
  dealFn: (result: ApiRes) => T,
): DataObject<T, Args>

export default useAsyncData
export { DataObject, ShouldResetData }
