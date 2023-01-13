import {
  Box,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { authState } from "../atom/auth";
import GrupoActuador from "../components/GrupoActuador";
import getDevices from "../utils/getDevices";

import DragList from "../components/DragList";
import LoadingDashboard from "../components/loadings/LoadingDashboard";
import { Stack } from "@mui/system";
import DateTime from "../components/DateTime";
import { Add, List, Lock, RemoveRedEye, TableView } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function Dashboard() {
  // const { user } = useRecoilValue(authState);
  // const { data: devices, isLoading } = useQuery(["devices"], async () =>
  //   getDevices(user?.token)
  // );

  const [ isLoading, setIsLoading ] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(false);
    }
    , 1000);
    return () => clearTimeout(id);
  }, []);



  if (isLoading) return <LoadingDashboard />;

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
      <DragList />
    </>
  );
}
