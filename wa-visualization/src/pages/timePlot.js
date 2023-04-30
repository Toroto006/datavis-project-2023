import * as d3 from "d3";
import {contactStatsDict, messageStats, groupDict, messageDict, contactDict, stringDict, counter} from '../state/types'


function create_time_plot(datae, containerId){

  console.log("azrazerazer")
// Example data for times of events happening
const data = [
  {time: "6:00 AM", count: 5},
  {time: "9:00 AM", count: 10},
  {time: "12:00 PM", count: 7},
  {time: "3:00 PM", count: 15},
  {time: "6:00 PM", count: 9},
  {time: "9:00 PM", count: 3}
];

 // Define dimensions and margins for the SVG element
  const width = 600;
  const height = 600;
  const margin = 50;
  const radius = Math.min(width, height) / 2 - margin;

  // Create a new SVG element
  const svg = d3.select(`#${containerId}`)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // Define a color scale for the slices
  const colorScale = d3.scaleOrdinal()
    .domain(data.map(d => d.time))
    .range(d3.schemeSet2);

  // Define a pie layout based on the count values
  const pie = d3.pie()
    .value(d => d.count);

  // Generate the pie slices and add them to the SVG
  const slices = svg.selectAll("slice")
    .data(pie(data))
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr("fill", d => colorScale(d.data.time))
    .attr("stroke", "white")
    .style("stroke-width", "2px");

  // Add a legend to the chart
  const legend = svg.selectAll(".legend")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => `translate(${radius + margin}, ${i * 25 - radius})`);

  legend.append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", d => colorScale(d.time));

  legend.append("text")
    .attr("x", 30)
    .attr("y", 10)
    .text(d => d.time);

      console.log("azrazerazer")

}