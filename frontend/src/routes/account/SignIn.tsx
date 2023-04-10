import React from "react";
import { Link, Form, Navigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

import axios from "axios";

const SignIn = () => {
  const { authenticated, setAuthenticated, handleLogin } = useOutletContext();

  if (authenticated) return <Navigate to="/" />;

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-4">
            <h1>Sign In</h1>
            <p>To buy and sell on our platform, you'll need to login.</p>
            <p>
              Don't have an account?{" "}
              <Link to={"../user/create"} style={{ textDecoration: "none" }}>
                Create one.
              </Link>
            </p>
            <div className="card p-3">
              <Form>
                <div className="form-floating mb-3">
                  <input
                    type="username"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </Form>
            </div>
            <p className="forgot-password text-right small mt-3">
              Forgot <Link to={"../user/forgot"}>password?</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
