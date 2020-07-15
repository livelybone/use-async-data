import { Dispatch, SetStateAction } from 'react'

declare type DataTuple<T extends any, Args extends any[]> = [
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
declare type TruthyOrFalsy = any
declare type ShouldResetData = Promise<TruthyOrFalsy> | TruthyOrFalsy

declare function useAsyncData<T extends any, Args extends any[] = []>(
  api: (...args: Args) => Promise<T>,
  initialValue: T | (() => T),
  errorCb: (err: any) => ShouldResetData,
): DataTuple<T, Args>
declare function useAsyncData<
  T extends any,
  ApiRes extends any,
  Args extends any[] = []
>(
  api: (...args: Args) => Promise<ApiRes>,
  initialValue: T | (() => T),
  errorCb: (err: any) => ShouldResetData,
  dealFn: (result: ApiRes, preData: T) => T,
): DataTuple<T, Args>

export default useAsyncData
export { DataTuple, ShouldResetData, TruthyOrFalsy }
