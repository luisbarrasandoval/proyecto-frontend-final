import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function LoadingTable() {
  return (
    <Box >
      <Skeleton height={110} />
      {Array.from(new Array(10)).map((_, index) => (
        <Skeleton key={index} height={60} />
      ))}
    </Box>
  );
}