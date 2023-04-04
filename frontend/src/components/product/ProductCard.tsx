import React from "react";
import { BsCartPlus } from "react-icons/bs";
import { MdInventory } from "react-icons/md";

interface Props {
  name: string;
  price: number;
  description: string;
  image: string;
  id: number;
}

const ProductCard = ({ name, price, description, image, id }: Props) => {
  return (
    <div className="card p-4">
      <div className="text-center">
        <h1 style={{ fontSize: "10em", color: "rgba(0, 0, 0, 0.1)" }}>
          <MdInventory />
        </h1>
      </div>
      <hr />
      <h2>{name}</h2>
      <p>{description}</p>
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
            ${price}
          </div>
          <button type="button" className="btn btn-primary">
            <BsCartPlus style={{ marginBottom: 5 }} className="me-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
