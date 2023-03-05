import { DayHeaderContentArg } from "@fullcalendar/core";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const DayHeaderContent = (args: DayHeaderContentArg) => {
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
}

export default DayHeaderContent