import * as React from 'react';
import { useState } from 'react';
import { Paper, Container, Chip, Avatar } from '@mui/material';
import ActorsNetwork from '../components/ActorsNetwork';
import data from '../assets/data';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import shortestPath from '../utils/bfs';

function DegreeOfSeparation() {
  const [inputs, setInputs] = useState({ from: '', to: '' });
  const [solution, setSolution] = useState(null);

  React.useEffect(() => {
    if (inputs.from && inputs.to) {
      const bfs_path = shortestPath(inputs.from, inputs.to, data)
      if (bfs_path.success){
        setSolution(bfs_path.solution);
        console.log(solution);
      }else{
        console.log("no solution found")
      }
    }
  }, [inputs]);

  return (
    <Container
      sx={{ justifyContent: 'center', alignItems: 'center', marginTop: 2 }}
    >
      <div style={{ margin: '0 auto' }}>
        <FormControl sx={{ m: 1, minWidth: 300, height: '50px' }} size='small'>
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
                  inputs.to !== event.target.value ? event.target.value : null,
              });
            }}
          >
            {data.nodes.map((node) => {
              return (
                <MenuItem key={`from-${node.id}`} value={node.id}>
                  <Chip
                    avatar={
                      <Avatar
                        alt={node.name}
                        src={node.img}
                        sx={{ width: 24, height: 24 }}
                      />
                    }
                    label={node.name}
                    variant='outlined'
                  />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

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
            {data.nodes.map((node) => {
              return (
                <MenuItem key={`to-${node.id}`} value={node.id}>
                  <Chip
                    avatar={
                      <Avatar
                        alt={node.name}
                        src={node.img}
                        sx={{ width: 24, height: 24 }}
                      />
                    }
                    label={node.name}
                    variant='outlined'
                  />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      <Paper>
        <ActorsNetwork data={data} from={inputs.from} to={inputs.to} solution={solution} />
      </Paper>
    </Container>
  );
}

export default DegreeOfSeparation;
