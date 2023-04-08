import { Outlet } from "react-router-dom";

import Axios from "axios";

import Menu from "../components/menu/Menu";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Footer from "../components/Footer";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({ username: "", token: "" });

  Axios.post(
    "https://72b573f8-1ce4-4cf7-97f9-84dd76c252a3.mock.pstmn.io/user/signin",
    {
      username: "bhm128",
      password: "password",
    }
  )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <div>
      <Menu authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Outlet
        context={{
          authenticated: authenticated,
          setAuthenticated: setAuthenticated,
        }}
      />
      <Footer />
    </div>
  );
}
