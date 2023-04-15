import {Assignment} from './assignment';
import {Graph} from './graph';

type Checker<K, V> = (k1: K, v1: V, k2: K, v2: V) => boolean;

function runChecks<K, V>(k1: K, v1: V, k2: K, v2: V, checkers: Checker<K, V>[]): boolean {
    for (let c of checkers)
        if (!c(k1, v1, k2, v2))
            return false;
    return true;
}

class Constraints<K, V> {
    graph: Graph<K, Checker<K, V>[]>;

    constructor(graph: Graph<K, Checker<K, V>[]>) {
        this.graph = graph;
    }

    isConsistent(k1: K, v1: V, k2: K, v2: V): boolean {
        let edge = this.graph.getEdge(k1, k2);
        if (edge === undefined)
            return true;

        let checkers = edge.weight;
        return runChecks(k1, v1, k2, v2, checkers);
    }

    checkAssignment(assignment: Assignment<[K, V]>): boolean {
        for (const [k1, v1] of assignment.entries()) {
            let adj = this.graph.adjacency(k1);
            if (adj === undefined)
                continue;
            for (let edge of adj) {
                let k2 = (edge.node1 === k1) ? edge.node2 : edge.node1;
                let v2 = assignment.get(k2);
                if (v2 !== undefined && !runChecks(k1, v1, k2, v2, edge.weight))
                    return false;
            }
        }
        return true;
    }
}
