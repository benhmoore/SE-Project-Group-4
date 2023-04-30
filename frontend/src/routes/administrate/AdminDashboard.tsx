import React from "react";
import {
  BsBagHeartFill,
  BsBarChartFill,
  BsFillPersonFill,
  BsFillPuzzleFill,
  BsPlusCircle,
  BsShop,
} from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { IoStorefront } from "react-icons/io5";
import { useOutletContext, Navigate } from "react-router-dom";

const AdminDashboard = () => {
  if (!useOutletContext().authenticated) return <Navigate to="/user/signin" />;

  // Token
  const token = useOutletContext().user.token;

  // Keep track of active tab with states
  const [activeTab, setActiveTab] = React.useState("dashboard");

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-12">
          <h1>Admin Dashboard</h1>
          <p>Manage sellers, buyers, and products.</p>
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
                  className={`nav-link text-start ${
                    activeTab === "dashboard" ? "active" : ""
                  }`}
                  id="v-pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-home"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                  onClick={() => setActiveTab("dashboard")}
                >
                  <MdDashboard className="me-2 mb-1" />
                  Overview
                </button>
                <button
                  className={`nav-link text-start ${
                    activeTab === "sellers" ? "active" : ""
                  }`}
                  id="v-pills-sellers-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-sellers"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-sellers"
                  aria-selected="false"
                  onClick={() => setActiveTab("sellers")}
                >
                  <IoStorefront className="me-2 mb-1" />
                  Sellers
                </button>
                <button
                  className={`nav-link text-start ${
                    activeTab === "buyers" ? "active" : ""
                  }`}
                  id="v-pills-buyers-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-buyers"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-buyers"
                  aria-selected="false"
                  onClick={() => setActiveTab("buyers")}
                >
                  <BsFillPersonFill className="me-2 mb-1" />
                  Buyers
                </button>
                <button
                  className={`nav-link text-start ${
                    activeTab === "products" ? "active" : ""
                  }`}
                  id="v-pills-products-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-products"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-products"
                  aria-selected="false"
                  onClick={() => setActiveTab("products")}
                >
                  <BsBagHeartFill className="me-2 mb-1" />
                  Products
                </button>
                <button
                  className={`nav-link text-start ${
                    activeTab === "activity" ? "active" : ""
                  }`}
                  id="v-pills-activity-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-activity"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-activity"
                  aria-selected="false"
                  onClick={() => setActiveTab("activity")}
                >
                  <BsBarChartFill className="me-2 mb-1" />
                  Activity
                </button>
              </div>
              <div
                className="tab-content container-fluid"
                id="v-pills-tabContent"
              >
                <div
                  className={`tab-pane ${
                    activeTab === "dashboard" ? "show active" : ""
                  }`}
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <div className="row">
                    <div
                      className="col-md-6"
                      style={{ cursor: "pointer" }}
                      onClick={() => setActiveTab("sellers")}
                    >
                      <div className="bg-primary p-5 h-100 rounded">
                        <h3 className="text-light">
                          <IoStorefront className="me-2 mb-2" />
                          Sellers
                        </h3>
                        <p className="text-light">
                          This is the first quadrant.
                        </p>
                      </div>
                    </div>
                    <div
                      className="col-md-6"
                      style={{ cursor: "pointer" }}
                      onClick={() => setActiveTab("buyers")}
                    >
                      <div className="bg-secondary p-5 h-100 rounded">
                        <h3 className="text-light">
                          <BsFillPersonFill className="me-2 mb-2" />
                          Buyers
                        </h3>
                        <p className="text-light">
                          This is the second quadrant.
                        </p>
                      </div>
                    </div>
                    <div
                      className="col-md-6 mt-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => setActiveTab("products")}
                    >
                      <div className="bg-success p-5 h-100 rounded">
                        <h3 className="text-light">
                          <BsBagHeartFill className="me-2 mb-2" />
                          Products
                        </h3>
                        <p className="text-light">
                          This is the third quadrant.
                        </p>
                      </div>
                    </div>
                    <div
                      className="col-md-6 mt-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => setActiveTab("activity")}
                    >
                      <div className="bg-danger p-5 h-100 rounded">
                        <h3 className="text-light">
                          <BsBarChartFill className="me-2 mb-2" />
                          Activity
                        </h3>
                        <p className="text-light">
                          This is the fourth quadrant.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`tab-pane ${
                    activeTab === "sellers" ? "show active" : ""
                  }`}
                  id="v-pills-sellers"
                  role="tabpanel"
                  aria-labelledby="v-pills-sellers-tab"
                >
                  <h2>Sellers</h2>
                  <p>Placeholder content for Sellers tab.</p>
                  <table className="table table-hover mt-4">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Products</th>
                        <th>Revenue</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="">
                        <td>John</td>
                        <td>Doe</td>
                        <td>10</td>
                        <td>$1000</td>
                        <td>
                          <button className="btn btn-danger">Ban Seller</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Jane</td>
                        <td>Smith</td>
                        <td>5</td>
                        <td>$500</td>
                        <td>
                          <button className="btn btn-danger">Ban Seller</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Bob</td>
                        <td>Johnson</td>
                        <td>2</td>
                        <td>$200</td>
                        <td>
                          <button className="btn btn-danger">Ban Seller</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  className={`tab-pane ${
                    activeTab === "buyers" ? "show active" : ""
                  }`}
                  id="v-pills-buyers"
                  role="tabpanel"
                  aria-labelledby="v-pills-buyers-tab"
                >
                  <h2>Buyers Tab</h2>
                  <p>Placeholder content for Buyers tab.</p>
                </div>
                <div
                  className={`tab-pane ${
                    activeTab === "products" ? "show active" : ""
                  }`}
                  id="v-pills-products"
                  role="tabpanel"
                  aria-labelledby="v-pills-products-tab"
                >
                  <h2>Products Tab</h2>
                  <p>Placeholder content for Products tab.</p>
                </div>
                <div
                  className={`tab-pane ${
                    activeTab === "activity" ? "show active" : ""
                  }`}
                  id="v-pills-activity"
                  role="tabpanel"
                  aria-labelledby="v-pills-activity-tab"
                >
                  <h2>Activity Tab</h2>
                  <p>Placeholder content for Activity tab.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
