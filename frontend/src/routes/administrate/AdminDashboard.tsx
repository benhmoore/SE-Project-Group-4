import React, { useEffect } from "react";
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
import Axios from "axios";

const AdminDashboard = () => {
  if (!useOutletContext().authenticated) return <Navigate to="/user/signin" />;

  // Token
  const token = useOutletContext().user.token;

  // Keep track of active tab with states
  const [activeTab, setActiveTab] = React.useState("dashboard");

  const [buyers, setBuyers] = React.useState([]);
  const [sellers, setSellers] = React.useState([]);
  const [admins, setAdmins] = React.useState([]);

  const [users, setUsers] = React.useState([]);

  const [products, setProducts] = React.useState([]);
  const [approvedProducts, setApprovedProducts] = React.useState([]);
  const [pendingProducts, setPendingProducts] = React.useState([]);

  const [activity, setActivity] = React.useState([]);

  // Get users
  useEffect(() => {
    console.log("Use effect called");
    Axios.get("http://127.0.0.1:8000/admin1/users/list", {
      params: {
        token,
      },
    })
      .then((response) => {
        // Split users into buyers, sellers, and admins
        const buyers = response.data.users.filter(
          (user) => user.user_role === 1 || user.user_role === 2
        );
        const sellers = response.data.users.filter(
          (user) => user.user_role === 2
        );
        const admins = response.data.users.filter(
          (user) => user.user_role === 3
        );

        // Store the users in state
        setBuyers(buyers);
        setSellers(sellers);
        setAdmins(admins);

        // Store all users in state
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [activeTab]);

  // Get products
  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/products/list", {
      params: {
        token,
      },
    })
      .then((response) => {
        // Split products into approved and pending
        const approvedProducts = response.data.filter(
          (product) => product.approval_status === 1
        );
        const pendingProducts = response.data.filter(
          (product) => product.approval_status === 0
        );

        // Store the products in state
        setApprovedProducts(approvedProducts);
        setPendingProducts(pendingProducts);

        // Store all products in state
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [activeTab]);

  // Get activity
  useEffect(() => {
    let form = new FormData();
    form.append("token", token);
    Axios.post("http://127.0.0.1:8000/admin1/activity", form)
      .then((response) => {
        console.log(response.data);
        // Remove consecutive duplicates with the same description
        let prevDescription = "";
        let prevUserId = -1;
        response.data.forEach((activity) => {
          if (
            activity.action_description === prevDescription &&
            activity.user_id === prevUserId
          ) {
            activity.action_description = "";
            activity.user_id = -1;
          } else {
            prevDescription = activity.action_description;
            prevUserId = activity.user_id;
          }
        });

        // Filter out any actions with user_id = -1
        response.data = response.data.filter(
          (activity) => activity.user_id !== -1
        );

        // Get user's username by user_id from users list
        response.data.forEach((activity) => {
          const user = users.find((user) => user.id === activity.user_id);
          activity.username = user.username;
        });

        setActivity(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [activeTab]);

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
                          There are{" "}
                          <h3 style={{ display: "inline" }}>
                            {sellers.length}
                          </h3>{" "}
                          active sellers on the platform.
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
                          There are{" "}
                          <h3 style={{ display: "inline" }}>{buyers.length}</h3>{" "}
                          active buyers on the platform.
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
                          There are{" "}
                          <h3 style={{ display: "inline" }}>
                            {approvedProducts.length}
                          </h3>{" "}
                          approved products and{" "}
                          <h3 style={{ display: "inline" }}>
                            {pendingProducts.length}
                          </h3>{" "}
                          unapproved products on the platform.
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
                          Operation Status:{" "}
                          <h3 style={{ display: "inline" }}>OK</h3>
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
                  <p>View and remove platform sellers.</p>
                  <table className="table table-hover mt-4">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sellers.map((seller) => (
                        <tr key={seller.id}>
                          <td>{seller.first_name}</td>
                          <td>{seller.last_name}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => removeSeller(seller.id)}
                            >
                              Block Seller
                            </button>
                          </td>
                        </tr>
                      ))}
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
                  <h2>Buyers</h2>
                  <p>View platform buyers.</p>
                  <table className="table table-hover mt-4">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buyers.map((buyer) => (
                        <tr key={buyer.id}>
                          <td>{buyer.first_name}</td>
                          <td>{buyer.last_name}</td>
                          <td>{buyer.username}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div
                  className={`tab-pane ${
                    activeTab === "products" ? "show active" : ""
                  }`}
                  id="v-pills-products"
                  role="tabpanel"
                  aria-labelledby="v-pills-products-tab"
                >
                  <h2>Products</h2>
                  <p>View platform products.</p>
                  <table className="table table-hover mt-4">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Product Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <strong>{product.name}</strong>
                          </td>
                          <td>{product.description}</td>
                          <td>
                            {product.approval_status == 0 && (
                              <span className="badge bg-warning">Pending</span>
                            )}
                            {product.approval_status == 1 && (
                              <span className="badge bg-success">Approved</span>
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => removeProduct(product.id)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div
                  className={`tab-pane ${
                    activeTab === "activity" ? "show active" : ""
                  }`}
                  id="v-pills-activity"
                  role="tabpanel"
                  aria-labelledby="v-pills-activity-tab"
                >
                  <h2>Activity</h2>
                  <p>View recent activity on the platform.</p>
                  {/* Loop through activity array and display activity in table */}
                  <table className="table table-hover mt-4">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Action Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activity.map((activity) => (
                        <tr className="">
                          <td>{activity.username}</td>
                          <td>{activity.action_description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
