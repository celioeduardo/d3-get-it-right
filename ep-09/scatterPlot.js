import { scaleLinear, extent, axisLeft, axisBottom } from 'd3';

export const scatterPlot = () => {
  let width;
  let height;
  let data;
  let xValue;
  let yValue;
  let margin;
  let radius;

  const my = (selection) => {

    const x = scaleLinear()
      .domain(extent(data, xValue))
      .range([margin.left, width - margin.right]);
    const y = scaleLinear()
      .domain(extent(data, yValue))
      .range([height - margin.bottom, margin.top]);

    // Data processing
    const marks = data.map(d => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
      title: `( ${xValue(d)} , ${yValue(d)} )`
    }));

    // Rendering
    selection.selectAll('circle')
      .data(marks)
      .join('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', radius)
      .append('title')
      .text(d => d.title);

    selection.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(axisLeft(y))

    selection.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(axisBottom(x))

  };

  my.width = function (_) {
    return arguments.length ? (width = +_, my) : width;
  };

  my.height = function (_) {
    return arguments.length ? (height = +_, my) : height;
  }

  my.data = function (_) {
    return arguments.length ? (data = _, my) : data;
  }

  my.xValue = function (_) {
    return arguments.length ? (xValue = _, my) : xValue;
  }
  
  my.yValue = function (_) {
    return arguments.length ? (yValue = _, my) : yValue;
  }

  my.margin = function (_) {
    return arguments.length ? (margin = _, my) : margin;
  }
  
  my.radius = function (_) {
    return arguments.length ? (radius = +_, my) : radius;
  }

  return my;
}