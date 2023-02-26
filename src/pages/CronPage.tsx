import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import esLocale from "@fullcalendar/core/locales/es";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useState } from "react";
import {
  Badge,
  Box,
  Chip,
  Dialog,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Add, Cancel, CheckBox } from "@mui/icons-material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import PaperDrag from "../components/PaperDrag";
import SelectGrup from "../components/SelectGrup";
import { useQuery } from "@tanstack/react-query";
import getCron from "../utils/getCron";
import "moment/locale/es";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import RenderEventContent from "../components/RenderEventContent";
moment.locale("es");

const CronCalendar = () => {
  const [open, setOpen] = useState(false);
  const calendarRef = useRef(null);
  const [events, setEvents] = useState<any>([]);

  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endtDate, setEndDate] = useState<Moment | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grups, setGrups] = useState<string[]>([]);

  const { data: cronData } = useQuery(
    ["cron"],
    async () =>
      getCron(
        "85c199ebb176b1acb0a50b7f0c36d57783957308E47087AC758034736AC4B78DBE617BA5"
      ),
    {
      onSuccess: (data) => {
        setEvents(
          data.map((event: any) => {
            return {
              title: event.name,
              start: event.startDate,
              end: event.endDate,
              extendedProps: {
                description: event.description,
                grup: event.grup,
              },
            };
          })
        );
      },
    }
  );

  const handleClick = (event: any) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Dialog
        id={"hola"}
        open={open}
        onClose={handleClose}
        PaperComponent={PaperDrag}
        aria-labelledby="draggable-dialog-title"
      >
        <Stack gap={1.5} p={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              id="draggable-dialog-title"
              sx={{
                cursor: "move",
              }}
            >
              Nuevo horario
            </Typography>
            <Tooltip title="Grupo">
              <Switch name="gilad" />
            </Tooltip>

            <Stack direction="row">
              <IconButton>
                <Cancel color="error" />
              </IconButton>
              <IconButton>
                <Add color="primary" />
              </IconButton>
            </Stack>
          </Stack>
          <TextField
            label="Titulo"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setEvents((old: any) => {
                const last = old[old.length - 1];
                last.title = e.target.value;
                const newEvents = old.slice(0, -1);
                return [...newEvents, last];
              });
            }}
          />
          <TextField
            label="Descripcion"
            multiline={true}
            minRows={3}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />

          <SelectGrup value={grups} onChange={setGrups} />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              label="Start/Inicio"
              value={startDate}
              onChange={(e) => {
                setEvents((old: any) => {
                  const last = old[old.length - 1];
                  last.start = e?.format();
                  const newEvents = old.slice(0, -1);
                  return [...newEvents, last];
                });
                setStartDate(e);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
              label="Stop/Final"
              value={endtDate}
              onChange={(e) => {
                setEvents((old: any) => {
                  const last = old[old.length - 1];
                  last.end = e?.format();
                  const newEvents = old.slice(0, -1);
                  return [...newEvents, last];
                });
                setEndDate(e);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Stack direction="row" gap={1}>
            <CheckBox titleAccess="Repetir" />
            <Typography>Repetir semanalmente</Typography>
          </Stack>
        </Stack>
      </Dialog>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        weekends={true}
        locale={esLocale}
        ref={calendarRef}
        contentHeight={window.innerHeight - 100}
        eventContent={(e) => <RenderEventContent eventInfo={e}/>}
        editable={true}
        selectable={true}
        select={function (arg) {
          setEvents(
            events.concat({
              title: title,
              start: arg.start,
              end: arg.end,
              extendedProps: {
                description: description,
                grup: grups || []
              },
            })
          );
          handleClick(arg);
          setStartDate(moment(arg.start));
          setEndDate(moment(arg.end));
        }}
        dayHeaderContent={(args) => {
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="body2">
                {args.date.toLocaleString("es-ES", { weekday: "long" })}
              </Typography>
            </Box>
          );
        }}
        allDaySlot={false}
        headerToolbar={{
          left: undefined,
          center: undefined,
          right: undefined,
        }}
        events={events}
      />
    </>
  );
};

export default CronCalendar;
