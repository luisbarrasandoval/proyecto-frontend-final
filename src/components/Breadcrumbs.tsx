import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useLocation } from "react-router-dom";
import DateTime from "./DateTime";

export default function MyBreadcrumbs() {
  const location = useLocation();
  const [path, setPath] = React.useState<string[]>([]);

  React.useEffect(() => {
    const _path = location.pathname.split("/");
    _path.shift();
    setPath(_path);
  }, [location]);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        mb: path[0] ? 2 : 0,
      }}
    >
      {path[0] &&<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography>{path[0] ? "MideChile" : <DateTime />}</Typography>
      </Link>}
      {path.slice(0, -1).map((item, index) => (
        <Link to={`/${path.slice(0, index + 1).join("/")}`} key={item} style={{ textDecoration: "none", color: "inherit" }}>
          <Typography>{item}</Typography>
        </Link>
      ))}

      {path[0] !== "" && <Typography>{path[path.length - 1]}</Typography>}
    </Breadcrumbs>
  );
}
