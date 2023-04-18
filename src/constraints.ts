import {Assignment} from './assignment';
import {Graph} from './graph';
import {wrap} from './utils'
import {isEqual} from 'lodash';

type Checker<V> = (v1: V, v2: V) => boolean;

function runChecks<V>(v1: V, v2: V, checkers: Checker<V>[]): boolean {
    for (let c of checkers)
        if (!c(v1, v2))
            return false;
    return true;
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

    checkPartial(assignment: Assignment<[K, V]>): boolean {
        for (const [k1, v1] of assignment.entries()) {
            let adj = this.graph.adjacency(k1);
            if (adj === undefined) // k1 is isolated
                continue;
            for (let edge of adj) {
                let k2 = (isEqual(edge.node1, k1)) ? edge.node2 : edge.node1;
                let v2 = assignment.get(k2);
                if (v2 !== undefined && !runChecks(v1, v2, edge.weight))
                    return false;
            }
        }
        return true;
    }

    add(k1: K, k2: K, checks: Checker<V> | Checker<V>[], directed?: boolean): Constraints<K, V> {
        checks = wrap(checks);
        let edge = this.graph.getEdge(k1, k2);
        if (edge === undefined)
            this.graph.addEdge(k1, k2, checks, directed);
        else
            for (let c of checks)
                edge.weight.push(c);

        return this;
    }

    get(k1: K, k2: K): Checker<V>[] | undefined {
        let edge = this.graph.getEdge(k1, k2);
        if (edge !== undefined)
            [...edge.weight];
        else
            return undefined;
    }

    adjacency(k1: K): K[] | undefined {
        let edges = this.graph.adjacency(k1);
        if (edges === undefined)
            return undefined

        return edges.map((e) => isEqual(e.node1, k1) ? e.node2 : e.node1);
    }
}
