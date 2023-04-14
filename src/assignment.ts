export interface Assignment<K, V> {
    get(key: K): V | undefined;
    set(key: K, value: V): void;
}
