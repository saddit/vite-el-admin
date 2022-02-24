export default {
  formatSecond(sec: number): string {
    if (sec > 60 * 60) {
      return (sec / (60 * 60)).toFixed(1) + "小时";
    } else if (sec > 60) {
      return (sec / 60).toFixed(1) + "分钟"
    } else {
      return sec + "秒"
    }
  },
  isSet(value?: any) {
    return value != undefined && value != null;
  },
  isNotSet(value?: any) {
    return !this.isSet(value)
  },
  dataSize(size: string) {
    const k = 1024;
    const units = ["KB", "MB", "GB"]
    const parts = /(\d+)(KB|MB|GB)/.exec(size)
    if (parts?.length != 3) {
      throw new Error(`${size} 不是以KB,MB,GB结尾的数据容量表达式`)
    }
    const num = Number.parseInt(parts[1])
    const unit = parts[2]
    const index = units.findIndex(u => u == unit) + 1
    return num * Math.pow(k, index)
  },
  async tryCatch(func: Function, onFinally?: () => void, onError?: (e: any) => void) {
    try {
      const res = func()
      if (res instanceof Promise) {
        return await res
      } else {
        return res;
      }
    } catch (e: any) {
      if (onError) {
        onError(e)
      }
      if (e.msg) {
        ElMessage.error(e.msg)
      } else {
        console.error(e)
      }
    } finally {
      if (onFinally) {
        onFinally()
      }
    }
  }
}

import router from "@/router"
import { AxiosResponse } from "axios";

export const loadData = async <T>(query?: (data: T) => Promise<T>, backWhenFail = true, enableCache = true) => {
  const route = useRoute()
  const routeData = route.params.data

  let cache = undefined
  if (enableCache) {
    cache = store.getters.cache(route.name)
  }
  let data;
  if (routeData) {
    data = JSON.parse(routeData as string)
    if (query) {
      data = await query(data)
    }
    if (enableCache) {
      store.commit("putCache", { key: route.name, value: JSON.stringify(data) })
    }
  } else if (cache) {
    data = JSON.parse(cache)
  } else {
    if (backWhenFail) {
      router.back()
    } else {
      throw new Error("加载数据失败")
    }
  }
  return data as T;
}

export const loadDataById = async <T = any>(
  api: (id: number) => Promise<AxiosResponse<T>>,
  backWhenFail = true,
  enableCache = true
) => {
  return loadData<T>(async (data: any) => {
    return (await api(data['id'])).data
  }, backWhenFail, enableCache)
}