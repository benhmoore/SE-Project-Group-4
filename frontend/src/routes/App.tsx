import { Outlet } from "react-router-dom";

import Menu from "../components/menu/Menu";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({ username: "", token: "" });

  return (
    <div>
      <Menu authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Outlet
        context={{
          authenticated: authenticated,
          setAuthenticated: setAuthenticated,
        }}
      />
    </div>
  );
}
