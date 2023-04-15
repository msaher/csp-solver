import {MapAssign} from './assignment'

export type Color = "R" | "G" | "B";
export type Region = "WA" | "NT" | "SA" | "Q" | "NSW" | "V" | "T";

export class AusterliaAssign extends MapAssign<[Region, Color]> {}


