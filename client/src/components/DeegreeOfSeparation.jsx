import * as React from 'react';
import { useState } from 'react';
import { Paper, Container, Chip, Avatar } from '@mui/material';
import ActorsNetwork from '../components/ActorsNetwork';
import data from '../assets/data';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function DegreeOfSeparation() {
  const [inputs, setInputs] = useState({ from: null, to: null });
  React.useEffect(() => {
    console.log(inputs);
  }, [inputs]);
  return (
    <Container
      sx={{ justifyContent: 'center', alignItems: 'center', marginTop: 2 }}
    >
      <div style={{ margin: '0 auto' }}>
        <h2 style={{ display: 'inline' }}>Find degree of separation from </h2>
        <FormControl sx={{ m: 1, minWidth: 300}} size='small'>
          <InputLabel id='from-label'>From</InputLabel>
          <Select
            sx={{borderRadius: "15px" }}
            labelId='from-label'
            id='from-select'
            value={inputs.from}
            label='From'
            onChange={(event) => {
              setInputs({ ...inputs, from: event.target.value });
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
        <h2 style={{ display: 'inline' }}>to</h2>
        <FormControl sx={{ m: 1, minWidth: 300 }} size='small'>
          <InputLabel id='to-label'>To</InputLabel>
          <Select
            sx={{borderRadius: "15px" }}
            labelId='to-label'
            id='to-select'
            value={inputs.to}
            label='To'
            onChange={(event) => {
              setInputs({ ...inputs, to: event.target.value });
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
      </div>

      <Paper>
        <ActorsNetwork data={data} />
      </Paper>
    </Container>
  );
}

export default DegreeOfSeparation;
