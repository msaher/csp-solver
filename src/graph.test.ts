import {beforeEach, describe, expect, test} from '@jest/globals';
import {Graph} from './graph'

describe('graph module', () => {

    let graph: Graph<string, number>;
    beforeEach(() => {
         graph = new Graph();
    })

    test('adding an edge', () => {
        graph.addEdge('A', 'B', 10);
        expect(graph.getEdge('A', 'X')).toBeUndefined()
        expect(graph.getEdge('A', 'B')).toEqual({
            node1: 'A',
            node2: 'B',
            weight: 10,
        })
    })

    test('getting an adjacency list', () => {
        graph.addEdge('X', 'A', 1);
        graph.addEdge('X', 'B', 2);
        graph.addEdge('X', 'C', 3);
        graph.addEdge('X', 'D', 4);
        let weights = graph.adjacency('X')?.map((edge) => edge.weight);
        expect(weights).toEqual([1,2,3,4]);
    })

    test('edges are bidirectional', () => {
        graph.addEdge('A', 'B', 99);
        let adja = graph.adjacency('A');
        let adjb = graph.adjacency('B');
        expect(adja).toEqual(adjb);
    })

    test('edges are directional', () => {
        graph.addEdge('A', 'B', 99, true);
        let adja = graph.adjacency('A');
        let adjb = graph.adjacency('B');
        expect(adja).not.toEqual(adjb);
    })

    test('allowing duplicate edges', () => {
        graph.addEdge('A', 'B', 10);
        graph.addEdge('A', 'B', 10);
        let len = graph.adjacency('A')?.length;
        expect(len).toBe(2);
    })

    test('adding an isolated node', () => {
        graph.addNode('A');
        let len = graph.adjacency('A')?.length;
        expect(len).toBe(0);
    })
})
