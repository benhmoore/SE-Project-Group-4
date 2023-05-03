import React, { useEffect } from "react";
import ProductManager from "../../components/product/ProductManager";
import { BsPlusCircle } from "react-icons/bs";
import { MdDashboard, MdEdit } from "react-icons/md";
import { Navigate, useOutletContext } from "react-router-dom";
import ProductManagerItem from "../../components/product/ProductManagerItem";
import BarChart from "../../components/dashboard/BarChart";
import { loadSellerProducts } from "../../utils/ProductLoader";
import Axios from "axios";

const SellerDashboard = () => {
  if (!useOutletContext().authenticated) return <Navigate to="/user/signin" />;

  // Token
  const token = useOutletContext().user.token;

  const [userRole, setUserRole] = React.useState(-1);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/user", {
      params: {
        token,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.user_role !== 2) {
          if (res.data.user_role === -2) {
            alert("Your seller account has been blocked.");
          }
          window.location.href = "/";
        }
        setUserRole(res.data.user_role);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // Keep track of active tab with states
  const [activeTab, setActiveTab] = React.useState("dashboard");

  const [products, setProducts] = React.useState([]);
  const [shouldRefreshProducts, setShouldRefreshProducts] =
    React.useState(false);

  React.useEffect(() => {
    loadSellerProducts(token).then((res) => {
      setProducts(res);
      setShouldRefreshProducts(false);
    });
  }, [shouldRefreshProducts]);

  return (
    <>
      {userRole === 2 && (
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
                      {products.length === 0 ? (
                        <p>
                          You have no products. Add a product to view sales
                          data.
                        </p>
                      ) : (
                        <>
                          <div style={{ height: 500 }}>
                            <BarChart products={products} />
                          </div>
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Sales</th>
                                <th>Revenue</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {products.map((product: any) => (
                                <ProductManagerItem
                                  key={product.id}
                                  productId={product.id}
                                  shouldRefreshProducts={shouldRefreshProducts}
                                  setShouldRefreshProducts={
                                    setShouldRefreshProducts
                                  }
                                />
                              ))}
                            </tbody>
                          </table>
                        </>
                      )}
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
                      <ProductManager
                        setActiveTab={setActiveTab}
                        setShouldRefreshProducts={setShouldRefreshProducts}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SellerDashboard;
