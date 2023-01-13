import { Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

const DateTime: FC = (args) => {

  const [ date, setDate ] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return <Typography fontSize="1rem" {...args}>{date.toLocaleString()}</Typography>;

}

export default DateTime;