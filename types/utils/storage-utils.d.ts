import { UseStore } from 'idb-keyval';
export declare let idbStore: UseStore;
export declare function setupStorage(database: string, store: string): UseStore;
export declare function getStorageValue<T = string>(key: string): Promise<T | null | undefined>;
export declare function setStorageValue<T = string>(key: string, value: T): Promise<void>;
export declare function deleteStorageValue(key: string): Promise<void>;
