import { Outlet } from "react-router-dom";

import Menu from "../components/Menu";
import Button from "react-bootstrap/Button";

export default function Root() {
  return (
    <div>
      <Menu />
      <Outlet />
    </div>
  );
}
