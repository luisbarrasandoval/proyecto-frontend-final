import { MoreVert } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FC } from "react";
import Actuador from "./Actuador";

interface GrupoActuadorProps {
  id: string;
  name: string;
  subtitle?: string;
  devices: Array<any>;
}

const GrupoActuador: FC<GrupoActuadorProps> = ({
  id,
  name,
  subtitle,
  devices,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3} xl={3}>
        <Card>
          <CardHeader
            title={name}
            subheader={subtitle}
            action={
              <IconButton>
                <MoreVert />
              </IconButton>
            }
            sx={{
              borderBottom: "1px solid #ccc",
            }}
          />

          <CardContent sx={{ textAlign: "center" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Accion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {devices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell>
                      <Typography variant="body2" gutterBottom>
                        {device.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Switch />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>

          <CardActions>
            <Button variant="outlined" color="primary" fullWidth>
              Inciar todos
            </Button>
            <Button variant="outlined" color="primary" fullWidth>
              Apagar todos
            </Button>
          </CardActions>
        </Card>
      </Grid>
      {devices.map((device) => {
        return (
          <Grid item xs={12} sm={6} md={3} xl={2} key={device.id}>
            <Actuador
              id={device.id.toString()}
              name={device.name}
              status={false}
              type=""
              lastAction="sin datos"
              description={device.phone}
              online={device.parmas.gsm_status.v === 2}
              showButton={false}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default GrupoActuador;
