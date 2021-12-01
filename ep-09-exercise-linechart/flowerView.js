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

const chart = scatterPlot()
  .xValue((d) => d.petal_length)
  .yValue((d) => d.sepal_length)
  .yLabel('Sepal length')
  .xLabel('Petal length')
  .symbolValue((d) => d.species)
  .margin({
    top: 20, right: 20, bottom: 40, left: 50
  })
  .size(50);

 
export const main = async (wrapElement) => {
  const svgElement = wrapElement + ' svg';

  const data = await csv(csvUrl, parseRow);

  const resizeObserver = new ResizeObserver((entries) => {
    const entry = entries[0];
    const width = entry.contentRect.width;
    const height = entry.contentRect.height;

    select(svgElement)
      .call(chart
        .width(width)
        .height(height)
        .data(data));
  });

  resizeObserver.observe(document.querySelector(wrapElement));
  
}
