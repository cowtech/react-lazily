import { createStore, del, get, set, UseStore } from 'idb-keyval'

export let idbStore: UseStore

export function setupStorage(database: string, store: string): UseStore {
  idbStore = createStore(database, store)
  return idbStore
}

export async function getStorageValue<T = string>(key: string): Promise<T | null | undefined> {
  return get(key, idbStore)
}

export async function setStorageValue<T = string>(key: string, value: T): Promise<void> {
  return set(key, value, idbStore)
}

export async function deleteStorageValue(key: string): Promise<void> {
  return del(key, idbStore)
}
