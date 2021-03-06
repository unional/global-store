import { StoreInitializer, StoreValue, StoreVersion } from './types';
import { StoreCreator, StoreId, Stores } from './typesInternal';
export declare function getStoreValue(stores: Stores, id: StoreId): any;
export declare function initStoreValue<T extends StoreValue>(stores: Stores, id: StoreId, version: StoreVersion, initializer: StoreInitializer<T>): void;
export declare function resetStoreValue(stores: Stores, id: StoreId): void;
export declare function getStore(stores: Stores, id: StoreId): {
    versions: StoreVersion[];
    initializers: StoreInitializer<any>[];
    value: Record<string | symbol, any>;
};
export declare function resolveCreators<S>(moduleName: string, key: string, storeCreators: Array<StoreCreator<S>>, createStore: any): void;
export declare function sortByVersion<S>(storeCreators: Array<StoreCreator<S>>): StoreCreator<S>[];
export declare function freezeStoreValue(stores: Stores, id: StoreId, value?: any): void;
