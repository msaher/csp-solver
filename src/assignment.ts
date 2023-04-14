export interface Assignment {
    get(key: any): any;
    set(key: any, value: any): void;
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

export interface Assignment {
    get(key: any): any;
    set(key: any, value: any): void;
}
