import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Switch,
  Divider,
  Button,
  Tooltip,
  Avatar,
  CardHeader,
  IconButton,
  Grid,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Dialog,
} from "@mui/material";
import { Stack } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FC, useState } from "react";
import { OfflineBolt, Settings } from "@mui/icons-material";
import Modal from "./Modal";

export interface ActuadorProps {
  id: string;
  name: string;
  status: boolean;
  type: string;
  lastAction: string;
  description?: string;
  online?: boolean;
  showButton?: boolean;
  showOptions?: boolean;
}

const Actuador: FC<ActuadorProps> = ({
  id,
  name,
  status,
  type,
  lastAction,
  description,
  online = false,
  showButton = true,
  showOptions = true,
}) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = ["Forzar encendido", "Forzar apagado"];
  return (
    <>
      <Modal open={openDialog} setOpen={setOpenDialog} id={id} />
      <Tooltip
        title={online ? "Dispositivo en línea" : "Dispositivo fuera de línea"}
      >
        <Card
          sx={{
            border: 1,
            borderColor: "transparent",
            "&:hover": {
              boxShadow: 3,
              borderColor: "primary.main",
            },
          }}
        >
          <CardContent>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  variant="h6"
                  component="div"
                  color={online ? "text.primary" : "text.disabled"}
                >
                  {name}
                </Typography>
                <Tooltip
                  title={
                    online
                      ? "Dispositivo en línea"
                      : "Dispositivo fuera de línea"
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: 10,
                      height: 10,
                      background: online ? "#4caf50" : "#f44336",
                      borderRadius: "50%",
                      marginBottom: 2,
                    }}
                  />
                </Tooltip>
              </Stack>
              {showOptions && (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Abrir opciones">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <MoreVertIcon />
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
                    <Divider />
                    {online ? (
                      settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled onClick={handleCloseUserMenu}>
                        <ListItemIcon>
                          <OfflineBolt fontSize="small" />
                        </ListItemIcon>
                        <Typography textAlign="center">
                          Dispositivo fuera de línea
                        </Typography>
                      </MenuItem>
                    )}
                  </Menu>
                </Box>
              )}
            </Stack>
            <Typography
              sx={{ mb: 1.5 }}
              color="text.secondary"
              variant="subtitle2"
              component="div"
            >
              {type}
            </Typography>
            <Typography
              variant="body2"
              component="div"
              color={online ? "text.primary" : "text.disabled"}
            >
              {description}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    component="div"
                    color={online ? "text.primary" : "text.disabled"}
                  >
                    Estado
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    component="div"
                    color={
                      status
                        ? "success.main"
                        : online
                        ? "error.main"
                        : "text.disabled"
                    }
                  >
                    {status ? "Encendido" : "Apagado"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    component="div"
                    color={online ? "text.primary" : "text.disabled"}
                  >
                    Ultima accion
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    component="div"
                    color={online ? "text.primary" : "text.disabled"}
                  >
                    {lastAction}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
          <CardActions
            sx={{
              justifyContent: "flex-end",
              display: showButton ? "block" : "none",
            }}
          >
            <Tooltip
              title={
                status ? `${name}, ya se encuentra activo` : `Activar ${name}`
              }
            >
              <Button
                size="small"
                disabled={status || !online}
                sx={{
                  "&:disabled": {
                    pointerEvents: "auto",
                  },
                }}
              >
                Activar
              </Button>
            </Tooltip>
            <Tooltip
              title={
                !status ? `${name}, ya se encuentra apagado` : `Apagar ${name}`
              }
            >
              <Button
                size="small"
                color="error"
                disabled={!status || !online}
                sx={{
                  "&:disabled": {
                    pointerEvents: "auto",
                  },
                }}
              >
                Apagar
              </Button>
            </Tooltip>
          </CardActions>
        </Card>
      </Tooltip>
    </>
  );
};

export default Actuador;
