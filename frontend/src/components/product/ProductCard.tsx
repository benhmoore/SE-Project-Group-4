import React from "react";
import { BsCartPlus } from "react-icons/bs";
import { MdInventory } from "react-icons/md";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  name: string;
  price: number;
  description: string;
  image: string;
  id: number;
}

const ProductCard = ({ name, price, description, image, id }: Props) => {
  return (
    <div className="card product-card p-4">
      <div className="text-center">
        <h1 style={{ fontSize: "10em", color: "rgba(0, 0, 0, 0.1)" }}>
          <Skeleton />
        </h1>
      </div>
      <h2>{name || <Skeleton />}</h2>
      <p>{description || <Skeleton count="2" />}</p>
      <div className="card-footer">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <div className="product-card-menu input-group me-md-2">
            <div
              className="input-group-text"
              style={{
                borderTopLeftRadius: "2em",
                borderBottomLeftRadius: "2em",
              }}
              id="btnGroupAddon2"
            >
              ${price || <Skeleton width={30} />}
            </div>
            <button type="button" className="btn btn-primary">
              <BsCartPlus style={{ marginBottom: 5 }} className="me-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
