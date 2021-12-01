import { scaleLinear, extent, axisLeft, axisBottom, transition } from 'd3';

export const scatterPlot = () => {
  let width;
  let height;
  let data;
  let xValue;
  let yValue;
  let margin;
  let radius;
  let xLabel;
  let yLabel;

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

    const t = transition().duration(1000);

    const initializeRadius = (circles) => {
      circles.attr('r', 0);
    }
    
    const growRadius = (circles) => {
      circles.transition(t).attr('r', radius);
    }

    const positionCircles = (circles) => {
      circles.attr('cx', d => d.x).attr('cy', d => d.y);
    }

    // Rendering
    const circles = selection.selectAll('circle')
      .data(marks)
      .join(
        (enter) => enter
          .append('circle')
          .call(initializeRadius)
          .call(positionCircles)
          .call(growRadius),
        (update) => update
          .call(update => update
            .transition(t)
            .delay((d, i) => i * 15)
            .call(positionCircles)
          ),
        (exit) => exit.remove());

    selection
      .selectAll('.y-axis')
      .data([null])
      .join('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(axisLeft(y))
      .selectAll('.y-label').data([null]).join('text')
      .attr('class','y-label')
      .attr('fill','black')
      .attr('text-anchor','middle')
      .attr('transform',`rotate(-90)`)
      .attr('x',-height/2)
      .attr('y',-40)
      .text(yLabel);

    const xAxis = selection
      .selectAll('.x-axis')
      .data([null])
      .join('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis => xAxis.transition(t).call(axisBottom(x)));
      
    xAxis.selectAll('.x-label').data([null]).join('text')
      .attr('class','x-label')
      .attr('fill','black')
      .attr('x',width/2)
      .attr('y', 40)
      .transition(t)
      .attr('y', height + 100)
      .transition(t)
      .attr('y', 40)
      .text(xLabel);

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

  my.xLabel = function (_) {
    return arguments.length ? (xLabel = _, my) : xLabel;
  }

  my.yLabel = function (_) {
    return arguments.length ? (yLabel = _, my) : yLabel;
  }

  return my;
}