import {Domain, IDomain} from './domain';
import {Var} from './Var';

// TODO: THIS IS WRONG WE HAVE n Ks and n Vs
export class Assignment<K, V> {
    domains: Map<K, IDomain>;
    map: Map<K, V>;

    constructor(domains: Map<K, Domain<V>>) {
        this.domains = domains;
        this.map = new Map<K, V>();
    }

    get(k: K): V | undefined {
        return this.map.get(k);
    }

    set(k: K, v: V) {
        let checker = this.domains.get(k);
        if (checker === undefined)
            throw new Error("No such variable " + k);
        if (!checker.is_in(v))
            throw new Error("Value not in the domain: " + v);

        return this.map.set(k, v);
    }
}
