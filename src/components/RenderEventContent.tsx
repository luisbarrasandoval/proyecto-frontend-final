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
import { useMutation } from "@tanstack/react-query";
import moment from "moment-timezone";
import { FC, useEffect, useState } from "react";
import deleteCron from "../utils/deleteCron";
import CloneWeeksDialog from "./CloneWeeksDialog";

moment.locale("es");
moment.tz.setDefault("America/Santiago");

const RenderEventContent: FC<{ eventInfo: any, setEvents: any }> = ({ eventInfo, setEvents }) => {
  const title = eventInfo.event._def.title;
  const { grup: grups, description } = eventInfo.event._def.extendedProps;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openClone, setOpenClone] = useState(false);

  const [_delete, _setDelete] = useState(false);

  const { start, end } = eventInfo.event._instance.range;
  const startDate = moment(start).add(3, "hours");
  const endDate = moment(end).add(3, "hours");
  const diff = endDate.diff(startDate);
  const diffHours = moment.duration(diff).asHours();
  const startTime = moment(startDate).format("HH:mm");
  const endTime = moment(endDate).format("HH:mm");

  const deleteMutation = useMutation(async (id: string) => {
    return await deleteCron('85c199ebb176b1acb0a50b7f0c36d57783957308E47087AC758034736AC4B78DBE617BA5', id)
  }, {
    onSuccess: () => {
      console.log("success")
      setEvents((old: any[]) => {
        const newEvents = old.filter((event: any) => event._def.extendedProps.id !== eventInfo.event.extendedProps.id)
        console.log(newEvents)
        return newEvents
      }
      )
    }
  });



  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (_delete) {
      console.log("delete");
      deleteMutation.mutate(eventInfo.event.extendedProps.id);
    }
  }, [_delete]);

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
          <ListItemIcon
            color="error"
            onClick={() => {
              setOpenClone(true);
            }}
          >
            <ContentCopy fontSize="small" />
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
            <Delete
              fontSize="small"
              color="error"
              onClick={() => {
                _setDelete(true);
              }}
            />
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
      {diffHours >= 2 && (
        <Grid container gap={0.5}>
          {grups?.map((grup: string) => (
            <Grid item>
              <Chip
                color="primary"
                label={<Typography variant="caption">{grup}</Typography>}
                size="small"
                sx={{
                  width: `${grup?.length * 10}px`,
                  marginBottom: "3px",
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <Typography variant="caption">Inicia a las: {startTime}</Typography>
      <Typography variant="caption">Finaliza a las: {endTime}</Typography>
    </Stack>
  );
};

export default RenderEventContent;
