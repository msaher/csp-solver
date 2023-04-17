import {beforeEach, describe, expect, test} from '@jest/globals';
import {Csp} from './csp';
import {Constraints} from './constraints';
import {HashAssign} from './assignment';

describe('Csp class', () => {

    test('sudoku', () => {
        const values = [1,2,3,4,5,6,7,8,9] as const;
        type Digit = typeof values[number];
        type Position = [Digit, Digit];

        let keys = [];
        for (let i = 1; i <= 9; i++)
            for (let j = 1; j <= 9; j++)
                keys.push([i, j]);

        let constraints = new Constraints<Position, Digit>();
        let isdiff = (d1: Digit, d2: Digit) => d1 !== d2;

        for (let pos of keys as Position[]) {
            // row constraints
            for (let i = 1; i <= 9; i++) {
                if (i != pos[1]) {
                    constraints.add([pos[0], i as Digit], pos, isdiff, true);
                }
            }

            // column constraints
            for (let i = 1; i <= 9; i++) {
                if (i != pos[0]) {
                    constraints.add([i as Digit, pos[1]], pos, isdiff, true);
                }
            }

            // square constraints
            let sqRow = Math.floor((pos[0] - 1) / 3) * 3 + 1
            let sqCol = Math.floor((pos[1] - 1) / 3) * 3 + 1
            for (let i = sqRow; i < sqRow + 3; i++) {
                for (let j = sqCol; j < sqCol + 3; j++) {
                    if (i != pos[0] && j != pos[1])
                        constraints.add(pos, [i, j] as Position, isdiff, true);
                }
            }
        }

        let variables = [...keys] as Position[];
        let domains = [...values] as Digit[];
        let csp = new Csp<[Position, Digit]>(variables, domains, constraints);

        let assignment = new HashAssign<[Position, Digit]>();

        assignment.set([[1, 1], 1]);
        expect(csp.checkPartial(assignment)).toBe(true);

        assignment.set([[1, 2], 1]);
        expect(csp.checkPartial(assignment)).toBe(false);

        assignment.delete([1, 2]);
        expect(csp.checkPartial(assignment)).toBe(true);

        assignment.set([[1, 2], 9])
        expect(csp.checkPartial(assignment)).toBe(true);

        assignment.set([[2, 2], 1])
        expect(csp.checkPartial(assignment)).toBe(false);

    });

    test('Graph coloring', () => {
        const colors = ['R', 'G', 'B'] as const;
        type Color = typeof colors[number];

        const regions = ["WA", "NT", "SA", "Q", "NSW", "V", "T"] as const;
        type Region = typeof regions[number];

        let isdiff = (c1: Color, c2: Color) => c1 !== c2;
        let cons = new Constraints<Region, Color>;
        cons = new Constraints();
        cons.add('SA', 'WA', isdiff);
        cons.add('SA', 'NT', isdiff);
        cons.add('SA', 'Q', isdiff);
        cons.add('SA', 'NSW', isdiff);
        cons.add('SA', 'V', isdiff);
        cons.add('WA', 'NT', isdiff);
        cons.add('NT', 'Q', isdiff);
        cons.add('Q', 'NSW', isdiff);
        cons.add('NSW', 'V', isdiff);

        let csp = new Csp<[Region, Color]>([...regions] as Region[], [...colors] as Color[], cons);

        let assignment = new HashAssign<[Region, Color]>();
        assignment.set(['WA', 'R']);
        assignment.set(['NT', 'G']);
        assignment.set(['SA', 'B']);
        assignment.set(['Q', 'R']);
        assignment.set(['NSW', 'G']);
        assignment.set(['V', 'R']);
        assignment.set(['T', 'R']);
        expect(csp.isComplete(assignment)).toBe(true);
        expect(csp.checkPartial(assignment)).toBe(true);
    })
})
