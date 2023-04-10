import React from "react";
import ProductManager from "../../components/product/ProductManager";
import { BsPlusCircle } from "react-icons/bs";
import { MdDashboard, MdEdit } from "react-icons/md";

const SellerDashboard = () => {
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-12">
          <h1>Seller Dashboard</h1>
          <p>Manage your products and view sales data.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card p-4">
            <div className="d-flex align-items-start">
              <div
                className="nav flex-column nav-pills me-3 col-2"
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
                  <MdDashboard className="me-2 mb-1" />
                  Dashboard
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
                  <BsPlusCircle className="me-2 mb-1" />
                  Add Product
                </button>
                <button
                  className="nav-link text-start"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-messages"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  <MdEdit className="me-2 mb-1" />
                  Manage Products
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
                  <h2>Sales Overview</h2>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Sales</th>
                        <th>Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Product 1</td>
                        <td>10</td>
                        <td>$100</td>
                      </tr>
                      <tr>
                        <td>Product 2</td>
                        <td>5</td>
                        <td>$50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  className="tab-pane"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <h2>Add Product</h2>
                  <p>Add a new product to the storefront.</p>
                  <ProductManager />
                </div>
                <div
                  className="tab-pane"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                >
                  <h2>Manage Products</h2>
                  <p>Manage your products.</p>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Product 1</td>
                        <td>$10</td>
                        <td>10</td>
                        <td>
                          <button className="btn btn-primary">Edit</button>
                          <button className="btn btn-danger ms-2">
                            Delete
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Product 1</td>
                        <td>$10</td>
                        <td>10</td>
                        <td>
                          <button className="btn btn-primary">Edit</button>
                          <button className="btn btn-danger ms-2">
                            Delete
                          </button>
                        </td>
                      </tr>
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

export default SellerDashboard;
