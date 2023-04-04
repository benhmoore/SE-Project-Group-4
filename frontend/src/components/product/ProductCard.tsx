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
  product_id: number;
}

const ProductCard = ({
  name,
  price,
  description,
  image,
  product_id = -1,
}: Props) => {
  var navigate = useNavigate();
  const handleClick = () => {
    return navigate(`/product/${product_id}`);
  };

  return (
    <div className="card product-card p-4" onClick={handleClick}>
      <div className="text-center">
        <h1 style={{ fontSize: "10em", color: "rgba(0, 0, 0, 0.1)" }}>
          <Skeleton />
        </h1>
      </div>
      <h2>{name || <Skeleton />}</h2>
      <p>{description || <Skeleton count="2" />}</p>
      <div className="card-footer">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end price-pill">
          <PricePill price={price} product_id={product_id} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
