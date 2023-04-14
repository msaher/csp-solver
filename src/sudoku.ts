import {Assignment} from './assignment'

export type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Position = [Digit, Digit]

class SudokuAssign implements Assignment<Position, Digit> {
    map: Map<Position, Digit>
    constructor(map: Map<Position, Digit>) {
        this.map = map;
    }

    set(pos: Position, dig: Digit) {
        return this.map.set(pos, dig);
    }

    get(pos: Position): Digit | undefined {
        return this.map.get(pos);
    }
}
