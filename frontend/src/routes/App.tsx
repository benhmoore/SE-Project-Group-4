import { Outlet } from "react-router-dom";

import Axios from "axios";

import Menu from "../components/menu/Menu";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Footer from "../components/Footer";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({ username: "", token: "" });
  const [compareProductId, setCompareProductId] = useState(-1);

  // Load token from local storage if it exists
  if (localStorage.getItem("token") && user.token === "") {
    const token = localStorage.getItem("token") || "";
    const username = localStorage.getItem("username") || "";
    setUser({
      username: username,
      token: token,
    });
    setAuthenticated(true);
  }

  const handleLogin = (username: string, password: string) => {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    Axios.post("/user/signin", formData)
      .then(function (response) {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", username);
        setUser({
          username: username,
          token: response.data.token,
        });
        setAuthenticated(true);
      })
      .catch(function (error) {
        alert("Login failed. Please check your username and password.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser({ username: "", token: "" });
    setAuthenticated(false);
  };

  return (
    <div>
      <Menu
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        handleLogout={handleLogout}
        user={user}
        compareProductId={compareProductId}
        setCompareProductId={setCompareProductId}
      />
      <Outlet
        context={{
          authenticated: authenticated,
          setAuthenticated: setAuthenticated,
          user: user,
          handleLogin: handleLogin,
          globalCompareProductId: compareProductId,
          setGlobalCompareProductId: setCompareProductId,
        }}
      />
      <Footer />
    </div>
  );
}
