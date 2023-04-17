import {HashMap} from './HashMap';
// undirected edge
export type Edge<N1, W, N2 = N1> = {
    node1: N1,
    node2: N2,
    weight: W,
};

// undirected graph
export class Graph<N, W> {
    hmap: HashMap<N, Edge<N, W>[]>;

    constructor(hmap?: HashMap<N, Edge<N, W>[]>) {
        if (hmap === undefined)
            this.hmap = new HashMap();
        else
            this.hmap = hmap;
    }

    addEdge(node1: N, node2: N, weight: W, directed?: boolean): Graph<N, W> {
        let edge = {node1, node2, weight};
        if (directed)
            return this.addDiEdge(node1, edge);
        return this.addBiEdge(node1, node2, edge);
    }

    addDiEdge(node1: N, edge: Edge<N, W>): Graph<N, W> {
        let adj1 = this.hmap.get(node1);
        if (adj1 === undefined)
            adj1 = this.addNode(node1);

        adj1.push(edge);
        return this;
    }

    addBiEdge(node1: N, node2: N, edge: Edge<N, W>): Graph<N, W> {
        this.addDiEdge(node1, edge);
        this.addDiEdge(node2, edge);
        return this;
    }

    addNode(node: N): Edge<N, W>[] {
        let edges = this.hmap.get(node);
        if (edges !== undefined)
            return edges;
        edges = [];
        this.hmap.set(node, edges);

        return edges;
    }

    adjacency(node1: N): Edge<N, W>[] | undefined {
        return this.hmap.get(node1);
    }

    getEdge(node1: N, node2: N): Edge<N, W> | undefined {
        let adj = this.hmap.get(node1);
        if (adj === undefined)
            return undefined;

        for (let edge of adj)
            if (node2 === edge.node1 || node2 === edge.node2)
                return edge;

        return undefined;
    }
}
