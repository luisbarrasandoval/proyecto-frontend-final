import {
  AccountBalance,
  DarkMode,
  LightMode,
  Logout,
  MenuSharp,
  Person,
} from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Stack } from "@mui/system";
import { FC, MouseEvent, useCallback, useMemo, useState } from "react";
import useToogleThemeMode from "../hooks/useToogleThemeMode";
import { useRecoilValue } from "recoil";
import { authState } from "../atom/auth";

const SideBarUser: FC = () => {
  const { user } = useRecoilValue(authState)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mode, toggleTheme } = useToogleThemeMode();
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const menu = useMemo(
    () => [
      { label: "Perfil", icon: <Person />, callback: handleClose },
      {
        label: mode === "dark" ? "Modo claro" : "Modo Oscuro",
        icon: mode === "dark" ? <LightMode /> : <DarkMode />,
        callback: toggleTheme,
      },
      { label: "Cerrar sesion", icon: <Logout />, callback: handleClose },
    ],
    [mode]
  );

  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
        }}
      />
      <Stack direction="column">
        <Typography variant="body1">{user.name}</Typography>
        <Typography variant="caption">Midechile</Typography>
      </Stack>
      <Stack direction="row" sx={{ flexGrow: 1, justifyContent: "flex-end" }}>
        <IconButton
          aria-label="more"
          id="user-button"
          aria-controls={open ? "user-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="user-menu"
          MenuListProps={{
            "aria-labelledby": "user-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              width: "20ch",
            },
          }}
        >
          {menu.map((option) => (
            <MenuItem
              key={option.label}
              selected={option.label === "Pyxis"}
              onClick={option.callback}
            >
              <IconButton>{option.icon}</IconButton>
              <Typography variant="body1">{option.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </Stack>
  );
};

export default SideBarUser;
