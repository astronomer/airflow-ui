import * as d3 from 'd3';

const drawChart = (height: number, width: number): void => {
  d3.select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('border', '1px solid black')
    .append('text')
    .attr('fill', 'green')
    .attr('x', 50)
    .attr('y', 50)
    .text('Hello D3');
};

export default drawChart;
