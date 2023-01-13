import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import esLocale from "@fullcalendar/core/locales/es";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useState } from "react";
import { Box, Popover, Typography } from "@mui/material";

const CronCalendar = () => {
  const [initialView, setInitialView] = useState<
    "dayGridMonth" | "dayGridWeek" | "dayGridDay" | "timeGridWeek"
  >("timeGridWeek");

  const [open, setOpen] = useState(false);
  const calendarRef = useRef(null);

  const [events, setEvents] = useState<any>([
    {
      title: "event 1",
      start: "2021-09-01T12:00:00",
      end: "2021-09-01T14:00:00",
    },
    {
      title: "event 2",
      start: "2021-09-01T12:00:00",
      end: "2021-09-01T14:00:00",
    },
  ]);

  const [position, setPosition] = useState<any>(null);

  const handleClick = (event: any) => {
    // setAnchorEl(event.jsEvent.srcElement);
    setOpen(true);
    setPosition({
      top: event.jsEvent.pageY - event.jsEvent.srcElement.offsetHeight / 2,
      left: event.jsEvent.pageX,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderEventContent = (eventInfo: any) => {
    return (
      <>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Titulo</Typography>
          <Typography variant="body2">Descripcion</Typography>
        </Box>
      </>
    );
  };

  return (
    <>
      <Popover
        id={"hola"}
        open={open}
        onClose={handleClose}
        anchorPosition={position}
        anchorReference="anchorPosition"
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Titulo</Typography>
          <Typography variant="body2">Descripcion</Typography>
        </Box>
      </Popover>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={initialView}
        weekends={true}
        locale={esLocale}
        ref={calendarRef}
        contentHeight={"800px"}
        eventContent={renderEventContent}
        editable={true}
        selectable={true}
        select={function (arg) {
          handleClick(arg);
          setEvents(
            events.concat({
              title: "event 3",
              start: arg.start,
              end: arg.end,
            })
          );
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
                {" - "}
                {args.date.toLocaleString("es-ES", { day: "2-digit" })}
              </Typography>
            </Box>
          );
        }}
        allDaySlot={false}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "today prev,next",
        }}
        events={events}
      />
    </>
  );
};

export default CronCalendar;
