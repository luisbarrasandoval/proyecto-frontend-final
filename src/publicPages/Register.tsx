import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { FC } from "react";

const RegisterPage: FC = () => {
  return (
    <Stack
      sx={{
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography variant="h3">Registro!</Typography>
      <Button variant="contained" color="primary">
        HOla
      </Button>
    </Stack>
  );
};

export default RegisterPage;
