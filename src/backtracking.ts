import {Queue} from 'queue-typescript';
import {Csp, Domains} from './csp';
import {Key, Value} from './utils';
import {Assignment, HashAssign} from './assignment';
import {cloneDeep, constant} from 'lodash';

require("util").inspect.defaultOptions.depth = null;

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
            console.log('removing ' + x + ' from ' + var1);
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
                console.log('THE DOMAIN OF ' + var1 + ' IS 0')
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

function backtracking_helper<T extends [any, any]>(csp: Csp<T>, assignment: Assignment<T>, domains: Domains<T>): Assignment<T> | undefined {
    if (csp.isComplete(assignment)) {
        console.log('YES COMPLETE')
        return assignment;
    }

    let cpdom: Domains<T> = cloneDeep(domains);
    let key = mrv(csp, domains, assignment);
    console.log('TRYING OUT ' + key)
    let d = domains.get(key);
    if (d === undefined) {
        console.log('NO DOMAIN???')
        return undefined
    }

    for (const val of d) {
        console.log('\t Setting to ' + val);
        assignment.set([key, val] as T);
        if (!csp.checkPartial(assignment)) {
            console.log('\t ' + val + ' is NOT CONSISTENT')
            assignment.delete(key);
            continue;
        }

        cpdom.set(key, [val]);
        console.log(cpdom)
        console.log('DOMAIN NOW IS ', cpdom)
        let queue = extractArcsToVar(csp, key, assignment);
        let ok = ac3(csp, queue, cpdom, assignment);
        console.log('REDUCED DOMAINS')
        console.log(cpdom)
        if (ok) {
            console.log('Caling child')
            let result = backtracking_helper(csp, assignment, cpdom);
            if (result !== undefined) {
                return result;
            } else {
                console.log('CHILD FAILED')
            }
        } else {
            console.log('NOT OKAY')
        }
        assignment.delete(key);
        cpdom = cloneDeep(domains);
        // console.log('DOMAIN BACK TO');
        // console.log(cpdom);
    }
    console.log('FAILED TO FIND SOLUTION')
    return undefined;
}

export function backtracking<T extends [any, any]>(csp: Csp<T>, assignment: Assignment<T>): Assignment<T> | undefined {
    let queue = new Queue<[Key<T>, Key<T>]>();
    let doms = cloneDeep(csp.domains);
    console.log('STARTING')
    console.log(doms);
    let ok = ac3(csp, queue, doms, assignment);
    if (!ok) {
        console.log('NOT OK')
        return undefined;
    }
    else
        return backtracking_helper(csp, assignment, doms);
}
