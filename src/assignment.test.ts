import {beforeEach, describe, expect, test} from '@jest/globals';
import {Assignment} from './Assignment';

const digits = [1,2,3,4,5,6,7,8,9] as const;
type Digit = typeof digits[number];
const positions = [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9], ] as const
type Position = [Digit, Digit];

const colors = ["R", "G", "B"] as const;
type Color = typeof colors[number];
const regions = ["WA", "NT", "SA", "Q", "NSW", "V", "T"] as const;
type Region = typeof regions[number];

class SudokuAssign extends Assignment<[Position, Digit]> {}
class MixAssign extends Assignment<[Position, Digit] | [Region, Color]> {}
// class AusterliaAssign extends Assignment<[Region, Color]> {}

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
