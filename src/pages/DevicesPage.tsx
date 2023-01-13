import React, { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/system";
import { DataGrid, esES } from "@mui/x-data-grid";
import { JSONTree } from "react-json-tree";
import { Map } from "immutable";
import {
  Dialog,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import getDevices from "../utils/getDevices";
import { useRecoilValue } from "recoil";
import { authState } from "../atom/auth";
import {
  ContentCopy,
  OnDeviceTraining,
  RunCircle,
  Settings,
  SevereColdRounded,
  Start,
  StartOutlined,
  StarTwoTone,
  StopOutlined,
} from "@mui/icons-material";
import LoadingTable from "../components/loadings/LoadingTable";

const columns = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Nombre",
    flex: 1,
  },
  {
    field: "group",
    headerName: "Grupo",
    flex: 1,
  },

  {
    field: "phone",
    headerName: "Numero",
    flex: 1,
  },
];

const DevicesHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Typography variant="h5">Dispositivos</Typography>
    </Box>
  );
};

const DevicesPage: FC = () => {
  const { user } = useRecoilValue(authState);
  const [selectedRow, setSelectedRow] = useState<number>();
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const [clickOpen, setClickOpen] = useState(false);
  const [data, setData] = useState<any>();

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setSelectedRow(Number(event.currentTarget.getAttribute("data-id")));
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const { data: originalData, isLoading } = useQuery(
    ["users"],
    () => getDevices(user.token),
    {
      onSuccess: (data) => {
        const d = Object.entries(data).reduce((acc, [key, value]) => {
          return [
            ...acc,
            ...value.map((device) => ({
              id: device.id,
              name: device.name,
              group: key,
              phone: device.phone,
            })),
          ];
        }, []);
        setData(d);
      },
    }
  );

  if (isLoading) return <LoadingTable />;

  return (
    <Box
      sx={{
        flex: 1,
      }}
    >
      <Dialog
        open={clickOpen}
        onClose={() => setClickOpen(false)}
        sx={{
          width: "100%",
          "& .MuiDialog-paper": {
            resize: "both",
          },
        }}
      >
        <JSONTree
          data={Object.entries(originalData)
            .reduce((acc, [key, value]) => {
              return [...acc, ...value];
            }, [])
            .find((device) => device.id === selectedRow)}
        />
      </Dialog>
      <DataGrid
        components={{
          NoRowsOverlay: () => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography variant="h5">No hay dispositivos</Typography>
            </Box>
          ),
          Toolbar: DevicesHeader,
        }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        onRowClick={(event) => {
          setSelectedRow(Number(event.row.id));
          setClickOpen(true);
        }}
        rows={data}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        autoPageSize
        componentsProps={{
          row: {
            onContextMenu: handleContextMenu,
            style: { cursor: "context-menu" },
          },
        }}
        loading={isLoading}
      />

      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        componentsProps={{
          root: {
            onContextMenu: (e) => {
              e.preventDefault();
              handleClose();
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {}}
          sx={{ display: "flex", justifyContent: "space-between", width: 200 }}
        >
          <ListItemIcon>
            <SevereColdRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText>Inciar</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {}}
          sx={{ display: "flex", justifyContent: "space-between", width: 200 }}
        >
          <ListItemIcon>
            <StopOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Apagar</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {}}
          sx={{ display: "flex", justifyContent: "space-between", width: 200 }}
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Configuracion</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default DevicesPage;
