import {
  AccessTime,
  Assessment,
  CalendarMonth,
  DeviceHub,
  Inventory2,
  Settings,
} from "@mui/icons-material";
import { Page } from "./interfaces/Page";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import FeedbackIcon from "@mui/icons-material/Feedback";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/system";
import { useSetRecoilState } from "recoil";
import { sideBarState } from "./atom/sideBarModeState";
import DevicesPage from "./pages/DevicesPage";
import Dashboard from "./pages/Dashboard";
import CronPage from "./pages/CronPage";

const Default = () => {
  const location = useLocation();

  const setSidebarState = useSetRecoilState(sideBarState);

  return (
    <Box>
      <Typography variant="h3">
        Welcome to the {location.pathname} page
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setSidebarState((prev) => !prev);
        }}
      >
        ToogleMenu
      </Button>
    </Box>
  );
};

export const pages: Array<Page> = [
  {
    name: "dashboard",
    label: "Panel de control",
    path: "/",
    icon: <DashboardIcon />,
    component: <Dashboard />,
  },

  {
    name: "decvice",
    label: "Dispositivos",
    path: "/devices",
    icon: <DeviceHub />,
    component: <DevicesPage />,
  },

  {
    name: "cron",
    label: "Programacion",
    path: "/cron",
    icon: <AccessTime />,
    component: <CronPage />,
  },

  // {
  //   name: "report",
  //   label: "Reportes",
  //   path: "/report",
  //   icon: <Assessment />,
  //   component: <Default />,
  // },

  // {
  //   name: "setting",
  //   label: "Configuracion",
  //   path: "/configuracion",
  //   icon: <Settings />,
  //   component: <Default />,
  // },

  // {
  //   name: "emergency",
  //   label: "Emergencia",
  //   path: "/emergency",
  //   icon: <ReportProblemIcon color="warning" />,
  //   component: <Default />,
  //   divider: true,
  // },

  // {
  //   name: "feedback",
  //   label: "Feedback",
  //   path: "/feedback",
  //   icon: <FeedbackIcon color="info" />,
  //   component: <Default />,
  // },
];
