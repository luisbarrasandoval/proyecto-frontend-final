import { Dialog, Typography } from "@mui/material";
import { FC } from "react";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

const Modal: FC<ModalProps> = ({ open, setOpen, id }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Typography sx={{ p: 2 }} variant="h6">
        Configuracion
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Comandos" {...a11yProps(0)} />
            <Tab label="Sensores" {...a11yProps(1)} />
            <Tab label="Actuadores" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Comandos
        </TabPanel>
        <TabPanel value={value} index={1}>
          Sensores
        </TabPanel>
        <TabPanel value={value} index={2}>
          Actuadores
        </TabPanel>
      </Box>
    </Dialog>
  );
};

export default Modal;
