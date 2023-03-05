import { Check, Close } from "@mui/icons-material";
import {
  AppBar,
  Checkbox,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, useEffect } from "react";
import PaperDrag from "./PaperDrag";

const dias = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

interface CloneWeeksDialogProp {
  title?: string;
  open: boolean;
  setOpen: any;
}

const CloneWeeksDialog: FC<CloneWeeksDialogProp> = ({
  title = "Copiar en",
  open,
  setOpen,
}) => {
  
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{
          justifyContent:"space-between"
        }}>
          <Typography variant="h5">{title}</Typography>
          <Stack direction="row">
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close color="error" />
            </IconButton>
            <IconButton>
              <Check color="primary" />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <List disablePadding>
        {dias.map((dia) => {
          const labelId = `checkbox-list-label-${dia}`;

          return (
            <ListItem
              key={dia}
              sx={{
                width: "300px",
              }}
              disablePadding
            >
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    // checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={dia} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Dialog>
  );
};

export default CloneWeeksDialog;
