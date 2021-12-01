import { csv, select } from 'd3';
import {main as showLine} from './lineView';
import {main as showFlowerChart} from './flowerView';

showLine('.line-chart');
showLine('.line-chart-2');
showFlowerChart('.flower-chart');
