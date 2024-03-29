import React from "react";
import ProductMenu from "./ProductMenu";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import { Spinner } from "react-bootstrap";

interface Props {
  product: {
    approval_status: number;
    category: string;
    name: string;
    price: number;
    description: string;
    image_id: string;
    id: number;
    num_sales: number;
    seller: number;
  };
}

const Product = ({ product }: Props) => {
  if (product === undefined)
    return (
      <div className="justify-content-center text-center">
        <Spinner />
      </div>
    );

  return (
    <div className="card product-view p-3">
      <div className="card-header">
        <ProductMenu
          name={product.name}
          price={product.price}
          productId={product.id}
        />
        <div className="container text-center">
          <div className="row align-items-start">
            <div className="col-md-6">
              <div className="text-center">
                <img
                  src={product.image_id}
                  className="card-img"
                  alt={product.name}
                />
              </div>
            </div>
            <div className="col text-start mt-3">
              <h5 className="text-secondary" style={{ fontStyle: "italic" }}>
                <BsFillInfoCircleFill className="text-secondary mb-1" />{" "}
                <span className="ms-1">Product Description</span>
              </h5>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer bg-white mt-3">
        <div className="row">
          <div className="col-6 mt-4">
            <h2>Reviews</h2>
            <small>Reviews unimplemented.</small>
            <p>
              <Skeleton count={3} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
