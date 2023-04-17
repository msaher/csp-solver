import {HashMap} from './HashMap';
type Key<T extends [any, any]> = T extends [a: infer A, b: any] ? A : never;
type Value<T extends [any, any]> = T extends [a: any, b: infer B] ? B : never;

// I don't wanna force users to use a (single) hash map so this will be an interface
export interface Assignment<T extends [key: any, value: any]> {
    get(key: Key<T>): Value<T> | undefined;
    set(pair: T): void;
    entries(): IterableIterator<[Key<T>, Value<T>]>;
}

export class HashAssign<T extends [key: any, value: any]> implements Assignment<T> {
    hmap: HashMap<Key<T>, Value<T>>;

    constructor() {
        this.hmap = new HashMap();
    }

    get(key: Key<T>): Value<T> | undefined {
        return this.hmap.get(key);
    }

    set(pair: T): void {
        this.hmap.set(pair[0], pair[1]);
    }

    entries(): IterableIterator<[Key<T>, Value<T>]> {
        return this.hmap.entries();
    }
}
