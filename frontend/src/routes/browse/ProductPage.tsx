import React from "react";
import PricePill from "../../components/product/PricePill";
import ProductMenu from "../../components/product/ProductMenu";
import Skeleton from "react-loading-skeleton";
import { BsQuote } from "react-icons/bs";

const ProductPage = () => {
  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="card product-view p-4">
            <div className="card-header">
              <ProductMenu />
              <div className="container text-center">
                <div className="row align-items-start">
                  <div className="col">
                    <div className="text-center">
                      <h1
                        style={{
                          fontSize: "10em",
                          color: "rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Skeleton />
                      </h1>
                    </div>
                  </div>
                  <div className="col text-start mt-3">
                    <p>
                      This is a long-winded description of the selected product.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer bg-white">
              <div className="row">
                <div className="col-6 mt-4">
                  <h2>Reviews</h2>
                  <p>
                    <Skeleton count={3} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
