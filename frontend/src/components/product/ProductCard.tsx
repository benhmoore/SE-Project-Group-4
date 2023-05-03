import React from "react";
import { BsCartPlus } from "react-icons/bs";
import { MdInventory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PricePill from "./PricePill";

interface Props {
  name: string;
  price: number;
  description: string;
  image: string;
  productId: number;
  compareProductId?: number;
}

const ProductCard = ({
  name,
  price,
  description,
  image,
  productId = -1,
  compareProductId = -1,
}: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (compareProductId === -1)
      return navigate(`/product/${productId}`, {
        state: { productId: productId },
      });
    else
      return navigate(`/product/${compareProductId}/${productId}`, {
        state: { productId: productId },
      });
  };

  return (
    <div className="card product-card p-4 mt-4">
      <div
        className="text-center mb-3"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        {<img src={image} className="card-img" alt={name} /> || (
          <Skeleton height={200} />
        )}
      </div>
      <h2 onClick={handleClick} style={{ cursor: "pointer" }}>
        {name || <Skeleton />}
      </h2>
      <p>{description.substring(0, 100) + "..." || <Skeleton count={2} />}</p>
      <div className="card-footer">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end price-pill">
          <PricePill price={price} productId={productId} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
