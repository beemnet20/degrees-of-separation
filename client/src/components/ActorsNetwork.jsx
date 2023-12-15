import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Paper, Container } from '@mui/material';

function drag(simulationRef) {
  function dragstarted(event, d) {
    if (!event.active) simulationRef.current.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulationRef.current.alphaTarget(0);
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
  const { data, from, to } = props;
  const ref = useRef(null);
  const svg = useRef(null);
  const simulationRef = useRef(null);
  const width = 928;
  const height = 600;
  const nodeRadius = 25;

  useEffect(() => {
    if (!ref.current || svg.current) return;

    svg.current = d3
      .select(ref.current)
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .style('font', '12px sans-serif');

    const defs = svg.current.append('svg:defs');
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
    });

    const link = svg.current
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.8)
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke-width', (d) => Math.sqrt(d.value));

    const node = svg.current
      .append('g')
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', nodeRadius)
      .attr('fill', (d, i) => `url(#image${i})`)
      .call(drag(simulationRef));

    simulationRef.current = d3
      .forceSimulation(data.nodes)
      .force(
        'link',
        d3.forceLink(data.links).id((d) => d.id),
      )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('x', d3.forceX())
      .force('y', d3.forceY());

    simulationRef.current.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    });

    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!svg.current || !simulationRef.current) return;

    const updateGraph = () => {
      svg.current
        .selectAll('circle')
        .attr('stroke', (d) =>
          d.id === to || d.id === from ? '#87CEEB' : 'black',
        )
        .attr('stroke-width', (d) => (d.id === to || d.id === from ? 4 : 0.8));

      simulationRef.current.alpha(1).restart();
    };

    updateGraph();
  }, [to, from]);

  return (
    <Container>
      <Paper
        elevation={0}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
