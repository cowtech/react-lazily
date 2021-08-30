import * as idb from 'idb-keyval'

export let idbStore: idb.UseStore

export function setupStorage(database: string, store: string): idb.UseStore {
  idbStore = idb.createStore(database, store)
  return idbStore
}

export async function getStorageValue<T = string>(key: string): Promise<T | null | undefined> {
  return idb.get(key, idbStore)
}

export async function setStorageValue<T = string>(key: string, value: T): Promise<void> {
  return idb.set(key, value, idbStore)
}

export async function deleteStorageValue(key: string): Promise<void> {
  return idb.del(key, idbStore)
}
