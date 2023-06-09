import {HashMap} from './HashMap';
import {Key, Value} from './utils'

export class Assignment<T extends [key: any, value: any]> {
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

    delete(key: Key<T>): boolean {
        return this.hmap.delete(key);
    }

    size(): number {
        return this.hmap.size();
    }
}
