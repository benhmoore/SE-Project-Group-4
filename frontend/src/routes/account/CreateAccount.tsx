import React from "react";
import { Link, Form, useNavigate, useOutletContext } from "react-router-dom";

import Axios from "axios";

const CreateAccount = () => {
  const navigate = useNavigate();

  const { handleLogin } = useOutletContext();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Account created!");

    // Create account
    Axios.post("/user/create", {
      userRole: 2,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: "",
      balance: 0,
      payment_method: "",
    })
      .then((res) => {
        console.log(res);

        // Login to user
        handleLogin(username, password);

        // Navigate to payment setup
        navigate("/user/payment");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-4">
            <h1>Create Account</h1>
            <p>
              Welcome to E-Commerce! <br />
              To buy and sell on our platform, you'll need to create an account.
            </p>
            <p>
              Already have an account?{" "}
              <Link to={"../user/signin"} style={{ textDecoration: "none" }}>
                Sign in.
              </Link>
            </p>
            <div className="card p-3">
              <Form onSubmit={handleSubmit}>
                <legend>Personal Details</legend>
                <fieldset>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingNameFirst"
                      placeholder="name@example.com"
                      pattern="[A-Za-z]{1,32}"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingNameFirst">First Name</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingNameLast"
                      placeholder="Password"
                      pattern="[A-Za-z]{1,32}"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingNameLast">Last Name</label>
                  </div>
                </fieldset>
                <br />
                <legend>Account Details</legend>
                <fieldset>
                  <div className="form-floating mb-3">
                    <input
                      type="username"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      pattern="[A-Za-z0-9]{1,32}"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingInput">Username</label>
                    <small>
                      A username can be up to 32 characters long. Alpha-numeric
                      characters only.
                    </small>
                  </div>
                  <div className="form-floating mb-2">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      min={8}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    <small>Password must be at least 8 characters long.</small>
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingPassword">Confirm Password</label>
                  </div>
                </fieldset>
                <button className={"btn btn-primary mt-3"}>Continue</button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
