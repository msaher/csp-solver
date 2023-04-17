import {beforeEach, describe, expect, test} from '@jest/globals';
import {Position, Digit, SudokuAssign} from './sudoku'
import {MixAssign} from './mix'

describe('Assignment', () => {
    let assignment: SudokuAssign;
    beforeEach(() => {
        assignment = new SudokuAssign();
    })

    test('Adding positions', () => {
        assignment.set([[1,2], 9]);
        expect(assignment.get([1,2])).toBe(9);
        assignment.set([[2,2], 5]);
        expect(assignment.get([2,2])).toBe(5);
        assignment.set([[2,2], 5]);
        expect(assignment.get([2,2])).toBe(5);
        assignment.set([[2,4], 5]);
        expect(assignment.get([2,4])).toBe(5);
        assignment.set([[5,4], 2]);
        expect(assignment.get([5,4])).toBe(2);
        assignment.set([[9,1], 2]);
        expect(assignment.get([9,1])).toBe(2);
        assignment.set([[5,5], 8]);
        expect(assignment.get([5,5])).toBe(8);
    });

    test('Iterating over entires', () => {
        let arr = [[[1,2], 9], [[2,2], 5], [[2,4], 5], [[5,4], 2], [[9,1], 2], [[5,5], 8]];
        for (let p of arr)
            assignment.set(p as [Position, Digit]);

        let entries = [];
        for (const [k, v] of assignment.entries())
            entries.push([k, v]);

        expect(entries).toEqual(arr);
    });

})

describe('Mix assignment', () => {
    let assignment: MixAssign;

    beforeEach(() => {
        assignment = new MixAssign();
    })

    test('Assigning a color', () => {
        assignment.set(['NSW', 'R'])
        assignment.set([[9, 5], 8]);
        expect(assignment.get('NSW')).toBe('R');
        expect(assignment.get([9, 5])).toBe(8);
    })

    test('Checking entires', () => {
        assignment.set(['NSW', 'R'])
        assignment.set([[9, 5], 8]);
        expect(assignment.get('NSW')).toBe('R');
        expect(assignment.get([9, 5])).toBe(8);
    })

})
