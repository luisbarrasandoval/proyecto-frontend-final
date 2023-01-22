import {
  IconButton,
  Tooltip,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import getDevices from "../utils/getDevices";

import DragList from "../components/DragList";
import LoadingDashboard from "../components/loadings/LoadingDashboard";
import { Stack } from "@mui/system";
import DateTime from "../components/DateTime";
import { Add, List, Lock, RemoveRedEye, TableView } from "@mui/icons-material";
import { useState } from "react";

export default function Dashboard() {
  const { data: devices, isLoading } = useQuery(["devices"], async () =>
    getDevices('85c199ebb176b1acb0a50b7f0c36d5772B906246A0EFF0CD28FD753E4E6D47EABCFC9C70')
    ,{
     
      refetchInterval: 1000
    }
  );

  if (isLoading ) return <LoadingDashboard />;

  return (
    <>
      <Stack justifyContent="space-between" direction="row" gap={2} alignItems="center">
        <DateTime />
        <Stack direction="row-reverse">
          <IconButton>
            <Tooltip title="Crear nuevo grupo">
              <Add />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title="Modo lista">
              <List />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title="Bloquear">
              <Lock />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title="Ocultar `Sin Grupo`">
              <RemoveRedEye />
            </Tooltip>
          </IconButton>
        </Stack>
      </Stack>
      <DragList devices={devices}/>
    </>
  );
}
