type Key<T extends [any, any]> = T extends [a: infer A, b: any] ? A : never;
type Value<T extends [any, any]> = T extends [a: any, b: infer B] ? B : never;

// I don't wanna force users to use a (single) hash map so this will be an interface
export interface Assignment<T extends [key: any, value: any]> {
    get(key: Key<T>): Value<T> | undefined;
    set(key: Key<T>, value: Value<T>): void;
}

export class HomoAssign<K, V> implements Assignment {
    map: Map<K, V>;

    constructor(map: Map<K, V>) {
        this.map = map;
    }

    get(key: K): V | undefined {
        return this.map.get(key);
    }

    set(key: K, value: V): void {
        this.map.set(key, value);
    }

}
