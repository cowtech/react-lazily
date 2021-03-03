import { createStore, del, get, set } from 'idb-keyval';
export let idbStore;
export function setupStorage(database, store) {
    idbStore = createStore(database, store);
    return idbStore;
}
export async function getStorageValue(key) {
    return get(key, idbStore);
}
export async function setStorageValue(key, value) {
    return set(key, value, idbStore);
}
export async function deleteStorageValue(key) {
    return del(key, idbStore);
}
