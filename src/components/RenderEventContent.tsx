import { ContentCopy, Delete, Edit } from "@mui/icons-material";
import {
  Chip,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import moment from "moment-timezone";
import { FC, useState } from "react";
import CloneWeeksDialog from "./CloneWeeksDialog";

moment.locale("es");
moment.tz.setDefault("America/Santiago");

const RenderEventContent: FC<{eventInfo: any}> = ({eventInfo}) => {
  const title = eventInfo.event._def.title;
  const { grup: grups, description } = eventInfo.event._def.extendedProps;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openClone, setOpenClone] = useState(false)

  const { start, end } = eventInfo.event._instance.range;
  const startDate = moment(start).add(3, "hours")
  const endDate = moment(end).add(3, "hours")
  const diff = endDate.diff(startDate);
  const diffHours = moment.duration(diff).asHours();


  const startTime = moment(startDate).format("HH:mm");
  const endTime = moment(endDate).format("HH:mm");



  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Stack p={1}>
      <CloneWeeksDialog open={openClone} setOpen={setOpenClone} />
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
            <Edit fontSize="small" />
          </ListItemIcon>
          <Typography textAlign="center">Editar</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDialog(true);
            handleCloseUserMenu();
          }}
        >
          <ListItemIcon color="error" onClick={() => {
            setOpenClone(true)
          }}>
            <ContentCopy fontSize="small"/>
          </ListItemIcon>
          <Typography textAlign="center">Clonar</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDialog(true);
            handleCloseUserMenu();
          }}
        >
          <ListItemIcon color="error">
            <Delete fontSize="small" color="error"/>
          </ListItemIcon>
          <Typography textAlign="center">Eliminar</Typography>
        </MenuItem>
      </Menu>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={handleOpenUserMenu}>
          <GridMoreVertIcon />
        </IconButton>
      </Stack>
      <Typography variant="body2">{description}</Typography>
      {diffHours >= 2 && <Grid container gap={0.5}>
        {grups?.map((grup: string) => (
          <Grid item>
            <Chip
            color="primary"
              label={
                <Typography variant="caption">{grup}</Typography>
              }
              size="small"
              sx={{
                width: `${grup?.length * 10}px`,
                marginBottom: "3px",
              }}
            />
          </Grid>
        ))}
      </Grid>}
      <Typography variant="caption">Inicia a las: {startTime}</Typography>
      <Typography variant="caption">Finaliza a las: {endTime}</Typography>
    </Stack>
  );
};

export default RenderEventContent;
