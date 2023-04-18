import {Assignment} from './Assignment';
import {Constraints} from './Constraints';
import {Key, Value} from './utils';
import {HashMap} from './HashMap';
import {backtracking} from './backtracking';

export class Domains<T extends [any, any]> extends HashMap<Key<T>, Value<T>[]> {};

export class Csp<T extends [any, any]> {
    domains: Domains<T>;
    constraints: Constraints<Key<T>, Value<T>>;

    constructor(domains: Domains<T>, constraints: Constraints<Key<T>, Value<T>>) {
        this.domains = domains;
        this.constraints = constraints;
    }

    isConsistent(p1: T, p2: T): boolean {
        return this.constraints.isConsistent(p1[0], p1[1], p2[0], p2[1]);
    }

    checkPartial(assignment: Assignment<T>): boolean {
        return this.constraints.checkPartial(assignment);
    }

    isComplete(assignment: Assignment<T>): boolean {
        return assignment.size() === this.domains.size();
    }

    getDomain(key: Key<T>): readonly Value<T>[] | undefined {
        return this.domains.get(key);
    }

    entries() {
        return this.domains.entries();
    }
}

export {Constraints, Assignment, backtracking};
