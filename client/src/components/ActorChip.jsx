import React from 'react';
import { Chip, Avatar } from '@mui/material';


export default function ActorChip(props){
    const {name, src} = props
    return (
        <Chip
        avatar={
          <Avatar
            alt={name}
            src={src}
            sx={{ width: 24, height: 24 }}
          />
        }
        label={name}
        variant='outlined'
      />
    )
}