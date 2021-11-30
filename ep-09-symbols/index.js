import { csv, select } from 'd3';
import { scatterPlot } from './scatterPlot'

const csvUrl = [
  'https://gist.githubusercontent.com/',
  'curran/a08a1080b88344b0c8a7',
  '/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/',
  'iris.csv'
].join('');

const parseRow = (d) => {
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  return d;
}

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const main = async () => {
  const data = await csv(csvUrl, parseRow);
  svg.call(scatterPlot()
    .width(width)
    .height(height)
    .data(data)
    .xValue((d) => d.petal_length)
    .yValue((d) => d.sepal_length)
    .symbolValue((d) => d.species)
    .margin({
      top: 20, right: 20, bottom: 40, left: 50
    })
    .size(50)
  );
}

main();