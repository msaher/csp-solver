import {MapAssign} from './assignment'

export type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Position = [Digit, Digit];

export class SudokuAssign extends MapAssign<[Position, Digit]> {}

