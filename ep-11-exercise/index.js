import { csv, select } from 'd3';
import { scatterPlot } from './scatterPlot'
import { menu } from './menu';

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

const menuContainer = select('body')
  .append('div')
  .attr('class', 'menu-container');

const xMenu = menuContainer.append('div');
const yMenu = menuContainer.append('div');

const main = async () => {
  const data = await csv(csvUrl, parseRow);
  const plot = scatterPlot()
    .width(width)
    .height(height)
    .data(data)
    .xValue((d) => d.petal_width)
    .yValue((d) => d.petal_width)
    .yLabel('Petal Width 🌼')
    .xLabel('Petal Width 🌼')
    .margin({
      top: 30, right: 20, bottom: 50, left: 60
    })
    .radius(3);
  
  svg.call(plot);

  const options = [
    {value: 'petal_width', text:'Petal Width 🌼'},
    {value: 'sepal_width', text:'Sepal Width 🌱'},
    {value: 'petal_length', text:'Petal Length 🌼'},
    {value: 'sepal_length', text:'Sepal Length 🌱'},
    {value: 'species', text:'Species 💐'},
  ];
  
  const columnLabel = (column) =>
    options.find(opt => opt.value === column).text;

  xMenu.call(
    menu().id('x-menu').labelText('X:')
    .options(options)
    .on('change', (column) => {
      plot
        .xValue((d) => d[column])
        .xLabel(columnLabel(column));
      svg.call(plot);
    })
  );

  yMenu.call(menu().id('y-menu').labelText('Y:')
    .options(options)
    .on('change', function(column) {
      plot
        .yValue((d) => d[column])
        .yLabel(columnLabel(column));
      svg.call(plot)
    })
  );

  // let i = 0;
  // setInterval(() => {
  //   const { column, name } = columns[i % columns.length];
  //   i++;
  //   plot.xValue((d) => d[column]).xLabel(name);
  //   svg.call(plot)
  // }, 3000);
}

main();