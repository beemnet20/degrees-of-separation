import { Box, Stepper, Step } from '@mui/material';
import React from 'react';
import ActorChip from './ActorChip';

const findImgURL = (data, actorID) => {
  const target = data.nodes.filter((node) => node.id === actorID);
  return target.length > 0 ? target[0].img : null;
};

export default function LinkDisplay(props) {
  const { solution, to, from, data } = props;
  if (to === '' || to === null || from === '' || from === null) {
    return null;
  }
  if (to && from && solution && solution.length > 0) {
    return (
      <Box m={2} >
        <h4>{solution.length} degrees of separation</h4>
        <Stepper orientation='vertical'>
          <Step key={from} active={true}>
            <ActorChip
              src={findImgURL(data, from)}
              name={data.people[from].name}
            />
          </Step>
          <Step>{data.movies[solution[0][0]].title}</Step>
          {solution.map((row, index) => {
            const movie =
              index < solution.length - 1
                ? data.movies[solution[index + 1][0]].title
                : null;
            const name = data.people[row[1]].name;
            const src = findImgURL(data, row[1]);
            return (
              <>
                <Step key={index} active={true}>
                  <ActorChip key={`${index}-${name}`} src={src} name={name} />
                </Step>
                {movie && <Step key={movie}>{movie}</Step>}
              </>
            );
          })}
        </Stepper>
      </Box>
    );
  }
  if (to && from && !solution) {
    return (
      <Box m={2}>
        <h4>No solution found</h4>
      </Box>
    );
  }
}
