import { useState } from "react";

import QuantityPill from "./QuantityPill";
import { MdClose } from "react-icons/md";

interface Props {
  productId: number;
  cartItemId: number;
  price: number;
  initQuantity?: number;
  name: string;
}
const CartItem = ({
  productId,
  cartItemId,
  price,
  initQuantity = 1,
  name,
}: Props) => {
  const [quantity, setQuantity] = useState(initQuantity);

  const [showDelete, setShowDelete] = useState(false);

  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <tr
      onMouseOver={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <td className="align-middle">
        {showDelete && (
          <button
            className="btn btn-sm btn-danger"
            style={{ borderRadius: "2em" }}
          >
            <MdClose />
          </button>
        )}
      </td>
      <td className="align-middle">{name}</td>
      <td className="text-center align-middle">
        <QuantityPill quantity={quantity} setQuantity={setQuantity} />
      </td>
      <td className="text-end align-middle">
        {priceFormatter.format(price * quantity)}
        {quantity > 1 && (
          <>
            <br />
            <small className="text-secondary ms-2">
              {priceFormatter.format(price)} each
            </small>
          </>
        )}
      </td>
    </tr>
  );
};

export default CartItem;
