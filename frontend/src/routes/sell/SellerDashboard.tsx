import React from "react";
import ProductManager from "../../components/product/ProductManager";
import { BsPlusCircle } from "react-icons/bs";
import { MdDashboard, MdEdit } from "react-icons/md";
import { Navigate, useOutletContext } from "react-router-dom";
import ProductManagerItem from "../../components/product/ProductManagerItem";
import BarChart from "../../components/dashboard/BarChart";

const SellerDashboard = () => {
  if (!useOutletContext().authenticated) return <Navigate to="/user/signin" />;

  // Keep track of active tab with states
  const [activeTab, setActiveTab] = React.useState("dashboard");

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-12">
          <h1>Seller Dashboard</h1>
          <p>Manage your products and view sales data.</p>
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
                  Dashboard
                </button>
                <button
                  className={`nav-link text-start ${
                    activeTab === "add_product" ? "active" : ""
                  }`}
                  id="v-pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                  onClick={() => setActiveTab("add_product")}
                >
                  <BsPlusCircle className="me-2 mb-1" />
                  Add Product
                </button>
              </div>
              <div
                className="tab-content container-fluid p-3"
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
                  <h2>Sales Overview</h2>
                  <div style={{ height: 500 }}>
                    <BarChart />
                  </div>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Revenue</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <ProductManagerItem productId={1} />
                      <ProductManagerItem />
                    </tbody>
                  </table>
                </div>
                <div
                  className={`tab-pane ${
                    activeTab === "add_product" ? "show active" : ""
                  }`}
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <h2>Add Product</h2>
                  <p>Add a new product to the storefront.</p>
                  <ProductManager setActiveTab={setActiveTab} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
