import {Assignment} from './assignment'

export type Color = "R" | "G" | "B";
export type Region = "WA" | "NT" | "SA" | "Q" | "NSW" | "V" | "T";

export class AusterliaAssign implements Assignment<Region, Color> {
    map: Map<Region, Color>

    constructor(map: Map<Region, Color>) {
        this.map = map;
    }

    set(reg: Region, col: Color) {
        return this.map.set(reg, col);
    }

    get(reg: Region): Color | undefined {
        return this.map.get(reg);
    }
}
