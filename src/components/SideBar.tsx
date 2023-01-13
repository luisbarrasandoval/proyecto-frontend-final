import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Page } from "../interfaces/Page";
import { Link, useLocation } from "react-router-dom";
import { Button, Icon, Stack, Tooltip } from "@mui/material";
import SideBarUser from "./SideBarUser";
import Logo from "./Logo";
import { useRecoilState } from "recoil";
import { sideBarState } from "../atom/sideBarModeState";

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2),
  justifyContent: "space-between",
}));

export const DrawerFooter = styled(DrawerHeader)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface MiniDraweProps {
  pages: Page[];
}

const MiniDrawer: React.FC<MiniDraweProps> = ({  pages }) => {
  const [ open, setOpen ] = useRecoilState(sideBarState)
  const location = useLocation();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        {open ? <Logo /> : null}
        <IconButton
          onClick={() => {
            setOpen(!open);
          }}
        >
          {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Stack direction="column" flexGrow={1} justifyContent="space-between">
        <List>
          {pages.map(({ name, label, divider, icon, path }) => (
            <Link
              key={name}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              to={path}
            >
              {divider && <Divider />}

              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton selected={location?.pathname === path}>
                  <Tooltip title={label}>
                    <ListItemIcon>{icon}</ListItemIcon>
                  </Tooltip>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <DrawerFooter>
          <SideBarUser />
        </DrawerFooter>
      </Stack>
    </Drawer>
  );
};

export default MiniDrawer;
