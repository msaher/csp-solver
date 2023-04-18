import {Region, Color} from './graph_coloring';
import {Position, Digit} from './sudoku';
import {Assignment} from './Assignment';

export class MixAssign extends Assignment<[Position, Digit] | [Region, Color]> {}
