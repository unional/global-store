const store: any = {}

export interface Store<T> {
  get(): T
  set(value: T): void
}

/**
 * Creates a store of type T.
 * @param id A unique identifier to the store.
 * It can be a symbol created from `Symbol.for(key)`,
 * or a runtime-wide unique string:
 * You should make it descriptive.
 * You should use your module's name or unique key as part of the id.
 * You can add some secret random string to it.
 * e.g. `my-module:some-purpose:some-random-string`
 * @param defaultValue Optional default value.
 */
export function createStore<T = any>(id: string | symbol, defaultValue?: T): Store<T> {
  return {
    get() {
      return store[id] = store[id] || defaultValue
    },
    set(value: T) {
      store[id] = value
    }
  }
}