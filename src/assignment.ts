import {hash} from './hash'
type Key<T extends [any, any]> = T extends [a: infer A, b: any] ? A : never;
type Value<T extends [any, any]> = T extends [a: any, b: infer B] ? B : never;

// I don't wanna force users to use a (single) hash map so this will be an interface
export interface Assignment<T extends [key: any, value: any]> {
    get(key: Key<T>): Value<T> | undefined;
    set(pair: T): void;
    entries(): IterableIterator<[Key<T>, Value<T>]>;
}

export class HashAssign<T extends [key: any, value: any]> implements Assignment<T> {
    map: Map<string, T>;

    constructor() {
        this.map = new Map();
    }

    get(key: Key<T>): Value<T> | undefined {
        let h = hash(key);
        let pair = this.map.get(h);
        if (pair !== undefined)
            return pair[1];
        else
            return undefined;
    }

    set(pair: T): void {
        let h = hash(pair[0]);
        this.map.set(h, pair);
    }

    *entries(): IterableIterator<[Key<T>, Value<T>]> {
        for (const [_, pair] of this.map.entries())
            yield pair;
    }
}
