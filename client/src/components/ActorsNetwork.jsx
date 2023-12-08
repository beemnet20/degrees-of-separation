import { Paper, Container } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function drag(simulation) {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3
    .drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
}

export default function ActorsNetwork(props) {
  const {data} = props
  const ref = useRef(null);
  const initialized = useRef(false);
  const width = 928;
  const height = 600;
  const nodeRadius = 25;
  // Specify the color scale.
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    // Create SVG container
    const svg = d3
      .select(ref.current)
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .style('font', '12px sans-serif');

    // Define patterns
    const defs = svg.append('svg:defs');
    data.nodes.forEach((node, index) => {
      defs
        .append('pattern')
        .attr('id', `image${index}`)
        .attr('width', 1)
        .attr('height', 1)
        .append('image')
        .attr('xlink:href', node.img)
        .attr('width', nodeRadius * 3)
        .attr('height', nodeRadius * 3)
        .attr('x', -nodeRadius / 2);
      // .attr('y', -nodeRadius);
    });

    // Define the force simulation
    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        'link',
        d3.forceLink(data.links).id((d) => d.id),
      )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('x', d3.forceX())
      .force('y', d3.forceY());

    // Define links
    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.8)
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke-width', (d) => Math.sqrt(d.value))
      .on('mouseover', (event, d) => {
        // Show the tooltip and set its content
        d3.select('#tooltip')
          .style('visibility', 'visible')
          .html(`${d.title}-${d.year}`)
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 10 + 'px');
      })
      .on('mousemove', (event) => {
        // Position the tooltip as the mouse moves
        d3.select('#tooltip')
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 10 + 'px');
      })
      .on('mouseout', () => {
        // Hide the tooltip
        d3.select('#tooltip').style('visibility', 'hidden');
      });

    // Define nodes
    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', nodeRadius)
      .attr('fill', (d, i) => `url(#image${i})`)
      .call(drag(simulation))
      .on('mouseover', (event, d) => {
        // Show the tooltip and set its content
        d3.select('#tooltip')
          .style('visibility', 'visible')
          .html(`Name: ${d.name}<br>Born: ${d.birth}`)
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 10 + 'px');
      })
      .on('mousemove', (event) => {
        // Position the tooltip as the mouse moves
        d3.select('#tooltip')
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 10 + 'px');
      })
      .on('mouseout', () => {
        // Hide the tooltip
        d3.select('#tooltip').style('visibility', 'hidden');
      });

    // ... rest of your D3 code

    // Update and restart the simulation on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    });
  }, []);

  return (
    <Container>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <svg ref={ref} width={width} height={height}></svg>
        <div
          id='tooltip'
          style={{
            position: 'absolute',
            visibility: 'hidden',
            backgroundColor: 'white',
            padding: '5px',
            border: '1px solid lightgray',
            borderRadius: '5px',
            pointerEvents: 'none',
          }}
        ></div>
      </Paper>
    </Container>
  );
}
