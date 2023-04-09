import React from "react";
import { BsCartPlus } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";

interface Props {
  price: number;
  productId: number;
}

const PricePill = ({ price, productId = -1 }: Props) => {
  return (
    <div className="product-card-menu price-pill input-group me-md-2 justify-content-end">
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
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => console.log("Clicked add to cart!")}
      >
        <BsCartPlus style={{ marginBottom: 5 }} className="me-2" />
        Add to Cart
      </button>
    </div>
  );
};

export default PricePill;
