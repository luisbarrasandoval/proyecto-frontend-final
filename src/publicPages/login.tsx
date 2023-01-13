import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../atom/auth";
import { login } from "../utils/login";

import { FRONT_URL } from "../utils/env";

const LoginPage: FC = () => {

  const setAuth = useSetRecoilState(authState)
  const { search } = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(search);
    const accessToken = query.get("access_token");

   
    const _login = async (accessToken: string) => {
      const response = await login(accessToken);
      if (!response) {
        return;
      }

      setAuth({
        isAuth: true,
        user: {
          name: response.name,
          eid: response.eid,
          id: response.id,
          token: accessToken,
        }
      });
    };


    if (accessToken) {
      _login(accessToken);
    }
  }, [search])




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
      <Typography variant="h3">Bienvenido!</Typography>
      <Button variant="contained" color="primary" onClick={() => {
          window.location.href =
            `http://monitoreo.midechile.cl/login.html?client_id=Mide+Chile+Riegos&access_type=0xFFFFFFFF&redirect_uri=${FRONT_URL}/login";}`
        }}>
        Iniciar Sesion
      </Button>
    </Stack>
  );
};

export default LoginPage;
