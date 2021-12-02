import {
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  transition,
  scalePoint,
  schemeCategory10,
  scaleOrdinal,
} from "d3";

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
  let xType;
  let yType;
  let category;
  let filter;

  const my = (selection) => {
    const color = scaleOrdinal(schemeCategory10).domain(
      data.map((d) => d.species)
    );

    let x;

    if (xType === "categorical")
      x = scalePoint().domain(data.map(xValue)).padding(1).round(true);
    else x = scaleLinear().domain(extent(data, xValue));

    x.range([margin.left, width - margin.right]);

    let y;
    if (yType === "categorical")
      y = scalePoint().domain(data.map(yValue)).padding(0.2).round(true);
    else y = scaleLinear().domain(extent(data, yValue));

    y.range([height - margin.bottom, margin.top]);

    // Data processing
    const marks = data
      .filter((d) => (filter ? filter(d) : true))
      .map((d) => ({
        x: x(xValue(d)),
        y: y(yValue(d)),
        color: category ? color(category(d)) : "",
        title: `( ${xValue(d)} , ${yValue(d)} )`,
        id: d.id,
      }));

    const t = transition().duration(1000);

    const initializeRadius = (circles) => {
      circles.attr("r", 0);
    };

    const growRadius = (circles) => {
      circles.transition(t).attr("r", radius);
    };

    const positionCircles = (circles) => {
      circles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    };

    // Rendering
    const circles = selection
      .selectAll("circle")
      .data(marks, (d) => d.id)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("fill", (d) => d.color)
            .call(initializeRadius)
            .call(positionCircles)
            .call(growRadius),
        (update) =>
          update.call((update) =>
            update
              .attr("fill", (d) => d.color)
              .transition(t)
              .delay((d, i) => i * 15)
              .call(positionCircles)
          ),
        (exit) =>
          exit.call((exit) =>
            exit
              .transition(t)
              .duration(100)
              .delay((d, i) => i * Math.random() * 10)
              .attr("r", 0)
              .remove()
          )
      );

    selection
      .selectAll(".y-axis")
      .data([null])
      .join("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(axisLeft(y))
      .selectAll(".y-label")
      .data([null])
      .join("text")
      .attr("class", "y-label")
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("transform", `rotate(-90)`)
      .attr("x", -height / 2)
      .attr("y", -40)
      .text(yLabel);

    const xAxis = selection
      .selectAll(".x-axis")
      .data([null])
      .join("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call((xAxis) => xAxis.transition(t).call(axisBottom(x)));

    xAxis
      .selectAll(".x-label")
      .data([null])
      .join("text")
      .attr("class", "x-label")
      .attr("fill", "black")
      .attr("x", width / 2)
      .attr("y", 40)
      .transition(t)
      .attr("y", height + 100)
      .transition(t)
      .attr("y", 40)
      .text(xLabel);
  };

  my.width = function (_) {
    return arguments.length ? ((width = +_), my) : width;
  };

  my.height = function (_) {
    return arguments.length ? ((height = +_), my) : height;
  };

  my.data = function (_) {
    return arguments.length ? ((data = _), my) : data;
  };

  my.xValue = function (_) {
    return arguments.length ? ((xValue = _), my) : xValue;
  };

  my.yValue = function (_) {
    return arguments.length ? ((yValue = _), my) : yValue;
  };

  my.margin = function (_) {
    return arguments.length ? ((margin = _), my) : margin;
  };

  my.radius = function (_) {
    return arguments.length ? ((radius = +_), my) : radius;
  };

  my.xLabel = function (_) {
    return arguments.length ? ((xLabel = _), my) : xLabel;
  };

  my.yLabel = function (_) {
    return arguments.length ? ((yLabel = _), my) : yLabel;
  };

  my.xType = function (_) {
    return arguments.length ? ((xType = _), my) : xType;
  };

  my.yType = function (_) {
    return arguments.length ? ((yType = _), my) : yType;
  };

  my.category = function (_) {
    return arguments.length ? ((category = _), my) : category;
  };

  my.filter = function (_) {
    return arguments.length ? ((filter = _), my) : filter;
  };

  return my;
};
