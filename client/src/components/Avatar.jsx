import * as React from 'react';
import Avatar from '@mui/material/Avatar';

export default function SizeAvatars(props) {
  const { size, src, label } = props;
  const sx =
    size === 'lg'
      ? { width: 80, height: 80 }
      : size === 'sm'
      ? { width: 56, height: 56 }
      : size === 'xlg'
      ? {width: 150, height:150}
      : {};
  return <Avatar alt={label} src={src} sx={sx} />;
}
