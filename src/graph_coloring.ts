import {HashAssign} from './assignment'

const colors = ["R", "G", "B"] as const;
export type Color = typeof colors[number];

const regions = ["WA", "NT", "SA", "Q", "NSW", "V", "T"] as const;
export type Region = typeof regions[number];

export class AusterliaAssign extends HashAssign<[Region, Color]> {}


