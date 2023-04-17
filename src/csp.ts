import { Queue } from 'queue-typescript';
import {Assignment} from './assignment';
import {Constraints} from './constraints';
import {Key, Value} from './utils';

export class Csp<T extends [any, any]> {
    keys: Key<T>[];
    values: Value<T>[];
    constraints: Constraints<Key<T>, Value<T>>;

    constructor(keys: Key<T>[], values: Value<T>[], constraints: Constraints<Key<T>, Value<T>>) {
        this.keys = keys;
        this.values = values;
        this.constraints = constraints;
    }

    isConsistent(p1: T, p2: T): boolean {
        return this.constraints.isConsistent(p1[0], p1[1], p2[0], p2[1]);
    }

    checkPartial(assignment: Assignment<T>): boolean {
        return this.constraints.checkPartial(assignment);
    }

    isComplete(assignment: Assignment<T>): boolean {
        return assignment.size() === this.keys.length;
    }
}
