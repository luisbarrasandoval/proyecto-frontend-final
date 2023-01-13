import MiniDrawer from "./components/SideBar";
import MyBreadcrumbs from "./components/Breadcrumbs";
import { Route, Routes, useLocation, useRoutes } from "react-router-dom";
import { pages } from "./menu";
import { Button, Stack, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { authState } from "./atom/auth";
import RegisterPage from "./publicPages/Register";
import LoginPage from "./publicPages/login";


function App() {
  const auth = useRecoilValue(authState);


  if (!auth.isAuth) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }


  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
      }}
    >
      <MiniDrawer pages={pages} />
      <Stack
        direction="column"
        sx={{
          height: "100vh",
          padding: 2,
          width: "100%",
        }}
      >
        <MyBreadcrumbs />
        <Routes>
          {pages.map((page) => {
            return (
              <Route
                key={page.label}
                path={page.path}
                element={page.component}
              />
            );
          })}
        </Routes>
      </Stack>
    </Stack>
  );
}

export default App;
