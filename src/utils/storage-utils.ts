import { del, get, set, Store } from 'idb-keyval'

export let idbStore: Store

export function setupStorage(database: string, store: string): Store {
  idbStore = new Store(database, store)
  return idbStore
}

export async function getStorageValue<T = string>(key: string): Promise<T | null> {
  return get(key, idbStore)
}

export async function setStorageValue<T = string>(key: string, value: T): Promise<void> {
  return set(key, value, idbStore)
}

export async function deleteStorageValue(key: string): Promise<void> {
  return del(key, idbStore)
}
