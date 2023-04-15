type Key<T extends [any, any]> = T extends [a: infer A, b: any] ? A : never;
type Value<T extends [any, any]> = T extends [a: any, b: infer B] ? B : never;

// I don't wanna force users to use a (single) hash map so this will be an interface
export interface Assignment<T extends [key: any, value: any]> {
    get(key: Key<T>): Value<T> | undefined;
    set(key: Key<T>, value: Value<T>): void;
    entries(): IterableIterator<[Key<T>, Value<T>]>;
}

export class MapAssign<T extends [key: any, value: any]> implements Assignment<T> {
    map: Map<Key<T>, Value<T>>;

    constructor(map: Map<Key<T>, Value<T>>) {
        this.map = map;
    }

    get(key: Key<T>): Value<T> | undefined {
        return this.map.get(key);
    }

    set(key: Key<T>, value: Value<T>): void {
        this.map.set(key, value);
    }

    entries(): IterableIterator<[Key<T>, Value<T>]> {
        return this.map.entries();
    }

}
