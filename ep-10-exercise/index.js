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
  const plot = scatterPlot()
    .width(width)
    .height(height)
    .data(data)
    .xValue((d) => d.petal_length)
    .yValue((d) => d.sepal_length)
    .yLabel('Petal length')
    .xLabel('Sepal length')
    .margin({
      top: 20, right: 20, bottom: 50, left: 60
    })
    .radius(3);
  
  svg.call(plot);

  // const columns = [
  //   'petal_width',
  //   'sepal_width',
  //   'petal_length',
  //   'sepal_length'
  // ];
  const columns = [
    {column: 'petal_width', name:'Petal width 😄'},
    {column: 'sepal_width', name:'Sepal width'},
    {column: 'petal_length', name:'Petal length'},
    {column: 'sepal_length', name:'Sepal length'}
  ];

  let i = 0;
  setInterval(() => {
    const { column, name } = columns[i % columns.length];
    i++;
    plot.xValue((d) => d[column]).xLabel(name);
    svg.call(plot)
  }, 3000);
}

main();