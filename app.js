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

  const svg = d3
    .select('#bar-chart')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .style('background-color', 'azure');

  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('data-date', d => d[0])
    .attr('data-gdp', d => d[1])
    .attr('x', (d, i) => (i * w) / data.length)
    .attr('y', d => h - d[1] / 60)
    .attr('width', '2')
    .attr('height', d => d[1] / 60);
}
