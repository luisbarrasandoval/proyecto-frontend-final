import { Typography } from "@mui/material";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { themeState } from "../atom/themeModeState";

const Logo: FC = () => {
  const theme = useRecoilValue(themeState)

  let style = {}
  if (theme === "light") {
    style = {
      filter: "invert(100%)",
    }
  }
  
  return (
    <img src="https://www.midechile.cl/image/logo.png" style={style}/>
  );
};

export default Logo;
