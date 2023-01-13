import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/system";

export default function LoadingDashboard() {

  const width = window.innerWidth;

  return (
    <Stack direction="row" gap={2}>
      {new Array(((width / 300) | 0) - 1).fill(0).map((_, index) => (
        <Skeleton variant="rectangular" height={600} width={300} key={index} />
      ))}
    </Stack>
  );
}
