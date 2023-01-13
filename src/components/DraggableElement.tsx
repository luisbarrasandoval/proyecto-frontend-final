import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import styled from "styled-components";
import {
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Switch,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Settings } from "@mui/icons-material";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import { useState } from "react";

const ColumnHeader = styled.div`
  text-transform: uppercase;
`;

export interface DraggableElementProps {
  prefix: string;
  elements: any[];
}

const DraggableElement = ({ prefix, elements }: DraggableElementProps) => {
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, m: 1 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        mb={2}
      >
        <ColumnHeader>{prefix}</ColumnHeader>
        {prefix !== "Sin Grupo" && (
          <Box sx={{ flexGrow: 0 }}>
            <Switch />
            <Tooltip title="Abrir opciones">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <GridMoreVertIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "25px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  setOpenDialog(true);
                  handleCloseUserMenu();
                }}
              >
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center">Configuracion</Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Stack>
      <Droppable droppableId={`${prefix}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements.map((item, index) => (
              <ListItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
            {elements.length === 0 && (
              <Stack>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  No hay elementos
                </Typography>
                <Button variant="outlined" sx={{ mt: 2 }} color="error">
                  Eliminar {prefix}
                </Button>
              </Stack>
            )}
          </div>
        )}
      </Droppable>
    </Paper>
  );
};

export default DraggableElement;
