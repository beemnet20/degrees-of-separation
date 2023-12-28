import * as React from 'react';
import { useState } from 'react';
import {
  Paper,
  Container,
  ToggleButton,
  Grid,
  ToggleButtonGroup,
} from '@mui/material';
import ActorsNetwork from '../components/ActorsNetwork';
import smallData from '../assets/small_data';
import largeData from '../assets/large_data';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import shortestPath from '../utils/bfs';
import ActorChip from './ActorChip';

function DegreeOfSeparation() {
  const [inputs, setInputs] = useState({ from: '', to: '' });
  const [solution, setSolution] = useState(null);
  const [data, setData] = useState(smallData);
  const [dataType, setDataType] = useState('small');

  const handleDataToggle = (event, newDataType) => {
    if (newDataType !== null && newDataType !== dataType) {
      setDataType(newDataType);
      setInputs({ from: '', to: '' });
      setSolution(null);
    }
  };

  React.useEffect(() => {
    const newData = dataType === 'small' ? smallData : largeData;
    setData(newData);
    console.log(dataType);
    console.log(data);
  }, [dataType]);

  React.useEffect(() => {
    if (inputs.from && inputs.to) {
      const bfs_path = shortestPath(inputs.from, inputs.to, data);
      if (bfs_path.success) {
        setSolution(bfs_path.solution);
        console.log(solution);
      } else {
        setSolution(null);
        console.log('no solution found');
      }
    }
  }, [inputs, data]);

  return (
    <Container
      sx={{ justifyContent: 'center', alignItems: 'center', marginTop: 2 }}
    >
      <h1 style={{ color: '#330867' }}>
        Degrees of Separation: Data Structures and Algorithms Visualized
      </h1>
      <p>
        You've likely heard of
        <a
          href='https://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon'
          target='_blank'
          rel='noreferrer'
        >
          Six Degrees of Kevin Bacon
        </a>
        , A game in which an arbitrarily chosen actor's degree of separation is
        found via the movies they've acted in. Degrees of separation is also a
        great way to learn some of the basic elements of data structures and
        algorithms.
      </p>
      <p>
        First, lets take a look at the implemented degrees of separation finder.
        Select actors' names and see their degrees of separation.
      </p>

      <Grid
        m={2}
        container
        spacing={2}
        justifyContent='center'
        alignItems='center'
      >
        <Grid item>
          <ToggleButtonGroup
            exclusive
            value={dataType}
            onChange={handleDataToggle}
          >
            <ToggleButton sx={{ borderRadius: '15px' }} value='small'>
              Small data
            </ToggleButton>
            <ToggleButton sx={{ borderRadius: '15px' }} value='large'>
              Large data
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <FormControl
            sx={{ m: 1, minWidth: 300, height: '50px' }}
            size='small'
          >
            <InputLabel id='from-label'>From</InputLabel>
            <Select
              sx={{ borderRadius: '15px' }}
              labelId='from-label'
              id='from-select'
              value={inputs.from}
              label='From'
              onChange={(event) => {
                setInputs({
                  ...inputs,
                  from:
                    inputs.to !== event.target.value
                      ? event.target.value
                      : null,
                });
              }}
            >
              {data.nodes
                .filter((node) => node.id !== inputs.to)
                .map((node) => {
                  return (
                    <MenuItem key={`from-${node.id}`} value={node.id}>
                      <ActorChip name={node.name} src={node.img} />
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 300 }} size='small'>
            <InputLabel id='to-label'>To</InputLabel>
            <Select
              sx={{ borderRadius: '15px' }}
              labelId='to-label'
              id='to-select'
              value={inputs.to}
              label='To'
              onChange={(event) => {
                setInputs({
                  ...inputs,
                  to:
                    inputs.from !== event.target.value
                      ? event.target.value
                      : null,
                });
              }}
            >
              {data.nodes
                .filter((node) => node.id !== inputs.from)
                .map((node) => {
                  return (
                    <MenuItem key={`to-${node.id}`} value={node.id}>
                      <ActorChip name={node.name} src={node.img} />
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Paper>
        <ActorsNetwork
          key={dataType}
          data={dataType === 'small' ? smallData : largeData}
          from={inputs.from}
          to={inputs.to}
          solution={solution}
        />
      </Paper>
    </Container>
  );
}

export default DegreeOfSeparation;
