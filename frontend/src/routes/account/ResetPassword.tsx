import React from "react";
import { Link, Form } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const ResetPassword = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-4">
            <h1>Reset Password</h1>
            <p>
              Don't have an account?{" "}
              <Link to={"../user/create"} style={{ textDecoration: "none" }}>
                Create one.
              </Link>
            </p>
            <div className="card p-3">
              <Form>
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    required
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                >
                  Send Reset Link
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
