import React, { useState, useEffect } from 'react';
import { Grid, Container, Paper, Box, Stack, Button } from '@mui/material';
import ActorsNetwork from './ActorsNetwork';
import shortestPath from '../utils/bfs';
import { Queue, Node } from './BFSElements';
import ActorChip from './ActorChip';

export default function Visualizer({ data }) {
  const from = '163';
  const to = '158';
  const fromNode = data.nodes.find((node) => node.id === from)
  const toNode = data.nodes.find((node) => node.id === to)

  const bfs_solution = shortestPath(from, to, data);
  console.log(bfs_solution);
  const [highlight, setHighlight] = useState([from]);
  const [frontier, setFrontier] = useState([]);
  const [explored, setExplored] = useState([]);
  const [solutionFound, setSolutionFound] = useState(false);
  const [index, setIndex] = useState(0);
  const [current, setCurrent] = useState();

  const handleReset = () => {
    setIndex(0);
  };
  const handleNext = () => {
    setIndex(index + 1);
  };

  useEffect(() => {
    const step = bfs_solution.steps[index];

    // Set the current node
    const currentNode = data.nodes.find(node => node.id === step.current);
    setCurrent(currentNode);

    // Update frontier and explored nodes based on the current step
    setFrontier(
      step.frontier.map((id) => data.nodes.find((node) => node.id === id))
    );
    setExplored(
      step.explored.map((id)=> data.nodes.find((node) => node.id === id))
    );
    setSolutionFound(step.solutionFound);

    setHighlight(step.current);

  }, [index]);

  return (
    <Container sx={{ marginBottom: 2 }}>
      <Paper>
        <Box sx={{ padding: 1 }}>
          <h3>
            Lets visualize the steps to find the defrees of separation between{' '}
            {<ActorChip name={fromNode.name} src={fromNode.img} />} and 
            {<ActorChip name={toNode.name} src={toNode.img} />}.
          </h3>
          <p>
            Press 'next' to see the steps taken by the algorithm taken to get to
            the solution.
          </p>
        </Box>

        <Grid container>
          <Grid item xs={3} sx={{ margin: 1, padding: 1 }}>
            <Grid container spacing={4}>
              <Grid item>
                <h4> Exploring</h4>
                {current && !explored.includes(current) ? (
                  <Node node={current} />
                ) : (
                  <div style={{ minHeight: '40px' }}></div>
                )}
              </Grid>
              <Grid item>
                <h4> Target</h4>

                <Node node={data.nodes.filter(node => node.id === to)[0]} />
              </Grid>
            </Grid>
            <h4>Frontier</h4>
            <Queue nodes={frontier} />
            <h4>Explored</h4>
            <Queue nodes={explored} />
            {solutionFound && <h2>Solution Found!</h2>}
          </Grid>
          <Grid item xs={6}>
            <ActorsNetwork
              data={data}
              to={solutionFound ? to : null}
              from={solutionFound ? from : null}
              highlight={solutionFound ? null : highlight}
              hideLinks={true}
            />
          </Grid>
        </Grid>
        <Container sx={{ marginBottom: 2, padding: 1 }}>
          <Stack spacing={2} sx={{ marginBottom: 2 }} direction='row'>
            <Button variant='outlined' onClick={handleReset}>
              Reset
            </Button>
            <Button
              variant='contained'
              onClick={handleNext}
              disabled={solutionFound}
            >
              Next
            </Button>
          </Stack>
        </Container>
      </Paper>
    </Container>
  );
}
