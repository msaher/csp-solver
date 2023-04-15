// undirected edge
export type Edge<N1, W, N2 = N1> = {
    node1: N1,
    node2: N2,
    weight: W,
};

// undirected graph
export class Graph<N, W> {
    map: Map<N, Edge<N, W>[]>;

    constructor(map: Map<N, Edge<N, W>[]>) {
        this.map = map;
    }

    addEdge(node1: N, node2: N, weight: W): Graph<N, W> {
        let adj1 = this.map.get(node1);
        if (adj1 === undefined)
            adj1 = this.addNode(node1);

        let adj2 = this.map.get(node2);
        if (adj2 === undefined)
            adj2 = this.addNode(node2);

        let edge = { node1, node2, weight, }

        adj1.push(edge);
        adj2.push(edge);

        return this;
    }

    addNode(node: N): Edge<N, W>[] {
        let edges = this.map.get(node);
        if (edges !== undefined)
            return edges;
        edges = [];
        this.map.set(node, edges);

        return edges;
    }

    adjacency(node1: N): Edge<N, W>[] | undefined {
        return this.map.get(node1);
    }

    getEdge(node1: N, node2: N): Edge<N, W> | undefined {
        let adj = this.map.get(node1);
        if (adj === undefined)
            return undefined;

        for (let edge of adj)
            if (node2 === edge.node1 || node2 === edge.node2)
                return edge;

        return undefined;
    }
}
