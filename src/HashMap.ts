import {hash} from './hash';

export class HashMap<K, V> {
    map: Map<string, [K, V]>

    constructor() {
        this.map = new Map();
    }

    get(key: K): V | undefined {
        let h = hash(key);
        let pair = this.map.get(h);
        if (pair === undefined)
            return undefined
        else
            return pair[1];
    }

    set(key: K, value: V): HashMap<K, V> {
        let h = hash(key);
        let pair = [key, value] as [K, V];
        this.map.set(h, pair);
        return this;
    }

    delete(key: K): boolean {
        let h = hash(key);
        return this.map.delete(h);
    }

    *entries(): IterableIterator<[K, V]> {
        for (const [_, pair] of this.map.entries())
            yield pair;
    }

    size(): number {
        return this.map.size;
    }
}
