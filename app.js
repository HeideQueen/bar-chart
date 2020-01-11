document.addEventListener('DOMContentLoaded', getData);

async function getData() {
  const res = await fetch(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  );

  const { data } = await res.json();

  generateBarChart(data);
}

function generateBarChart(data) {
  const w = 800;
  const h = 350;

  const div = d3
    .select('body')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0);

  const svg = d3
    .select('#bar-chart')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .attr('overflow', 'visible')
    .style('background-color', 'azure');

  const xScale = d3
    .scaleLinear()
    .domain([0, data.length])
    .range([0, w]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d[1])])
    .range([h, 0]);

  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('data-date', d => d[0])
    .attr('data-gdp', d => d[1])
    .attr('x', (d, i) => xScale(i))
    .attr('y', d => yScale(d[1]))
    .attr('width', '2')
    .attr('height', d => h - yScale(d[1]))
    .attr('fill', 'aqua')
    .on('mouseover', d => {
      div.attr('data-date', d[0]);
      div
        .transition()
        .duration(100)
        .style('opacity', 0.9);
      div
        .html(d[0])
        .style('left', `${d3.event.pageX}px`)
        .style('top', `${d3.event.pageY}px`);
    })
    .on('mouseout', d => {
      div
        .transition()
        .duration(500)
        .style('opacity', 0);
    });

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${h})`)
    .call(xAxis);

  svg
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(0, 0)`)
    .call(yAxis);
}
