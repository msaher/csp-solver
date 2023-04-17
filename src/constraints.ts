import {Assignment} from './assignment';
import {Graph} from './graph';

type Checker<V> = (v1: V, v2: V) => boolean;

function runChecks<V>(v1: V, v2: V, checkers: Checker<V>[]): boolean {
    for (let c of checkers)
        if (!c(v1, v2))
            return false;
    return true;
}

function wrap<T>(data: T | T[]): T[] {
    if (data instanceof Array)
        return data;
    else
        return [data];
}

export class Constraints<K, V> {
    graph: Graph<K, Checker<V>[]>;

    constructor() {
        this.graph = new Graph();
    }

    isConsistent(k1: K, v1: V, k2: K, v2: V): boolean {
        let edge = this.graph.getEdge(k1, k2);
        if (edge === undefined) // no constraints between k1 and k2
            return true;

        let checks = edge.weight;
        return runChecks(v1, v2, checks);
    }

    check_partial(assignment: Assignment<[K, V]>): boolean {
        for (const [k1, v1] of assignment.entries()) {
            let adj = this.graph.adjacency(k1);
            if (adj === undefined) // k1 is isolated
                continue;
            for (let edge of adj) {
                let k2 = (edge.node1 === k1) ? edge.node2 : edge.node1;
                let v2 = assignment.get(k2);
                if (v2 !== undefined && !runChecks(v1, v2, edge.weight)) {
                    console.log(`failed: ${k1} and ${k2}`)
                    return false;
                }
            }
        }
        return true;
    }

    addConstraint(k1: K, k2: K, checks: Checker<V> | Checker<V>[]): Constraints<K, V> {
        checks = wrap(checks);
        let edge = this.graph.getEdge(k1, k2);
        if (edge === undefined)
            this.graph.addEdge(k1, k2, checks);
        else
            for (let c of checks)
                edge.weight.push(c);

        return this;
    }
}
