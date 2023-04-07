import { useState } from "react";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";

interface Props {
  cartItemId: number;
  quantity: number;
  handleQuantityChange: (cartItemId: number, newQuantity: number) => void;
}

const QuantityPill = ({
  cartItemId,
  quantity,
  handleQuantityChange,
}: Props) => {
  return (
    <div className="btn-group border align-middle" role="group">
      <button
        type="button"
        className="btn bg-light"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Tooltip on bottom"
        onClick={() => {
          const newQuantity = Math.max(quantity - 1, 1);
          handleQuantityChange(cartItemId, newQuantity);
        }}
      >
        <BiMinusCircle />
      </button>
      <button
        type="button"
        className="btn bg-light disabled"
        style={{ border: "none", width: "50px" }}
      >
        {quantity}
      </button>
      <button
        type="button"
        className="btn bg-light"
        onClick={() => {
          const newQuantity = Math.max(quantity + 1, 1);
          handleQuantityChange(cartItemId, newQuantity);
        }}
      >
        <BiPlusCircle />
      </button>
    </div>
  );
};

export default QuantityPill;
