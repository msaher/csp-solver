import {beforeEach, describe, expect, test} from '@jest/globals';
import {Csp} from './csp';
import {Constraints} from './constraints';
import {HashAssign} from './assignment';
import {HashMap} from './HashMap';

describe('Csp class', () => {

    test('sudoku', () => {
        type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 8 | 9;
        const domain: Digit[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        type Position = [Digit, Digit];

        let map = new HashMap<Position, Digit[]>();
        for (let i = 1; i <= 9; i++)
            for (let j = 1; j <= 9; j++)
                map.set([i, j] as Position, domain);

        let isdiff = (d1: Digit, d2: Digit) => d1 !== d2;
        let constraints = new Constraints<Position, Digit>();
        for (const [pos, _] of map.entries()) {
            // row constraints
            for (let i = 1; i <= 9; i++)
                if (i != pos[1])
                    constraints.add([pos[0], i as Digit], pos, isdiff, true);

            // column constraints
            for (let i = 1; i <= 9; i++)
                if (i != pos[0])
                    constraints.add([i as Digit, pos[1]], pos, isdiff, true);

            // square constraints
            let sqRow = Math.floor((pos[0] - 1) / 3) * 3 + 1
            let sqCol = Math.floor((pos[1] - 1) / 3) * 3 + 1
            for (let i = sqRow; i < sqRow + 3; i++)
                for (let j = sqCol; j < sqCol + 3; j++)
                    if (i != pos[0] && j != pos[1])
                        constraints.add(pos, [i, j] as Position, isdiff, true);

        }

        let csp = new Csp<[Position, Digit]>(map, constraints);
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
        type Color = 'R' | 'G' | 'B';
        const colors: Color[] = ['R', 'G', 'B'];

        type Region = "WA" | "NT" | "SA" | "Q" | "NSW" | "V" | "T";
        const regions: Region[] = ["WA", "NT", "SA", "Q", "NSW", "V", "T"];

        let map = new HashMap<Region, Color[]>;
        for (let reg of regions)
            map.set(reg, colors);

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

        let csp = new Csp<[Region, Color]>(map, cons);

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
