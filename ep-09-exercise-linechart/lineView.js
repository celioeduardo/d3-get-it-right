import { select }  from 'd3';
import { linearChart } from './lineChart'

// Generating random data
const dataGenerator = () => {
  const result = [];
  const max = 50;
  for(let i=10; i < max; i++){
    result.push({
      seq: i,
      amount: Math.random() * 100
    });
  }
  return result;
}

// Setting up the chart properties
const chart = linearChart()
  .xValue((d) => d.seq)
  .yValue((d) => d.amount)
  .yLabel('Amount')
  .xLabel('Sequence')
  .margin({
    top: 20, right: 20, bottom: 40, left: 50
  });

export const main = (wrapElement) => {

  const svgElement = wrapElement + ' svg';

  const data = dataGenerator();

  const resizeObserver = new ResizeObserver(entries => {
    const entry = entries[0];
    const width = entry.contentRect.width;
    const height = entry.contentRect.height;
    
    console.log(entry, svgElement, width, height);
    
    const svg = select(svgElement);
    
    svg.call(chart
        .data(data)
        .width(width)
        .height(height));
  });

  resizeObserver.observe(document.querySelector(wrapElement));
  
}