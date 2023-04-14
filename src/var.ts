import {Domain} from './domain';

export interface Setter {
    setValue(value: any): void;
}

export class Var<V> implements Setter {
    domain: Array<V>;
    value: V | null;

    constructor(domain: Array<V>, value: V | null = null) {
        this.value = value;
        this.domain = domain;
    }

    getValue(): V | null {
        return this.value;
    }

    setValue(value: V) {
        if (this.domain.includes(value))
            this.value = value;
        else
            throw new Error("Value " + value + " is not in the domain");
    }

}
