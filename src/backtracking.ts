import {Queue} from 'queue-typescript';
import {Csp, Domains} from './csp';
import {Key, Value} from './utils';
import {Assignment} from './assignment';
import {cloneDeep} from 'lodash';

function extractArcs<T extends [any, any]>(csp: Csp<T>): Queue<[Key<T>, Key<T>]> {
    let q: Queue<[Key<T>, Key<T>]> = new Queue();
    for (const [var1, _] of csp.entries()) {
        let adj = csp.constraints.adjacency(var1);
        if (adj === undefined)
            continue;
        for (const var2 of adj) {
            q.append([var1, var2], true);
            q.append([var2, var1], true);
        }
    }
    return q;
}

function hasMatch<T extends [any, any]>(csp: Csp<T>, var1: Key<T>, x: Value<T>, var2: Key<T>, dom: Value<T>[]): boolean {
    for (let y of dom)
        if (csp.constraints.isConsistent(var1, x, var2, y))
            return true;

    return false;
}

function revise<T extends [any, any]>(csp: Csp<T>, var1: Key<T>, var2: Key<T>, domains: Domains<T>): boolean {
    let revised = false;

    let d1 = domains.get(var1);
    if (d1 === undefined)
        return false;

    let d2 = domains.get(var2);
    if (d2 === undefined)
        return false;

    let cpd1 = [... d1];
    for (const x of cpd1) {
        if (!hasMatch(csp, var1, x, var2, d2)) {
            revised = true;
            const index = d1.indexOf(x);
            d1.splice(index, 1);
        }
    }

    return revised;
}

function extractArcsToVar<T extends [any, any]>(csp: Csp<T>, var1: Key<T>, assignment: Assignment<T>): Queue<[Key<T>, Key<T>]> {
    let q = new Queue<[Key<T>, Key<T>]>();
    let adj = csp.constraints.adjacency(var1);
    if (adj === undefined)
        return q;
    for (const var2 of adj)
        if (assignment.get(var2) === undefined)
            q.append([var2, var1], true);

    return q;
}

function ac3<T extends [any, any]>(csp: Csp<T>, queue: Queue<[Key<T>, Key<T>]>, domains: Domains<T>, assignment: Assignment<T>): boolean {
    while (queue.length !== 0) {
        let [var1, var2] = queue.dequeue();
        let isrev = revise(csp, var1, var2, domains);
        if (isrev) {
            let d = domains.get(var1);
            if (d === undefined || d.length === 0) {
                return false
            }
            for (const arc of extractArcsToVar(csp, var1, assignment))
                queue.append(arc, true);
        }
    }

    return true;
}

function mrv<T extends [any, any]>(csp: Csp<T>, domains: Domains<T>, assignment: Assignment<T>) {
    let count = new Map<Key<T>, number>();
    for (const [v, dom] of domains.entries())
        if (assignment.get(v) === undefined)
            count.set(v, dom.length);

    let v = [...count].reduce((a, b) => a[1] < b[1] ? a : b)[0];
    return v;
}

function backtracking_helper<T extends [any, any]>(csp: Csp<T>, assignment: Assignment<T>, domains: Domains<T>): boolean {
    if (csp.isComplete(assignment)) {
        return true;
    }

    let cpdom: Domains<T> = cloneDeep(domains);
    let key = mrv(csp, domains, assignment);
    let d = domains.get(key);
    if (d === undefined) {
        return false
    }

    for (const val of d) {
        assignment.set([key, val] as T);
        if (!csp.checkPartial(assignment)) {
            assignment.delete(key);
            continue;
        }

        cpdom.set(key, [val]);
        let queue = extractArcsToVar(csp, key, assignment);
        let ok = ac3(csp, queue, cpdom, assignment);
        if (ok) {
            let result = backtracking_helper(csp, assignment, cpdom);
            if (result) {
                return result;
            }
        }
        assignment.delete(key);
        cpdom = cloneDeep(domains);
    }
    return false;
}

export function backtracking<T extends [any, any]>(csp: Csp<T>, assignment: Assignment<T>): boolean {
    let queue = extractArcs(csp);
    let doms = cloneDeep(csp.domains);
    let ok = ac3(csp, queue, doms, assignment);
    if (!ok) {
        return false;
    }
    else
        return backtracking_helper(csp, assignment, doms);
}
