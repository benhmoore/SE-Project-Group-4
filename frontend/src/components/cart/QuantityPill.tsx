import { useState } from "react";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";

interface Props {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const QuantityPill = ({ quantity, setQuantity }: Props) => {
  return (
    <div className="btn-group border align-middle" role="group">
      <button
        type="button"
        className="btn bg-light"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Tooltip on bottom"
        onClick={() => setQuantity(Math.max(quantity - 1, 1))}
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
        onClick={() => setQuantity(Math.min(quantity + 1, 99))}
      >
        <BiPlusCircle />
      </button>
    </div>
  );
};

export default QuantityPill;
