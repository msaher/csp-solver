import {Region, Color} from './graph_coloring';
import {Position, Digit} from './sudoku';
import {HashAssign} from './assignment';

export class MixAssign extends HashAssign<[Position, Digit] | [Region, Color]> {}
