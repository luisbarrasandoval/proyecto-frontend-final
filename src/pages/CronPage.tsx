import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import esLocale from "@fullcalendar/core/locales/es";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useState } from "react";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import moment from "moment-timezone";
import { useQuery } from "@tanstack/react-query";
import getCron from "../utils/getCron";
import "moment/locale/es";
import RenderEventContent from "../components/RenderEventContent";
import DayHeaderContent from "../components/DayHeaderContent";
import { DateSelectArg } from "@fullcalendar/core";
import NewCronDialog from "../components/NewCronDialog";
import { Stack } from "@mui/system";
import { MoreTime, ViewList } from "@mui/icons-material";
import momentTimezonePlugin  from "@fullcalendar/moment-timezone";
moment.locale("es");
moment.tz.setDefault("America/Santiago");

const CronCalendar = () => {
  const [open, setOpen] = useState(false);
  const calendarRef = useRef(null);
  const [events, setEvents] = useState<any>([]);

  const { data: cronData } = useQuery(
    ["cron"],
    async () =>
      getCron(
        "85c199ebb176b1acb0a50b7f0c36d57783957308E47087AC758034736AC4B78DBE617BA5"
      ),
    {
      onSuccess: (data) => {
        setEvents((old: any[]) =>
          [
            ...old,
            ...data.map((event: any) => {
              const startDate = moment(event.startDate);
              const endDate = moment(event.endDate);

           
              const currentDay = moment();
              const numCurrentWeek = currentDay.isoWeek();

              const semanasStartTranscurridas =
                numCurrentWeek - startDate.isoWeek();
              const semanasEndTranscurridas =
                numCurrentWeek - endDate.isoWeek();

              const updateStartDate = startDate
                .clone()
                .add(semanasStartTranscurridas, "weeks");
              const updateEndDate = endDate
                .clone()
                .add(semanasEndTranscurridas, "weeks");

              const newStart = updateStartDate.set({
                hour: startDate.get("hour"),
                minute: startDate.get("minute"),
                second: startDate.get("second"),
              }).format();


              const newEnd = updateEndDate.set({
                hour: endDate.get("hour"),
                minute: endDate.get("minute"),
                second: endDate.get("second"),
              }).format();



              return {
                title: event.name,
                start: newStart,
                end: newEnd,
                extendedProps: {
                  description: event.description,
                  grup: event.grup,
                },
              };
            }),
          ].reduce((acc, current) => {
            if (!acc.find((item: any) => item.title === current.title)) {
              acc.push(current);
            }
            return acc;
          }, [])
        );
      },
    }
  );

  const handleSelect = (event: DateSelectArg) => {
    setEvents((old: any[]) => {

      return [
        ...old,
        {
          title: "(Sin titulo)",
          start: moment(event.start).format(),
          end: moment(event.end).format(),
          extendedProps: {
            description: "",
            grup: [],
          },
        },
      ];
    });
    setOpen(true);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Stack></Stack>
        <Stack alignContent="center" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Calendario de Programacion
          </Typography>
          <Typography variant="caption">
            {events.length} tareas programadas
          </Typography>
        </Stack>
        <ButtonGroup variant="contained">
          <Button>
            <ViewList />
          </Button>
          <Button>
            <MoreTime />
          </Button>
        </ButtonGroup>
      </Stack>

      <NewCronDialog
        open={open}
        setOpen={setOpen}
        events={events}
        setEvents={setEvents}
      />
      <FullCalendar
        plugins={[momentTimezonePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        weekends={true}
        locale={esLocale}
        ref={calendarRef}
        contentHeight={window.innerHeight - 150}
        // timeZone="America/Santiago"
        eventContent={(e) => <RenderEventContent eventInfo={e} />}
        editable={true}
        selectable={true}
        select={function (arg) {
          handleSelect(arg);
        }}
        dayHeaderContent={DayHeaderContent}
        allDaySlot={false}
        headerToolbar={{
          left: undefined,
          center: undefined,
          right: undefined,
        }}
        events={events}
      />
    </Box>
  );
};

export default CronCalendar;
