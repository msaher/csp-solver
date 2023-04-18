import {Region, Color} from './graph_coloring';
import {Position, Digit} from './sudoku';
import {Assignment} from './assignment';

export class MixAssign extends Assignment<[Position, Digit] | [Region, Color]> {}
