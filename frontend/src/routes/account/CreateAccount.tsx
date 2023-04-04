import React from "react";
import { Link, Form } from "react-router-dom";

const CreateAccount = () => {
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
              <Form>
                <legend>Personal Details</legend>
                <fieldset>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingNameFirst"
                      placeholder="name@example.com"
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
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      required
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-2">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      required
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      required
                    />
                    <label htmlFor="floatingPassword">Confirm Password</label>
                  </div>
                </fieldset>
                {/* <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                >
                  Continue
                </button> */}
                <Link to={"../user/payment"} className={"btn btn-primary mt-3"}>
                  Continue
                </Link>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
