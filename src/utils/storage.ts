export async function setupStorage(database: string, store: string): Promise<IDBObjectStore> {
  return new Promise<IDBObjectStore>((resolve, reject) => {
    const req = window.indexedDB.open(database)

    req.addEventListener(
      'success',
      () => {
        const db = req.result
        try {
          resolve(db.createObjectStore(store))
        } catch (error) {
          reject(error)
        }
      },
      false
    )
    req.addEventListener('error', () => reject(req.error), false)
  })
}

export async function getStorageValue<T = string>(store: IDBObjectStore, key: string): Promise<T | null | undefined> {
  return new Promise<T>((resolve, reject) => {
    const req = store.get(key)

    req.addEventListener('success', () => resolve(req.result as T))
    req.addEventListener('error', () => reject(req.error))
  })
}

export async function setStorageValue<T = string>(store: IDBObjectStore, key: string, value: T): Promise<void> {
  return new Promise((resolve, reject) => {
    const req = store.put(value, key)

    req.addEventListener('success', () => resolve())
    req.addEventListener('error', () => reject(req.error))
  })
}

export async function deleteStorageValue(store: IDBObjectStore, key: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const req = store.delete(key)

    req.addEventListener('success', () => resolve())
    req.addEventListener('error', () => reject(req.error))
  })
}
