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
import { Add, Lock, RemoveRedEye } from "@mui/icons-material";

export default function Dashboard() {
  const { data: devices, isLoading } = useQuery(["devices"], async () =>
    getDevices('85c199ebb176b1acb0a50b7f0c36d57783957308E47087AC758034736AC4B78DBE617BA5')
    ,{
     
      refetchInterval: 10000,
      cacheTime: 0
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
