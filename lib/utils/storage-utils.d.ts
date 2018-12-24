import { Store } from 'idb-keyval';
export declare let idbStore: Store;
export declare function setupStorage(database: string, store: string): Store;
export declare function getStorageValue<T = string>(key: string): Promise<T | null>;
export declare function setStorageValue<T = string>(key: string, value: T): Promise<void>;
export declare function deleteStorageValue(key: string): Promise<void>;
