import { csv, select } from "d3";
import { scatterPlot } from "./scatterPlot";
import { menu } from "./menu";

const csvUrl = [
  "https://gist.githubusercontent.com/",
  "curran/a08a1080b88344b0c8a7",
  "/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/",
  "iris.csv",
].join("");

const parseRow = (d, i) => {
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  d.id = i;
  return d;
};

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const menuContainer = select("body")
  .append("div")
  .attr("class", "menu-container");

const xMenu = menuContainer.append("div");
const yMenu = menuContainer.append("div");
const specieMenu = menuContainer.append("div");

const main = async () => {
  let specie = "all";

  const data = await csv(csvUrl, parseRow);
  const plot = scatterPlot()
    .width(width)
    .height(height)
    .data(data)
    .xValue((d) => d.petal_width)
    .xLabel("Petal Width 🌼")
    .xType("quantitative")
    .yValue((d) => d.petal_width)
    .yLabel("Petal Width 🌼")
    .yType("quantitative")
    .category((d) => d.species)
    .margin({
      top: 30,
      right: 20,
      bottom: 50,
      left: 60,
    })
    .radius(3);

  svg.call(plot);

  const options = [
    { value: "petal_width", text: "Petal Width 🌼", type: "quantitative" },
    { value: "sepal_width", text: "Sepal Width 🌱", type: "quantitative" },
    { value: "petal_length", text: "Petal Length 🌼", type: "quantitative" },
    { value: "sepal_length", text: "Sepal Length 🌱", type: "quantitative" },
    { value: "species", text: "Species 💐", type: "categorical" },
  ];

  const specieOptions = [
    "all",
    ...new Map(data.map((d) => [d.species, d.species])).keys(),
  ].map((d) => ({ value: d, text: d }));

  const columnsByType = new Map(
    options.map((column) => [column.value, column])
  );

  // Option using find
  // const columnLabel = (column) =>
  //   options.find((opt) => opt.value === column).text;

  const specieFilter = (d) => specie === "all" || d.species === specie;

  xMenu.call(
    menu()
      .id("x-menu")
      .labelText("X:")
      .options(options)
      .on("change", (column) => {
        plot
          .data(data.filter(specieFilter))
          .xValue((d) => d[column])
          .xLabel(columnsByType.get(column).text)
          .xType(columnsByType.get(column).type);
        svg.call(plot);
      })
  );

  yMenu.call(
    menu()
      .id("y-menu")
      .labelText("Y:")
      .options(options)
      .on("change", function (column) {
        plot
          .data(data.filter(specieFilter))
          .yValue((d) => d[column])
          .yLabel(columnsByType.get(column).text)
          .yType(columnsByType.get(column).type);
        svg.call(plot);
      })
  );

  specieMenu.call(
    menu()
      .id("species-menu")
      .labelText("specie:")
      .options(specieOptions)
      .on("change", function (_specie) {
        specie = _specie;
        plot.data(data.filter(specieFilter));
        svg.call(plot);
      })
  );

  // let i = 0;
  // setInterval(() => {
  //   const { column, name } = columns[i % columns.length];
  //   i++;
  //   plot.xValue((d) => d[column]).xLabel(name);
  //   svg.call(plot)
  // }, 3000);
};

main();
