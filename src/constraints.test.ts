import {beforeEach, describe, expect, test} from '@jest/globals';
import {Constraints} from './constraints';
import {colors, regions, AusterliaAssign, Color, Region} from './graph_coloring'

describe('Graph coloring constraints', () => {
    let assignment: AusterliaAssign;
    let cons: Constraints<Region, Color>;
    let diff = (c1: Color, c2: Color) => {
        return c1 !== c2;
    };

    beforeEach(() => {
        cons = new Constraints();
        cons.add('SA', 'WA', diff);
        cons.add('SA', 'NT', diff);
        cons.add('SA', 'Q', diff);
        cons.add('SA', 'NSW', diff);
        cons.add('SA', 'V', diff);

        cons.add('WA', 'NT', diff);
        cons.add('NT', 'Q', diff);
        cons.add('Q', 'NSW', diff);
        cons.add('NSW', 'V', diff);

        assignment = new AusterliaAssign();
    });

    test('check consistency', () => {
        expect(cons.isConsistent('NSW', 'R', 'Q', 'R')).toBe(false);
        expect(cons.isConsistent('NSW', 'R', 'Q', 'B')).toBe(true);

        expect(cons.isConsistent('T', 'R', 'SA', 'R')).toBe(true);
        expect(cons.isConsistent('T', 'R', 'SA', 'G')).toBe(true);
        expect(cons.isConsistent('T', 'R', 'SA', 'B')).toBe(true);
    });

    test('Check partial assignment', () => {
        expect(cons.checkPartial(assignment)).toBe(true);

        assignment.set(['T', 'R']);
        expect(cons.checkPartial(assignment)).toBe(true);

        assignment.set(['SA', 'R']);
        assignment.set(['NT', 'R']);
        expect(cons.checkPartial(assignment)).toBe(false);

    });

    test('Check if a solution is valid', () => {
        assignment.set(['WA', 'R']);
        assignment.set(['NT', 'G']);
        assignment.set(['SA', 'B']);
        assignment.set(['Q', 'R']);
        assignment.set(['NSW', 'G']);
        assignment.set(['V', 'R']);

        assignment.set(['T', 'R']);

        expect(cons.checkPartial(assignment)).toBe(true);
    })
});
