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
}

const ProductCard = ({
  name,
  price,
  description,
  image,
  productId = -1,
}: Props) => {
  var navigate = useNavigate();
  const handleClick = () => {
    return navigate(`/product/${productId}`);
  };

  return (
    <div className="card product-card p-4 mt-4" onClick={handleClick}>
      <div className="text-center">
        <h1 style={{ fontSize: "10em", color: "rgba(0, 0, 0, 0.1)" }}>
          <Skeleton />
        </h1>
      </div>
      <h2>{name || <Skeleton />}</h2>
      <p>{description || <Skeleton count="2" />}</p>
      <div className="card-footer">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end price-pill">
          <PricePill price={price} productId={productId} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
