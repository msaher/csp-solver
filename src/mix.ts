import {Region, Color} from './graph_coloring';
import {Position, Digit} from './sudoku';
import {MapAssign} from './assignment';

class MixAssign extends MapAssign<[Position, Digit] | [Region, Color]> {}
