import { scaleLinear, extent, axisLeft, axisBottom, symbols, symbol, scaleOrdinal } from 'd3';

export const scatterPlot = () => {
  let width;
  let height;
  let data;
  let xValue;
  let yValue;
  let symbolValue;
  let margin;
  let size;

  const my = (selection) => {
    
    const x = scaleLinear()
      .domain(extent(data, xValue))
      .range([margin.left, width - margin.right]);

    const y = scaleLinear()
      .domain(extent(data, yValue))
      .range([height - margin.bottom, margin.top]);

    const symbolScale = scaleOrdinal()
      .domain(data.map(symbolValue))
      .range(symbols);
    
    const symbolGenerator = symbol().size(size);

    // Data processing
    const marks = data.map(d => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
      pathD: symbolGenerator.type(symbolScale(symbolValue(d)))(),
      title: `( ${xValue(d)} , ${yValue(d)} ) ${symbolValue(d)}`
    }));

    // Rendering
    selection.selectAll('path')
      .data(marks)
      .join('path')
      .attr('d', d => d.pathD)
      .attr('transform', d => `translate(${d.x},${d.y})`)
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

  my.size = function (_) {
    return arguments.length ? (size = +_, my) : size;
  }

  my.symbolValue = function (_) {
    return arguments.length ? (symbolValue = _, my) : symbolValue;
  }

  return my;
}