import {Region, Color} from './graph_coloring';
import {Position, Digit} from './sudoku';
import {Assignment} from './assignment';

type CoolKey = Position | Region;
type CoolValue = Color | Digit;

export class MixAssign implements Assignment {
    map: Map<CoolKey, CoolValue>;

    constructor(map: Map<CoolKey, CoolValue>) {
        this.map = map;
    }

    set(key: Position, value: Digit): void;
    set(key: Region, value: Color): void;
    set(key: CoolKey, value: CoolValue): void {
        this.map.set(key, value);
    }

    get(key: Position): Digit;
    get(key: Region): Color;
    get(key: CoolKey): CoolValue | undefined {
        return this.map.get(key);
    }
}
