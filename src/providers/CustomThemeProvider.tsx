import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { FC, PropsWithChildren, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { themeState } from "../atom/themeModeState";

const CustomThemeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const mode = useRecoilValue(themeState);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
