import { Settings } from "@mui/icons-material";
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
import { FC, useState } from "react";

const RenderEventContent: FC<{eventInfo: any}> = ({eventInfo}) => {
  const title = eventInfo.event._def.title;
  const { grup: grups, description } = eventInfo.event._def.extendedProps;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  console.log(eventInfo)

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Stack sx={{ p: 1 }}>
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

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={handleOpenUserMenu}>
          <GridMoreVertIcon />
        </IconButton>
      </Stack>
      <Typography variant="body2">{description}</Typography>
      <Grid container gap={0.5}>
        {grups?.map((grup: string) => (
          <Grid item>
            <Chip
              label={grup}
              size="small"
              sx={{
                width: `${grup?.length * 10}px`,
                marginBottom: "3px",
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="caption">{eventInfo.timeText}</Typography>
    </Stack>
  );
};

export default RenderEventContent;
