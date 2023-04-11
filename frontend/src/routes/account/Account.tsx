import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Navigate, useOutletContext } from "react-router-dom";
import PaymentInfo from "./PaymentInfo";

const Account = () => {
  if (!useOutletContext().authenticated) return <Navigate to="/user/signin" />;

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-12">
          <h1>Account Dashboard</h1>
          <p>
            Manage your account with us, including payment and shipping details.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card p-4">
            <div className="d-flex align-items-start">
              <div
                className="nav flex-column nav-pills me-3 col-lg-2"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  className="nav-link text-start active"
                  id="v-pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-home"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  Payment and Shipping
                </button>
                <button
                  className="nav-link text-start"
                  id="v-pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  Settings
                </button>
              </div>
              <div
                className="tab-content container-fluid p-3"
                id="v-pills-tabContent"
              >
                <div
                  className="tab-pane show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <PaymentInfo />
                </div>
                <div
                  className="tab-pane"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <h2 className="">Delete Account</h2>
                  <p>Permanently delete your account.</p>
                  <button className="btn btn-danger">
                    <MdDelete className="me-2 mb-1" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
